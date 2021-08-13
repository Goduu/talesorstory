import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        background: '#fff',
        padding: '30px',
        width: '55%'
    },


}));

function Tale(props) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
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