#!/usr/bin/env python3
"""
Simple HTTP server for Spotify + Guitar Tabs app
Supports Spotify OAuth redirects
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for Spotify OAuth
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # Handle OAuth redirect
        if 'access_token' in self.path:
            # Serve index.html but preserve the hash for client-side handling
            self.path = '/index.html'
        return super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"🎸 Spotify + Guitar Tabs server running at {url}")
        print("Press Ctrl+C to stop")
        
        # Open browser
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")