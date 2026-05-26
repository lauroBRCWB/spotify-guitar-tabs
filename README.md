# Playlist tabs bridge

Static web page that merges:

- a Spotify playlist fetched live through Spotify OAuth
- a Cifra Club repertoire exported from the browser console
- an Ultimate Guitar playlist exported from the browser console

## Why import-assisted for the tab sites

Both of these source URLs are currently blocking automated access from this runtime:

- `https://www.cifraclub.com.br/musico/46019570/repertorio/5936760/`
- `https://www.ultimate-guitar.com/playlist/shared/7r51e5j9xy19`

That means a truthful implementation cannot promise reliable server-side scraping without a separate browser session or a bespoke proxy that defeats those protections. This app therefore keeps Spotify live and treats the two tab sites as browser-assisted imports.

## Files

- `index.html`: UI
- `styles.css`: styling
- `app.js`: merge logic, Spotify OAuth, filtering, export
- `import-playlists.js`: helper extractors to run inside your own browser on the source sites
- `serve.py`: simple local static server for testing

## Local run

```bash
cd /home/openclaw/.openclaw/workspace/spotify-guitar-tabs
python3 serve.py
```

Open `http://localhost:8000`.

## Spotify setup

1. Create an app in the Spotify Developer Dashboard.
2. Add your deployed URL as a redirect URI.
3. For local testing, also add `http://localhost:8000`.
4. Paste the Spotify Client ID into the page and click `Connect Spotify`.

## Importing Cifra Club and Ultimate Guitar

1. Open the target source page in your normal browser session.
2. Open devtools console.
3. Paste the relevant function from `import-playlists.js`.
4. Run:
   - `PlaylistImporters.extractCifraClubPlaylist()`
   - `PlaylistImporters.extractUltimateGuitarPlaylist()`
5. Paste the resulting JSON into the matching import modal in the app.

## Publish

This folder is publish-ready as a static site, but it has not been deployed from this runtime because no deployment target or approval to push external changes was provided.

Any static host works:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

The only deployment-specific requirement is updating Spotify redirect URIs to match the final domain.
