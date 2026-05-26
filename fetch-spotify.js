// Fetch Spotify playlist and search for tabs
// This script needs to be run in a browser with Spotify authentication

const SPOTIFY_CLIENT_ID = '1b70bc8f5c3645a394da45a14c2429b3';
const REDIRECT_URI = 'https://laurobrcwb.github.io/spotify-guitar-tabs/fetch-spotify.html';

class SpotifyTabFetcher {
  constructor() {
    this.accessToken = null;
    this.playlistId = '7mlYHWuou26jubLIsk6wvk';
  }

  // Step 1: Authenticate with Spotify
  authenticate() {
    const scopes = 'playlist-read-private playlist-read-collaborative';
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${SPOTIFY_CLIENT_ID}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scopes)}`;
    
    window.location.href = authUrl;
  }

  // Step 2: Handle auth callback
  handleCallback() {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      this.accessToken = params.get('access_token');
      history.replaceState(null, null, window.location.pathname);
      return true;
    }
    return false;
  }

  // Step 3: Fetch playlist tracks
  async fetchPlaylist() {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${this.playlistId}/tracks`, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const data = await response.json();
    return data.items.map(item => ({
      title: item.track.name,
      artist: item.track.artists.map(a => a.name).join(', '),
      album: item.track.album.name,
      spotifyUrl: item.track.external_urls.spotify
    }));
  }

  // Step 4: Generate search URLs for tabs
  generateTabSearchUrls(song) {
    const encodedTitle = encodeURIComponent(song.title);
    const encodedArtist = encodeURIComponent(song.artist);
    
    return {
      cifraClubSearch: `https://www.cifraclub.com.br/busca/?q=${encodedTitle}%20${encodedArtist}`,
      ultimateGuitarSearch: `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodedTitle}`,
      // Direct URL patterns (may or may not exist)
      cifraClubDirect: `https://www.cifraclub.com.br/${song.artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${song.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}/`,
      ultimateGuitarDirect: `https://tabs.ultimate-guitar.com/tab/${song.artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${song.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-chords`
    };
  }

  // Step 5: Create song object with search links
  createSongObject(song) {
    const urls = this.generateTabSearchUrls(song);
    
    return {
      title: song.title,
      artist: song.artist,
      style: 'Unknown', // Will need to be filled manually
      spotifyUrl: song.spotifyUrl,
      cifraClubSearch: urls.cifraClubSearch,
      ultimateGuitarSearch: urls.ultimateGuitarSearch
    };
  }

  // Main flow
  async run() {
    if (!this.handleCallback()) {
      // Not authenticated yet
      return { status: 'auth_required' };
    }

    // Authenticated, fetch playlist
    const tracks = await this.fetchPlaylist();
    const songs = tracks.map(t => this.createSongObject(t));
    
    return {
      status: 'success',
      songs: songs
    };
  }
}

// Usage in browser:
// const fetcher = new SpotifyTabFetcher();
// const result = await fetcher.run();
// if (result.status === 'auth_required') {
//   fetcher.authenticate();
// } else {
//   console.log(result.songs);
// }