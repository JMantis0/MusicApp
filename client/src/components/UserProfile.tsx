import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutButton from './LogoutButton';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import style from "../MusicApp.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectMusicApp, setUpdateUserForm} from "../redux/musicAppSlice";
import axios from "axios";

const UserProfile = () => {
    const musicAppState = useAppSelector(selectMusicApp);
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState(musicAppState.user.firstName);
    const [lastName, setLastName] = useState(musicAppState.user.lastName);
    const [username, setUsername] = useState(musicAppState.user.username);
    const [password, setPassword] = useState(musicAppState.user.password);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    

    const formChangeHandler = (event: any) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        dispatch(setUpdateUserForm({ fieldName, value }));
    };

    const updateUser = () => {
        axios
        .put(`http://localhost:8080/api/update/user`, musicAppState.userUpdateForm)
        .then((response)=> {
            if(response.status === 200) {
                alert("Successfully updated");
            } else {
                alert("There was an error");
            }}).catch((err)=> {
                console.log("There was an error", err);
                alert("There was an error in one of your inputs");
        })};

    const dialogClose = () =>{
        setOpen(false);
    }

    const showProfile = (event:any) => {
        setOpen(true);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                <Button variant="contained" onClick={showProfile}>
                    User Profile
                </Button>                              
                </MenuItem>
                <MenuItem>
                    <LogoutButton/>
                </MenuItem>
            </Menu>
            <Dialog
                open={open}
                onClose={dialogClose}
                maxWidth='lg'>
                <DialogTitle>
                    User Profile
                </DialogTitle>
                <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Login</FormLabel>
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={firstName}
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={lastName}
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={username}
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="password"
                        label="Password"
                        variant="outlined"
                        name="password"
                        value={password}
                        onChange={formChangeHandler}
                    />
                    <Button
                        className={style.marginTop}
                        color="primary"
                        variant="contained"
                        onClick={updateUser}
                    >
                    Update
                    </Button>
                </FormControl>
                </DialogContent>   
            </Dialog>

        </div>     
    )
};


export default UserProfile;
