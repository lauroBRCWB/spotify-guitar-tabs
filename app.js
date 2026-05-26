const STORAGE_KEY = "playlist-tabs-bridge-state-v1";
const SPOTIFY_CLIENT_KEY = "playlist-tabs-bridge-spotify-client-id";
const SPOTIFY_TOKEN_KEY = "playlist-tabs-bridge-spotify-token";
const DEFAULT_SPOTIFY_CLIENT_ID = "1b70bc8f5c3645a394da45a14c2429b3";

const SAMPLE_SONGS = [
  {"title": "O Sol", "artist": "Vitor Kley", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/vitor-kley/o-sol/"},
  {"title": "Zombie", "artist": "The Cranberries", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-cranberries/zombie/"},
  {"title": "Acima do Sol", "artist": "Skank", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/skank/acima-do-sol/"},
  {"title": "Pescador de Ilusões", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/pescador-de-ilusoes/"},
  {"title": "Velha Infância", "artist": "Tribalistas", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tribalistas/velha-infancia/"},
  {"title": "Anunciação", "artist": "Alceu Valença", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/alceu-valenca/anunciacao/"},
  {"title": "Trem-Bala", "artist": "Ana Vilela", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/ana-vilela/trem-bala/"},
  {"title": "Torn", "artist": "Natalie Imbruglia", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/natalie-imbruglia/torn/"},
  {"title": "Good Riddance (Time Of Your Life)", "artist": "Green Day", "style": "Punk Rock", "cifraClubUrl": "https://www.cifraclub.com.br/green-day/good-riddance-time-of-your-life/"},
  {"title": "O' Children", "artist": "Nick Cave", "style": "Alternative", "cifraClubUrl": "https://www.cifraclub.com.br/nick-cave/o-children/"},
  {"title": "Bixinho", "artist": "DUDA BEAT", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/duda-beat/bixinho/"},
  {"title": "Como Eu Quero", "artist": "Kid Abelha", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/kid-abelha/como-eu-quero/"},
  {"title": "Wonderwall", "artist": "Oasis", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/oasis/wonderwall/", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/oasis/wonderwall-chords-27596"},
  {"title": "Save Tonight", "artist": "Eagle-Eye Cherry", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/eagle-eye-cherry/save-tonight/"},
  {"title": "Linger", "artist": "The Cranberries", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-cranberries/linger/"},
  {"title": "Last Kiss", "artist": "Pearl Jam", "style": "Grunge", "cifraClubUrl": "https://www.cifraclub.com.br/pearl-jam/last-kiss/"},
  {"title": "Me Namora", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/me-namora/"},
  {"title": "Lenha", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/lenha/"},
  {"title": "Já Sei Namorar", "artist": "Tribalistas", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tribalistas/ja-sei-namorar/"},
  {"title": "Pra Dizer Adeus", "artist": "Titãs", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/titas/pra-dizer-adeus/"},
  {"title": "Exagerado", "artist": "Cazuza", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/cazuza/exagerado/"},
  {"title": "Partilhar", "artist": "Rubel", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/rubel/partilhar/"},
  {"title": "Kiss From a Rose", "artist": "Seal", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/seal/kiss-from-a-rose/"},
  {"title": "O Passageiro", "artist": "Capital Inicial", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/capital-inicial/o-passageiro/"},
  {"title": "Somewhere Over The Rainbow", "artist": "Israel Kamakawiwo'ole", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/israel-kamakawiwoole/somewhere-over-the-rainbow/"},
  {"title": "Always Remember Us This Way", "artist": "Lady Gaga", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/lady-gaga/always-remember-us-this-way/"},
  {"title": "Stand By Me", "artist": "The Beatles", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/the-beatles/stand-by-me/"},
  {"title": "Quarter Past Four", "artist": "Avriel & The Sequoias", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/avriel-the-sequoias/quarter-past-four/"},
  {"title": "Barely Breathing", "artist": "Duncan Sheik", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/duncan-sheik/barely-breathing/"},
  {"title": "Simple Song", "artist": "Passenger", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/passenger/simple-song/"},
  {"title": "Pintinho Amarelinho", "artist": "Galinha Pintadinha", "style": "Children", "cifraClubUrl": "https://www.cifraclub.com.br/galinha-pintadinha/pintinho-amarelinho/"},
  {"title": "Só Os Loucos Sabem", "artist": "Charlie Brown Jr.", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/charlie-brown-jr/so-os-loucos-sabem/"},
  {"title": "Minha Felicidade", "artist": "Roberta Campos", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/roberta-campos/minha-felicidade/"},
  {"title": "Telegrama", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/telegrama/"},
  {"title": "Tive Razão", "artist": "Seu Jorge", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/seu-jorge/tive-razao/"},
  {"title": "Tribo da Lua", "artist": "Dazaranha", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/dazaranha/tribo-da-lua/"},
  {"title": "Vapor Barato", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/vapor-barato/"},
  {"title": "Rodo Cotidiano", "artist": "O Rappa", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/o-rappa/rodo-cotidiano/"},
  {"title": "Lágrimas e Chuva", "artist": "Kid Abelha", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/kid-abelha/lagrimas-e-chuva/"},
  {"title": "Até o Fim", "artist": "Engenheiros do Hawaii", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/engenheiros-do-hawaii/ate-o-fim/"},
  {"title": "Garotos II - O Outro Lado", "artist": "Leoni", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/leoni/garotos-ii-o-outro-lado/"},
  {"title": "What a Wonderful World", "artist": "Israel Kamakawiwo'ole", "style": "Folk", "cifraClubUrl": "https://www.cifraclub.com.br/israel-kamakawiwoole/what-a-wonderful-world/"},
  {"title": "Proibida Pra Mim", "artist": "Zeca Baleiro", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/zeca-baleiro/proibida-pra-mim/"},
  {"title": "Burguesinha", "artist": "Seu Jorge", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/seu-jorge/burguesinha/"},
  {"title": "Deixe-me Ir", "artist": "1Kilo", "style": "Pop", "cifraClubUrl": "https://www.cifraclub.com.br/1kilo/deixe-me-ir/"},
  {"title": "Malandragem", "artist": "Cássia Eller", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/cassia-eller/malandragem/"},
  {"title": "Várias Queixas", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/varias-queixas/"},
  {"title": "Vagabundo Confesso", "artist": "Dazaranha", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/dazaranha/vagabundo-confesso/"},
  {"title": "A Noite", "artist": "Tiê", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tie/a-noite/"},
  {"title": "Medo Bobo", "artist": "Maiara & Maraisa", "style": "Sertanejo", "cifraClubUrl": "https://www.cifraclub.com.br/maiara-e-maraisa/medo-bobo/"},
  {"title": "Você", "artist": "Tim Maia", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tim-maia/voce/"},
  {"title": "Quero Ser Feliz Também", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/quero-ser-feliz-tambem/"},
  {"title": "Sorri, Sou Rei", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/sorri-sou-rei/"},
  {"title": "Devagarinho", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/devagarinho/"},
  {"title": "Tudo Vai Dar Certo", "artist": "Natiruts", "style": "Reggae", "cifraClubUrl": "https://www.cifraclub.com.br/natiruts/tudo-vai-dar-certo/"},
  {"title": "Azul da Cor do Mar", "artist": "Tim Maia", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/tim-maia/azul-da-cor-do-mar/"},
  {"title": "Mais Uma Vez", "artist": "Jota Quest", "style": "Pop Rock", "cifraClubUrl": "https://www.cifraclub.com.br/jota-quest/mais-uma-vez/"},
  {"title": "Ai Que Saudade D'ocê", "artist": "Alceu Valença", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/alceu-valenca/ai-que-saudade-doce/"},
  {"title": "Love Love", "artist": "Gilsons", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/gilsons/love-love/"},
  {"title": "Boa Sorte / Good Luck", "artist": "Vanessa da Mata", "style": "MPB", "cifraClubUrl": "https://www.cifraclub.com.br/vanessa-da-mata/boa-sorte-good-luck/"},
  {"title": "Tempo Perdido", "artist": "Legião Urbana", "style": "Rock", "cifraClubUrl": "https://www.cifraclub.com.br/legiao-urbana/tempo-perdido/"},
  {"title": "Alecrim", "artist": "Músicas Infantis", "style": "Children", "cifraClubUrl": "https://www.cifraclub.com.br/musicas-infantis/alecrim/"},
  {"title": "Someone Like You", "artist": "Adele", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/adele/someone-like-you-chords-1036262"},
  {"title": "Je Veux", "artist": "Zaz", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/zaz/je-veux-chords-1094775"},
  {"title": "Hey Ya", "artist": "Avriel & The Sequoias", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/avriel-the-sequoias/hey-ya-chords-1844825"},
  {"title": "Hotel California", "artist": "Eagles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/eagles/hotel-california-chords-46190"},
  {"title": "Can't Help Falling In Love", "artist": "UB40", "style": "Reggae", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/ub40/cant-help-falling-in-love-chords-1489"},
  {"title": "I See Fire", "artist": "Ed Sheeran", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/ed-sheeran/i-see-fire-official-1383187"},
  {"title": "When I Come Around", "artist": "Green Day", "style": "Punk Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/green-day/when-i-come-around-official-191358"},
  {"title": "Shallow", "artist": "Lady Gaga", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/lady-gaga/shallow-official-2488832"},
  {"title": "Have You Ever Seen The Rain", "artist": "Creedence Clearwater Revival", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/creedence-clearwater-revival/have-you-ever-seen-the-rain-official-191355"},
  {"title": "Imagine", "artist": "John Lennon", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/john-lennon/imagine-official-191355"},
  {"title": "What's Up", "artist": "4 Non Blondes", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-official-191355"},
  {"title": "Counting Stars", "artist": "OneRepublic", "style": "Pop Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/onerepublic/counting-stars-official-1407373"},
  {"title": "Cotton Eye Joe", "artist": "The Sweeplings", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-sweeplings/cotton-eye-joe-chords-1844827"},
  {"title": "Stairway To Heaven", "artist": "Led Zeppelin", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/led-zeppelin/stairway-to-heaven-official-14938"},
  {"title": "Society", "artist": "Eddie Vedder", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/eddie-vedder/society-official-992186"},
  {"title": "Dust In The Wind", "artist": "Kansas", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/kansas/dust-in-the-wind-official-1478"},
  {"title": "Wild World", "artist": "Cat Stevens (Yusuf Islam)", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/cat-stevens/wild-world-official-1480"},
  {"title": "Wanted Dead Or Alive", "artist": "Bon Jovi", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/bon-jovi/wanted-dead-or-alive-official-1481"},
  {"title": "Right Here Waiting", "artist": "Richard Marx", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/richard-marx/right-here-waiting-official-1482"},
  {"title": "Dance Monkey", "artist": "Tones And I", "style": "Pop", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/tones-and-i/dance-monkey-official-2814749"},
  {"title": "Here Comes The Sun", "artist": "The Beatles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-beatles/here-comes-the-sun-official-1866"},
  {"title": "Don't Let Me Down", "artist": "The Beatles", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-beatles/dont-let-me-down-official-1867"},
  {"title": "Sitting Waiting Wishing", "artist": "Jack Johnson", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/jack-johnson/sitting-waiting-wishing-official-1483"},
  {"title": "Upside Down", "artist": "Jack Johnson", "style": "Folk", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/jack-johnson/upside-down-official-1484"},
  {"title": "Creep", "artist": "Radiohead", "style": "Alternative Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/radiohead/creep-official-391"},
  {"title": "De Ushuaia A La Quiaca", "artist": "Gustavo Santaolalla", "style": "Instrumental", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/gustavo-santaolalla/de-ushuaia-a-la-quiaca-pro-1485"},
  {"title": "Alive", "artist": "Pearl Jam", "style": "Grunge", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pearl-jam/alive-official-460"},
  {"title": "Intro", "artist": "The xx", "style": "Alternative", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/the-xx/intro-official-1078314"},
  {"title": "Best Of You", "artist": "Foo Fighters", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/foo-fighters/best-of-you-official-1486"},
  {"title": "The Unforgiven", "artist": "Metallica", "style": "Metal", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/metallica/the-unforgiven-official-378"},
  {"title": "Everything You Want", "artist": "Vertical Horizon", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/vertical-horizon/everything-you-want-official-1487"},
  {"title": "Sultans Of Swing", "artist": "Dire Straits", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/dire-straits/sultans-of-swing-official-1488"},
  {"title": "Wish You Were Here", "artist": "Pink Floyd", "style": "Rock", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pink-floyd/wish-you-were-here-official-2412207"},
  {"title": "Black", "artist": "Pearl Jam", "style": "Grunge", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/pearl-jam/black-official-2451097"},
  {"title": "Nothing Else Matters", "artist": "Metallica", "style": "Metal", "ultimateGuitarUrl": "https://tabs.ultimate-guitar.com/tab/metallica/nothing-else-matters-official-1910953"}
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
        const clientId = localStorage.getItem(SPOTIFY_CLIENT_KEY) || DEFAULT_SPOTIFY_CLIENT_ID;
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
