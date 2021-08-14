import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NewCommentDialog(props) {
    const [text, setText] = useState('')

    const handleSave = () => {
        props.save(text)
    }

    return (
        <div>

            <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title" fullWidth maxWidth={"sm"}>
                <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Comment this tale.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        minRows={4}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
