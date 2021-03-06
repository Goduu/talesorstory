import React, { useEffect, useState } from 'react';

import Modal from '../components/Modal/Modal';
import TaleList from '../components/Tales/TaleList/TaleList';
import Spinner from '../components/Spinner/Spinner';
import { useAuthContext } from '../context/auth-context';
import './Tales.css';
import { Button, makeStyles } from '@material-ui/core';
import Tale from '../components/Tale/Tale';

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    margin: theme.spacing(2)

  },

}));

function TalesPage(props) {
  const classes = useStyles()
  const [creating, setCreating] = useState(false);
  const [tales, setTales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTale, setSelectedTale] = useState(null);

  const context = useAuthContext()


  const isActive = true;


  const titleElRef = React.createRef();
  const textElRef = React.createRef();

  useEffect(() => {
    fetchTales();

  }, [context])


  const startCreateTaleHandler = () => {
    setCreating(true)
  };

  const modalConfirmHandler = () => {
    setCreating(false)
    const title = titleElRef.current.value;
    const text = textElRef.current.value;

    if (
      title.trim().length === 0 ||
      text.trim().length === 0
    ) {
      return;
    }

    const tale = { title, text };
    console.log(tale);

    const requestBody = {
      query: `
          mutation CreateTale($title: String!, $text: String!, $date: String!) {
            createTale(taleInput: {title: $title, text: $text, date: $date}) {
              _id
              title
              text
              date
              creator{
                email
              }
            }
          }
        `,
      variables: {
        title: title,
        text: text,
        date: new Date().toISOString()
      }
    };

    const token = context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log("res asd sa", resData)
        setTales(prev => {
          const updatedTales = [...prev];
          updatedTales.push({
            _id: resData.data.createTale._id,
            title: resData.data.createTale.title,
            text: resData.data.createTale.text,
            date: resData.data.createTale.date,
            creator: {
              _id: context.userId
            }
          });
          return updatedTales
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  const modalCancelHandler = () => {
    setCreating(false)
    setSelectedTale(null)
  };

  const fetchTales = () => {
    setIsLoading(true)
    const requestBody = {
      query: `
          query {
            tales {
              _id
              title
              text
              date
              creator {
                _id
                email
              }
              comments {
                user {
                  email
                }
                text
                createdAt
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        setTales(resData.data.tales);
        if (isActive) {
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err);
        if (isActive) {
          setIsLoading(false)

        }
      });
  }

  const showDetailHandler = taleId => {
    setSelectedTale(_ => {
      const selectedTale = tales.find(e => e._id === taleId);
      return selectedTale;

    })
  };

  const commentTaleHandler = (comment) => {
    console.log("context", context)
    if (!context.token) {
      return;
    }
    const requestBody = {
      query: `
          mutation CommentTale($id: ID!, $text: String!) {
            commentTale(taleId: $id, text: $text) {
              tale{
                _id
              }
              user {
                email
              }
              text
              createdAt
            }
          }
        `,
      variables: {
        id: selectedTale._id,
        text: comment
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        let tale = resData.data.commentTale;
        tales.find(t => t._id === tale.tale._id).comments.push(
          {
            createdAt: tale.createdAt,
            text: tale.text,
            user: tale.user
          }
        )
        console.log("alcapaha",resData, tales);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <React.Fragment>
      {creating && (
        <Modal
          title="Add Tale"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="text">Text</label>
              <textarea
                id="text"
                rows="4"
                ref={textElRef}
              />
            </div>
          </form>
        </Modal>
      )}
      {context && context.token && (
        <div className="tales-control">
          <p>Share your own Tales!</p>
          <button className="btn" onClick={startCreateTaleHandler}>
            Create Tale
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.body}>
          <TaleList
            tales={tales}
            authUserId={context && context.userId}
            onViewDetail={showDetailHandler}
          />
          <Tale tale={selectedTale} saveComment={commentTaleHandler} />
        </div>

      )}
    </React.Fragment>
  );

}

export default TalesPage;
