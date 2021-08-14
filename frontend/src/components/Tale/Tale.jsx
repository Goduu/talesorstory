import React, { useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import NewCommentDialog from "./NewCommentDialog";
import { useAuthContext } from "../../context/auth-context";



const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        background: '#fff',
        padding: '30px',
        width: '55%'
    },


}));

function Tale(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState();
    const [newComment, setNewComment] = useState(false);
    const context = useAuthContext()

    const handleExpandClick = () => {
        console.log('-----', props.tale)
        setExpanded(prev => !prev)
    }
    const handleComment = () => {
        setNewComment(prev => !prev)
    }
    const handleSave = (comment) => {
        props.saveComment(comment)
        setNewComment(prev => !prev)
    }
    return (
        <Card className={classes.root}>
            <NewCommentDialog open={newComment} close={handleComment} save={handleSave} />
            {props.tale ?
                (
                    <>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            title={`${props.tale.title} - ${props.tale.creator.email}`}
                            subheader={props.tale.date}
                        />
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/paella.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.tale.text}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                Comments
                            </Button>
                            {context.token &&
                                <Button
                                    onClick={handleComment}
                                >
                                    NewComment
                                </Button>
                            }
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                {props.tale.comments && props.tale.comments.map(c => {
                                    return (
                                        <>
                                            <Typography paragraph>{c.user.email}</Typography>
                                            <Typography paragraph>{c.createdAt}</Typography>
                                            <Typography paragraph>
                                                {c.text}
                                            </Typography>
                                        </>

                                    )
                                })}
                            </CardContent>
                        </Collapse>
                    </>
                ) : (
                    <Typography>
                        Choose your tale
                    </Typography>
                )
            }
        </Card>
    )
}

export default Tale;