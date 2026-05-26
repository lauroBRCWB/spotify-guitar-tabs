/*
Paste the site-specific function into the browser console while the source page is open.
Each function copies JSON to the clipboard and logs it in the console.
*/

function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
}

function uniqueBySong(items) {
    const seen = new Set();
    return items.filter((item) => {
        const key = `${cleanText(item.title).toLowerCase()}::${cleanText(item.artist).toLowerCase()}`;
        if (!item.title || !item.artist || seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

function copyResult(items) {
    const payload = JSON.stringify(items, null, 2);
    console.log(payload);
    if (typeof copy === "function") {
        copy(payload);
        console.log(`Copied ${items.length} songs to clipboard.`);
    }
    return items;
}

function extractCifraClubPlaylist() {
    const anchors = [...document.querySelectorAll("a[href*='cifraclub.com.br'], a[href^='/']")];
    const items = anchors.map((anchor) => {
        const url = anchor.href || "";
        const title = cleanText(anchor.textContent);
        const card = anchor.closest("li, article, div, tr");
        const cardText = cleanText(card?.textContent || "");
        const artist = cleanText(
            card?.querySelector("[class*='artist'], small, span")?.textContent ||
            cardText.replace(title, "").split("  ")[0]
        );

        if (!/cifraclub\.com\.br/.test(url) && !url.startsWith("/")) {
            return null;
        }

        if (!title || title.length < 2) {
            return null;
        }

        return {
            title,
            artist,
            url
        };
    }).filter(Boolean);

    return copyResult(uniqueBySong(items));
}

function extractUltimateGuitarPlaylist() {
    const anchors = [...document.querySelectorAll("a[href*='/tab/'], a[href*='ultimate-guitar.com']")];
    const items = anchors.map((anchor) => {
        const url = anchor.href || "";
        const row = anchor.closest("tr, li, article, div");
        const rowText = cleanText(row?.textContent || "");
        const title = cleanText(anchor.textContent);
        const artist = cleanText(
            row?.querySelector("[class*='artist'], [data-testid*='artist'], small, span")?.textContent ||
            rowText.replace(title, "").split("  ")[0]
        );

        if (!url.includes("ultimate-guitar.com")) {
            return null;
        }

        if (!title || title.length < 2) {
            return null;
        }

        return {
            title,
            artist,
            url
        };
    }).filter(Boolean);

    return copyResult(uniqueBySong(items));
}

window.PlaylistImporters = {
    extractCifraClubPlaylist,
    extractUltimateGuitarPlaylist
};

console.log("Available helpers:");
console.log("PlaylistImporters.extractCifraClubPlaylist()");
console.log("PlaylistImporters.extractUltimateGuitarPlaylist()");
