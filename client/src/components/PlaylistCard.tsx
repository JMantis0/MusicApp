import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//  import redux state hooks
import { useAppDispatch, useAppSelector } from "../redux/hooks";
//  import reducer and state selector
import {selectMusicApp, setPlaylists} from '../redux/musicAppSlice'
import { Playlist } from "../redux/pojos";
// interface PlaylistProps{
//     playlist: Playlist;
// }

const PlaylistCard = () => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia/>
                <CardContent>
                    <Typography variant="body2" 
                                color="textSecondary"
                    >
                        This is a demo card for a play list        
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    View Playlist
                </Button>
                <Button size="small" color="primary">
                    Delete Playlist
                </Button>
            </CardActions>
        </Card>
    )
}

export default PlaylistCard
