import React, { useState } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
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
                            <Typography variant="body2" color="textSecondary" >
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
                                <List style={{width: '100%'}}>

                                    {props.tale.comments && props.tale.comments.map(c => {
                                        return (
                                            <ListItem key={`${c.createdAt} - ${c.user.email}`}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {c.user.email[0]}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={`${c.user.email} - ${c.createdAt}`} secondary={c.text} />
                                            </ListItem>

                                        )
                                    })}
                                </List>
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