import React, { useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useAppSelector } from "../redux/hooks";
import { selectMusicApp } from "../redux/musicAppSlice";
interface DeezerData {
  songTitle: string;
  songId: string;
  preview: string;
  duration: number;
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  albumId: number;
  albumTitle: string;
  artistId: number;
  artist: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
}
interface DeezerHeadCell {
  disablePadding: boolean;
  id: keyof DeezerData;
  label: string;
  numeric: boolean;
}

const deezerHeadCells: DeezerHeadCell[] = [
  {
    id: "songTitle",
    numeric: false,
    disablePadding: true,
    label: "Song Title",
  },
  { id: "picture", numeric: true, disablePadding: false, label: "Picture" },
  { id: "artist", numeric: true, disablePadding: false, label: "Artist" },
  {
    id: "albumTitle",
    numeric: true,
    disablePadding: false,
    label: "Album Title",
  },
  { id: "cover", numeric: true, disablePadding: false, label: "Cover Art" },
  { id: "preview", numeric: false, disablePadding: false, label: "Preview" },
];

interface DeezerTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DeezerData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

function DeezerTableHead(props: DeezerTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof DeezerData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all songs" }}
          />
        </TableCell>
        {deezerHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface DeezerTableToolbarProps {
  numSelected: number;
}

const DeezerTableToolbar = (props: DeezerTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Search Results
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const DeezerSearchResultsViewer = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DeezerData>("songTitle");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const musicAppState = useAppSelector(selectMusicApp);

  const logState = () => {
    console.log("selected: ", selected);
  };

  const createDeezerData = (
    songTitle: string,
    songId: string,
    preview: string,
    duration: number,
    cover: string,
    cover_big: string,
    cover_medium: string,
    cover_small: string,
    cover_xl: string,
    albumId: number,
    albumTitle: string,
    artistId: number,
    artist: string,
    picture: string,
    picture_big: string,
    picture_medium: string,
    picture_small: string,
    picture_xl: string
  ): DeezerData => {
    return {
      songTitle,
      songId,
      preview,
      duration,
      cover,
      cover_big,
      cover_medium,
      cover_small,
      cover_xl,
      albumId,
      albumTitle,
      artistId,
      artist,
      picture,
      picture_big,
      picture_medium,
      picture_small,
      picture_xl,
    };
  };
  const deezerRows: Array<DeezerData> = musicAppState.deezerData.map(
    (songData: {
      title: string;
      id: string;
      preview: string;
      duration: number;
      album: {
        cover: string;
        cover_big: string;
        cover_medium: string;
        cover_small: string;
        cover_xl: string;
        id: number;
        title: string;
      };
      artist: {
        id: number;
        name: string;
        picture: string;
        picture_big: string;
        picture_medium: string;
        picture_small: string;
        picture_xl: string;
      };
    }) => {
      return createDeezerData(
        songData.title,
        songData.id,
        songData.preview,
        songData.duration,
        songData.album.cover,
        songData.album.cover_big,
        songData.album.cover_medium,
        songData.album.cover_small,
        songData.album.cover_xl,
        songData.album.id,
        songData.album.title,
        songData.artist.id,
        songData.artist.name,
        songData.artist.picture,
        songData.artist.picture_big,
        songData.artist.picture_medium,
        songData.artist.picture_small,
        songData.artist.picture_xl
      );
    }
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DeezerData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = deezerRows.map((n) => n.songId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, title: string) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (songId: string) => selected.indexOf(songId) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, deezerRows.length - page * rowsPerPage);

  const saveSelectedSongsToPlaylist = () => {
    if (selected.length !== 0) {
      const songsToAdd = deezerRows.filter((song) => {
        return selected.includes(song.songId);
      });
      //  Add the selected songs to the playlist, need username, playlistname, songId, songtitle, preview, artist, album
      //
      songsToAdd.forEach((song) => {
        // replace test param with the playlistId later.
        const testParam = "60a974518484a27c292a4a0a";
        const addSongsObject = {
          songId: song.songId,
          title: song.songTitle,
          preview: song.preview,
          artist: song.artist,
          album: song.albumTitle,
        };
        axios
          .put(
            "http://localhost:8080/api/update/playlist/song?playlistId="+ testParam,
            addSongsObject
          )
          .then((response) => {
            console.log("response is: ", response);
          })
          .catch((error) => {
            console.log("There was an error: ", error);
          });
      });
    }
  };

  return (
    <div className={classes.root}>
      <button
        onClick={() => {
          logState();
        }}
      ></button>
      <Paper className={classes.paper}>
        <DeezerTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <DeezerTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={deezerRows.length}
            />
            <TableBody>
              {stableSort(deezerRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.songId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.songId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.songId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.songTitle}
                      </TableCell>
                      <TableCell align="right">
                        <img src={row.picture_small}></img>
                      </TableCell>
                      <TableCell align="right">{row.artist}</TableCell>
                      <TableCell align="right">{row.albumTitle}</TableCell>
                      <TableCell align="right">
                        <img src={row.cover_small}></img>
                      </TableCell>
                      <TableCell align="left">
                        <figure>
                          <figcaption>Play {row.songTitle}</figcaption>
                          <audio controls src={row.preview}>
                            Your browser does not support the
                            <code>audio</code> element.
                          </audio>
                        </figure>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={saveSelectedSongsToPlaylist}>Save to Playlist</Button>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={deezerRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};

export default DeezerSearchResultsViewer;
