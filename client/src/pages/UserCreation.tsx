import React from "react";
import axios from "axios";
import Link from '@material-ui/core/Link';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import style from "../MusicApp.module.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectMusicApp, resetCreateUserForm, setCreateUserForm} from "../redux/musicAppSlice";
import Paper from "@material-ui/core/Paper";

const UserCreation = () => {

    const musicAppState = useAppSelector(selectMusicApp);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const formChangeHandler = (event: any) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        dispatch(setCreateUserForm({ fieldName, value }));
    };

    const submitCreateUser = () => {
        axios
        .post(`http://localhost:8080/api/create/user`, musicAppState.userCreateForm)
        .then((response) => {
            if(response.status === 200){
                alert("User successfully created");
                dispatch(resetCreateUserForm());
                history.push("/login");
            }
            if (response.status === 401){
                alert("User already exists");
                dispatch(resetCreateUserForm());
                history.push("/user_create");
            }
        }).catch((err) => {
            console.log("There was an error", err);
            dispatch(resetCreateUserForm());
            alert("There was an error in one of your inputs.");
            history.push("/user_create");
        })};
        
    return(
        <Grid
            container
            className={`${style.center} ${style.fitViewHeight} ${style.blackBackground}`}
        >   
            <Paper className={style.paperPadding}>
                <h1 className={style.center}>Create Account</h1>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Login</FormLabel>
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="text"
                        label="Username"
                        variant="outlined"
                        name="username"
                        onChange={formChangeHandler}
                    />
                    <TextField
                        className={style.marginTop}
                        autoComplete="off"
                        type="password"
                        label="Password"
                        variant="outlined"
                        name="password"
                        onChange={formChangeHandler}
                    />
                    <Button
                        className={style.marginTop}
                        color="primary"
                        variant="contained"
                        onClick={submitCreateUser}
                    >
                    Create User
                    </Button>
                </FormControl>
            </Paper>
        </Grid>
    )
    
};

export default UserCreation;