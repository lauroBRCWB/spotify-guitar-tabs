#!/usr/bin/env python3
"""
Scraper for Cifra Club and Ultimate Guitar playlists
Uses Playwright with stealth mode to bypass detection
"""

import asyncio
import json
from playwright.async_api import async_playwright

CIFRA_CLUB_URL = "https://www.cifraclub.com.br/musico/46019570/repertorio/5936760/"
ULTIMATE_GUITAR_URL = "https://www.ultimate-guitar.com/playlist/shared/7r51e5j9xy19"

async def scrape_cifraclub():
    """Scrape Cifra Club playlist"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        try:
            print(f"Navigating to {CIFRA_CLUB_URL}...")
            await page.goto(CIFRA_CLUB_URL, wait_until='networkidle', timeout=60000)
            
            # Wait for content to load
            await page.wait_for_timeout(3000)
            
            # Take screenshot for debugging
            await page.screenshot(path='/home/openclaw/.openclaw/workspace/spotify-guitar-tabs/cifraclub_debug.png')
            
            # Try multiple selectors for song items
            selectors = [
                '.g-musica',
                '[data-testid="song-item"]',
                '.song-item',
                '.musica-item',
                '.list-musicas li',
                '.repertorio-musica'
            ]
            
            songs = []
            for selector in selectors:
                try:
                    elements = await page.query_selector_all(selector)
                    if elements:
                        print(f"Found {len(elements)} elements with selector: {selector}")
                        for el in elements:
                            try:
                                # Try different title/artist selectors
                                title = await el.eval_on_selector('.musica-nome, .song-title, h3, .title, a', 'e => e.textContent.trim()')
                                artist = await el.eval_on_selector('.artista-nome, .song-artist, .artist', 'e => e.textContent.trim()')
                                link = await el.eval_on_selector('a', 'e => e.href')
                                
                                if title and artist:
                                    songs.append({
                                        'title': title,
                                        'artist': artist,
                                        'cifraClubUrl': link if link else f"https://www.cifraclub.com.br/{artist.lower().replace(' ', '-')}/{title.lower().replace(' ', '-')}/"
                                    })
                            except:
                                continue
                        break
                except:
                    continue
            
            await browser.close()
            
            if songs:
                print(f"Successfully scraped {len(songs)} songs from Cifra Club")
                return songs
            else:
                print("No songs found - page may be blocking access")
                return []
                
        except Exception as e:
            print(f"Error scraping Cifra Club: {e}")
            await browser.close()
            return []

async def scrape_ultimate_guitar():
    """Scrape Ultimate Guitar playlist"""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        try:
            print(f"Navigating to {ULTIMATE_GUITAR_URL}...")
            await page.goto(ULTIMATE_GUITAR_URL, wait_until='networkidle', timeout=60000)
            
            # Wait for content to load
            await page.wait_for_timeout(3000)
            
            # Take screenshot for debugging
            await page.screenshot(path='/home/openclaw/.openclaw/workspace/spotify-guitar-tabs/ug_debug.png')
            
            # Check if we're on a Cloudflare page
            title = await page.title()
            print(f"Page title: {title}")
            
            # Try multiple selectors for song items
            selectors = [
                '.song-item',
                '[data-testid="playlist-item"]',
                'table tbody tr',
                '.playlist-item',
                '.ug-tab-item'
            ]
            
            songs = []
            for selector in selectors:
                try:
                    elements = await page.query_selector_all(selector)
                    if elements:
                        print(f"Found {len(elements)} elements with selector: {selector}")
                        for el in elements:
                            try:
                                title = await el.eval_on_selector('.song-title, .title, td:nth-child(1)', 'e => e.textContent.trim()')
                                artist = await el.eval_on_selector('.artist-name, .artist, td:nth-child(2)', 'e => e.textContent.trim()')
                                link = await el.eval_on_selector('a[href*="/tab/"]', 'e => e.href')
                                
                                if title and artist:
                                    songs.append({
                                        'title': title,
                                        'artist': artist,
                                        'ultimateGuitarUrl': link
                                    })
                            except:
                                continue
                        break
                except:
                    continue
            
            await browser.close()
            
            if songs:
                print(f"Successfully scraped {len(songs)} songs from Ultimate Guitar")
                return songs
            else:
                print("No songs found - page may be blocking access")
                return []
                
        except Exception as e:
            print(f"Error scraping Ultimate Guitar: {e}")
            await browser.close()
            return []

async def main():
    print("=" * 50)
    print("Playlist Scraper")
    print("=" * 50)
    
    # Scrape both sites
    cifra_songs = await scrape_cifraclub()
    ug_songs = await scrape_ultimate_guitar()
    
    # Save results
    results = {
        'cifraClub': cifra_songs,
        'ultimateGuitar': ug_songs,
        'total': len(cifra_songs) + len(ug_songs)
    }
    
    output_file = '/home/openclaw/.openclaw/workspace/spotify-guitar-tabs/scraped_data.json'
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nResults saved to {output_file}")
    print(f"Total songs found: {results['total']}")

if __name__ == '__main__':
    asyncio.run(main())