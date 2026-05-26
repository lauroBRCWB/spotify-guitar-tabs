const STORAGE_KEY = "playlist-tabs-bridge-state-v1";
const SPOTIFY_CLIENT_KEY = "playlist-tabs-bridge-spotify-client-id";
const SPOTIFY_TOKEN_KEY = "playlist-tabs-bridge-spotify-token";

const SAMPLE_SONGS = [
    {
        title: "Wonderwall",
        artist: "Oasis",
        album: "(What's the Story) Morning Glory?",
        style: "Rock",
        spotifyUrl: "https://open.spotify.com/track/5qqabIl2vWzo9ApSC317sa",
        cifraClubUrl: "https://www.cifraclub.com.br/oasis/wonderwall/",
        ultimateGuitarUrl: "https://tabs.ultimate-guitar.com/tab/oasis/wonderwall-chords-27596"
    },
    {
        title: "Tempo perdido",
        artist: "Legiao Urbana",
        album: "Dois",
        style: "Rock brasileiro",
        spotifyUrl: "https://open.spotify.com/track/2vK5QYG7w4NfJvQ9VkiAz3",
        cifraClubUrl: "https://www.cifraclub.com.br/legiao-urbana/tempo-perdido/",
        ultimateGuitarUrl: "https://tabs.ultimate-guitar.com/tab/legiao-urbana/tempo-perdido-chords-1322818"
    }
];

class PlaylistTabsBridge {
    constructor() {
        this.state = this.loadState();
        this.importSource = "manual";
        this.spotifyToken = localStorage.getItem(SPOTIFY_TOKEN_KEY) || "";

        this.cacheDom();
        this.bindEvents();
        this.restoreSpotifyClientId();
        this.handleSpotifyRedirect();
        this.refresh();
        if (this.spotifyToken) {
            this.loadSpotifyPlaylists().catch((error) => this.setStatus(error.message, true));
        }
    }

    cacheDom() {
        this.songCountEl = document.getElementById("songCount");
        this.spotifyCountEl = document.getElementById("spotifyCount");
        this.tabsCountEl = document.getElementById("tabsCount");
        this.resultTextEl = document.getElementById("resultText");
        this.statusTextEl = document.getElementById("statusText");
        this.searchInputEl = document.getElementById("searchInput");
        this.styleFilterEl = document.getElementById("styleFilter");
        this.artistFilterEl = document.getElementById("artistFilter");
        this.coverageFilterEl = document.getElementById("coverageFilter");
        this.spotifyClientIdEl = document.getElementById("spotifyClientId");
        this.playlistSelectEl = document.getElementById("playlistSelect");
        this.loadPlaylistBtnEl = document.getElementById("loadPlaylistBtn");
        this.songsTableBodyEl = document.getElementById("songsTableBody");
        this.emptyStateEl = document.getElementById("emptyState");
        this.importDialogEl = document.getElementById("importDialog");
        this.importTextareaEl = document.getElementById("importTextarea");
        this.importSourceLabelEl = document.getElementById("importSourceLabel");
    }

    bindEvents() {
        document.getElementById("connectSpotifyBtn").addEventListener("click", () => this.startSpotifyAuth());
        document.getElementById("disconnectSpotifyBtn").addEventListener("click", () => this.disconnectSpotify());
        this.loadPlaylistBtnEl.addEventListener("click", () => this.fetchSelectedSpotifyPlaylist());
        document.getElementById("importCifraBtn").addEventListener("click", () => this.openImportDialog("cifraclub"));
        document.getElementById("importUgBtn").addEventListener("click", () => this.openImportDialog("ultimate-guitar"));
        document.getElementById("runImportBtn").addEventListener("click", (event) => {
            event.preventDefault();
            this.importJsonPayload();
        });
        document.getElementById("exportBtn").addEventListener("click", () => this.exportMergedJson());
        document.getElementById("clearDataBtn").addEventListener("click", () => this.clearData());
        document.getElementById("seedSamplesBtn").addEventListener("click", () => this.seedSamples());

        this.searchInputEl.addEventListener("input", () => this.refresh());
        this.styleFilterEl.addEventListener("change", () => this.refresh());
        this.artistFilterEl.addEventListener("change", () => this.refresh());
        this.coverageFilterEl.addEventListener("change", () => this.refresh());
        this.spotifyClientIdEl.addEventListener("change", () => {
            localStorage.setItem(SPOTIFY_CLIENT_KEY, this.spotifyClientIdEl.value.trim());
        });
    }

