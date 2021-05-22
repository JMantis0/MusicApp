// Pojos to simplify the process of sending data to backend for DB storage.
export const Album = class Album {
  album: string;
  title: string;
  cover: string;
  constructor(album: string, title: string, cover: string) {
    this.album = album;
    this.title = title;
    this.cover = cover;
  }
};

export const Artist = class Artist {
  artistId: string;
  name: string;
  picture: string;
  constructor(artistId: string, name: string, picture: string) {
    this.artistId = artistId;
    this.name = name;
    this.picture = picture;
  }
};

export const Playlist = class Playlist {
  playlistId: string;
  playlistName: string;
  username: string;
  tracks: Array<typeof Track>;
  constructor(tracks: Array<typeof Track>, 
              playlistId: string,
              playlistName: string,
              username: string) {
    this.tracks = tracks;
    this.playlistId = playlistId;
    this.playlistName = playlistName;
    this.username = username;
  }
};

export const Track = class Track {
  trackId: string;
  title: string;
  preview: string;
  artist: string;
  album: typeof Album;
  constructor(
    trackId: string,
    title: string,
    preview: string,
    artist: string,
    album: typeof Album
  ) {
    this.trackId = trackId;
    this.title = title;
    this.preview = preview;
    this.artist = artist;
    this.album = album;
  }
};

export const User = class User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
};
