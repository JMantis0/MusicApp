import React from "react";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutButton from './LogoutButton';
import Button from '@material-ui/core/Button';
import style from "../MusicApp.module.css";
const UserProfile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                User Profile                
                </MenuItem>
                <MenuItem>
                    <LogoutButton/>
                </MenuItem>
            </Menu>   
        </div>     
    )
};


export default UserProfile;