    loadState() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return { songs: [], imports: { spotify: 0, cifraclub: 0, "ultimate-guitar": 0 } };
        }

        try {
            return JSON.parse(raw);
        } catch {
            return { songs: [], imports: { spotify: 0, cifraclub: 0, "ultimate-guitar": 0 } };
        }
    }

    saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    }

    restoreSpotifyClientId() {
        const clientId = localStorage.getItem(SPOTIFY_CLIENT_KEY) || "";
        this.spotifyClientIdEl.value = clientId;
    }

    handleSpotifyRedirect() {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const token = params.get("access_token");
        if (!token) {
            return;
        }

        this.spotifyToken = token;
        localStorage.setItem(SPOTIFY_TOKEN_KEY, token);
        history.replaceState({}, document.title, window.location.pathname + window.location.search);
        this.setStatus("Spotify connected. Choose a playlist and fetch it.");
    }

    startSpotifyAuth() {
        const clientId = this.spotifyClientIdEl.value.trim();
        if (!clientId) {
            this.setStatus("Spotify Client ID is required before authentication.", true);
            this.spotifyClientIdEl.focus();
            return;
        }

        localStorage.setItem(SPOTIFY_CLIENT_KEY, clientId);

        const redirectUri = `${window.location.origin}${window.location.pathname}`;
        const scope = "playlist-read-private playlist-read-collaborative";
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.searchParams.set("client_id", clientId);
        authUrl.searchParams.set("response_type", "token");
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("scope", scope);

        window.location.href = authUrl.toString();
    }

    disconnectSpotify() {
        this.spotifyToken = "";
        localStorage.removeItem(SPOTIFY_TOKEN_KEY);
        this.playlistSelectEl.innerHTML = '<option value="">Connect first</option>';
        this.playlistSelectEl.disabled = true;
        this.loadPlaylistBtnEl.disabled = true;
        this.setStatus("Spotify disconnected.");
    }

    async spotifyRequest(path) {
        if (!this.spotifyToken) {
            throw new Error("Spotify is not connected.");
        }

        const response = await fetch(`https://api.spotify.com/v1${path}`, {
            headers: { Authorization: `Bearer ${this.spotifyToken}` }
        });

        if (response.status === 401) {
            this.disconnectSpotify();
            throw new Error("Spotify session expired. Connect again.");
        }

        if (!response.ok) {
            throw new Error(`Spotify request failed with ${response.status}.`);
        }

        return response.json();
    }

    async loadSpotifyPlaylists() {
        const data = await this.spotifyRequest("/me/playlists?limit=50");
        const playlists = data.items || [];

        this.playlistSelectEl.innerHTML = '<option value="">Select a playlist</option>';
        playlists.forEach((playlist) => {
            const option = document.createElement("option");
            option.value = playlist.id;
            option.textContent = `${playlist.name} (${playlist.tracks.total})`;
            this.playlistSelectEl.appendChild(option);
        });

        this.playlistSelectEl.disabled = false;
        this.loadPlaylistBtnEl.disabled = false;
        this.setStatus(`Spotify connected. ${playlists.length} playlists available.`);
    }

    async fetchSelectedSpotifyPlaylist() {
        const playlistId = this.playlistSelectEl.value;
        if (!playlistId) {
            this.setStatus("Select a Spotify playlist first.", true);
            return;
        }

        const playlist = await this.spotifyRequest(`/playlists/${playlistId}`);
        const trackItems = [];
        let nextUrl = `/playlists/${playlistId}/tracks?limit=100`;

        while (nextUrl) {
            const data = await this.spotifyRequest(nextUrl.replace("https://api.spotify.com/v1", ""));
            trackItems.push(...(data.items || []));
            nextUrl = data.next;
        }

        const songs = trackItems
            .filter((item) => item.track && item.track.type === "track")
            .map((item) => ({
                title: item.track.name,
                artist: (item.track.artists || []).map((artist) => artist.name).join(", "),
                album: item.track.album?.name || "",
                style: "",
                spotifyUrl: item.track.external_urls?.spotify || "",
                cifraClubUrl: "",
                ultimateGuitarUrl: "",
                importedFrom: `spotify:${playlist.name}`
            }));

        const summary = this.mergeSongs(songs, "spotify");
        this.setStatus(`Fetched ${songs.length} Spotify tracks from "${playlist.name}". Added ${summary.added}, updated ${summary.updated}.`);
        this.refresh();
    }

    openImportDialog(source) {
        this.importSource = source;
        this.importSourceLabelEl.textContent = source === "cifraclub" ? "Cifra Club" : "Ultimate Guitar";
        this.importTextareaEl.value = "";
        this.importDialogEl.showModal();
    }

    importJsonPayload() {
        let parsed;

        try {
            parsed = JSON.parse(this.importTextareaEl.value.trim());
        } catch (error) {
            this.setStatus(`Invalid JSON: ${error.message}`, true);
            return;
        }

        if (!Array.isArray(parsed)) {
            this.setStatus("Import payload must be an array.", true);
            return;
        }

        const songs = parsed
            .map((item) => this.normalizeImportedSong(item, this.importSource))
            .filter(Boolean);

        const summary = this.mergeSongs(songs, this.importSource);
        this.importDialogEl.close();
        this.setStatus(`Imported ${songs.length} ${this.importSource} entries. Added ${summary.added}, updated ${summary.updated}.`);
        this.refresh();
    }

    normalizeImportedSong(item, source) {
        const title = String(item.title || item.song || "").trim();
        const artist = String(item.artist || item.band || "").trim();
        if (!title || !artist) {
            return null;
        }

        const song = {
            title,
            artist,
            album: String(item.album || "").trim(),
            style: String(item.style || item.genre || "").trim(),
            spotifyUrl: String(item.spotifyUrl || "").trim(),
            cifraClubUrl: "",
            ultimateGuitarUrl: "",
            importedFrom: source
        };

        if (source === "cifraclub") {
            song.cifraClubUrl = String(item.cifraClubUrl || item.url || "").trim();
        }

        if (source === "ultimate-guitar") {
            song.ultimateGuitarUrl = String(item.ultimateGuitarUrl || item.url || "").trim();
        }

        return song;
    }

    mergeSongs(incomingSongs, source) {
        let added = 0;
        let updated = 0;

        incomingSongs.forEach((incoming) => {
            const key = this.buildSongKey(incoming.title, incoming.artist);
            const existing = this.state.songs.find((song) => song.key === key);

            if (!existing) {
                this.state.songs.push({
                    key,
                    title: incoming.title,
                    artist: incoming.artist,
                    album: incoming.album || "",
                    style: incoming.style || "",
                    spotifyUrl: incoming.spotifyUrl || "",
                    cifraClubUrl: incoming.cifraClubUrl || "",
                    ultimateGuitarUrl: incoming.ultimateGuitarUrl || "",
                    sources: [source],
                    importedFrom: incoming.importedFrom || source
                });
                added += 1;
                return;
            }

            existing.album ||= incoming.album || "";
            existing.style ||= incoming.style || "";
            existing.spotifyUrl ||= incoming.spotifyUrl || "";
            existing.cifraClubUrl ||= incoming.cifraClubUrl || "";
            existing.ultimateGuitarUrl ||= incoming.ultimateGuitarUrl || "";
            if (!existing.sources.includes(source)) {
                existing.sources.push(source);
            }
            updated += 1;
        });

        this.state.imports[source] = (this.state.imports[source] || 0) + incomingSongs.length;
        this.saveState();
        return { added, updated };
    }

    buildSongKey(title, artist) {
        return `${this.normalizeText(title)}::${this.normalizeText(artist)}`;
    }

    normalizeText(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    getFilteredSongs() {
        const search = this.normalizeText(this.searchInputEl.value);
        const style = this.styleFilterEl.value;
        const artist = this.artistFilterEl.value;
        const coverage = this.coverageFilterEl.value;

        return this.state.songs.filter((song) => {
            if (style && song.style !== style) {
                return false;
            }

            if (artist && song.artist !== artist) {
                return false;
            }

            if (coverage === "spotify" && !song.spotifyUrl) {
                return false;
            }

            if (coverage === "cifraclub" && !song.cifraClubUrl) {
                return false;
            }

            if (coverage === "ultimate-guitar" && !song.ultimateGuitarUrl) {
                return false;
            }

            if (coverage === "all-tabs" && !(song.cifraClubUrl && song.ultimateGuitarUrl)) {
                return false;
            }

            if (!search) {
                return true;
            }

            const haystack = this.normalizeText([
                song.title,
                song.artist,
                song.album,
                song.style
            ].join(" "));

            return haystack.includes(search);
        });
    }

    updateFilterOptions() {
        this.populateSelect(this.styleFilterEl, this.uniqueValues("style"), "All styles");
        this.populateSelect(this.artistFilterEl, this.uniqueValues("artist"), "All artists");
    }

    populateSelect(selectEl, values, fallbackLabel) {
        const currentValue = selectEl.value;
        selectEl.innerHTML = "";

        const fallback = document.createElement("option");
        fallback.value = "";
        fallback.textContent = fallbackLabel;
        selectEl.appendChild(fallback);

        values.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            selectEl.appendChild(option);
        });

        if (values.includes(currentValue)) {
            selectEl.value = currentValue;
        }
    }

    uniqueValues(field) {
        return [...new Set(this.state.songs.map((song) => song[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    }

    refresh() {
        this.updateFilterOptions();
        const songs = this.getFilteredSongs().sort((a, b) => {
            const artistCompare = a.artist.localeCompare(b.artist);
            if (artistCompare !== 0) {
                return artistCompare;
            }
            return a.title.localeCompare(b.title);
        });

        this.renderSongs(songs);
        this.renderStats();
        this.resultTextEl.textContent = `${songs.length} song${songs.length === 1 ? "" : "s"} in the current view`;
    }

    renderSongs(songs) {
        this.songsTableBodyEl.innerHTML = "";

        if (songs.length === 0) {
            this.emptyStateEl.hidden = false;
            return;
        }

        this.emptyStateEl.hidden = true;
        const fragment = document.createDocumentFragment();

        songs.forEach((song) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="song-title">${this.escapeHtml(song.title)}</div>
                    <div class="song-key">${this.escapeHtml(song.sources.join(", "))}</div>
                </td>
                <td>${this.escapeHtml(song.artist)}</td>
                <td>${this.escapeHtml(song.album || "—")}</td>
                <td>${song.style ? `<span class="chip">${this.escapeHtml(song.style)}</span>` : "—"}</td>
                <td>${this.renderLinks(song)}</td>
            `;
            fragment.appendChild(row);
        });

        this.songsTableBodyEl.appendChild(fragment);
    }

    renderLinks(song) {
        const links = [];

        if (song.spotifyUrl) {
            links.push(`<a class="link-pill link-spotify" href="${this.escapeAttribute(song.spotifyUrl)}" target="_blank" rel="noreferrer">Spotify</a>`);
        }

        if (song.cifraClubUrl) {
            links.push(`<a class="link-pill link-cifra" href="${this.escapeAttribute(song.cifraClubUrl)}" target="_blank" rel="noreferrer">Cifra Club</a>`);
        }

        if (song.ultimateGuitarUrl) {
            links.push(`<a class="link-pill link-ug" href="${this.escapeAttribute(song.ultimateGuitarUrl)}" target="_blank" rel="noreferrer">Ultimate Guitar</a>`);
        }

        return `<div class="link-group">${links.join("") || "—"}</div>`;
    }

    renderStats() {
        const total = this.state.songs.length;
        const spotifyLinks = this.state.songs.filter((song) => song.spotifyUrl).length;
        const tabs = this.state.songs.filter((song) => song.cifraClubUrl || song.ultimateGuitarUrl).length;

        this.songCountEl.textContent = String(total);
        this.spotifyCountEl.textContent = String(spotifyLinks);
        this.tabsCountEl.textContent = String(tabs);
    }

    exportMergedJson() {
        const blob = new Blob([JSON.stringify(this.state.songs, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "playlist-tabs-merged.json";
        anchor.click();
        URL.revokeObjectURL(url);
    }

    clearData() {
        if (!window.confirm("Clear all locally stored songs and imports?")) {
            return;
        }

        this.state = { songs: [], imports: { spotify: 0, cifraclub: 0, "ultimate-guitar": 0 } };
        this.saveState();
        this.refresh();
        this.setStatus("Local catalog cleared.");
    }

    seedSamples() {
        const summary = this.mergeSongs(SAMPLE_SONGS, "manual");
        this.setStatus(`Loaded sample data. Added ${summary.added}, updated ${summary.updated}.`);
        this.refresh();
    }

    setStatus(message, isError = false) {
        this.statusTextEl.textContent = message;
        this.statusTextEl.style.color = isError ? "var(--danger)" : "var(--muted)";
    }

    escapeHtml(value) {
        return String(value || "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");
    }

    escapeAttribute(value) {
        return this.escapeHtml(value).replaceAll("'", "&#39;");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new PlaylistTabsBridge();
});
