class Album {
  album: string;
  title: string;
  cover: string;
  constructor(album: string, title: string, cover: string) {
    this.album = album;
    this.title = title;
    this.cover = cover;
  }
}
class Artist {
  artistId: string;
  name: string;
  picture: string;
  constructor(artistId: string, name: string, picture: string) {
    this.artistId = artistId;
    this.name = name;
    this.picture = picture;
  }
}
class Playlist {
  tracks: Array<Track>;
  constructor(tracks: Array<Track>) {
    this.tracks = tracks;
  }
}
class Track {
  trackId: string;
  title: string;
  preview: string;
  artist: string;
  album: Album;
  constructor(
    trackId: string,
    title: string,
    preview: string,
    artist: string,
    album: Album
  ) {
    this.trackId = trackId;
    this.title = title;
    this.preview = preview;
    this.artist = artist;
    this.album = album;
  }
}
class User {
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
}

export default { Album, Artist, Playlist, Track, User };
