// Service Worker for Offline Capability
const CACHE_NAME = 'cag-advisor-v1';
const DYNAMIC_CACHE = 'cag-dynamic-v1';

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/mock-interview',
  '/jobs',
  '/resources',
  '/about',
  '/services',
  '/_next/static/css/app/layout.css',
  '/images/cag-logo.png',
  '/images/logo.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => {
          return new Request(url, { cache: 'reload' });
        }).filter(request => {
          return request.url.startsWith(self.location.origin);
        }));
      })
      .catch((err) => {
        console.log('Service Worker: Cache failed', err);
      })
  );
  
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  
  // Claim all clients
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome extensions and non-http(s)
  if (!request.url.startsWith('http')) return;
  
  // Skip Next.js dev server and hot reload
  if (url.pathname.includes('_next/webpack') || 
      url.pathname.includes('__nextjs') ||
      url.pathname.includes('hot-update')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Cache hit - return cached version
        if (cachedResponse) {
          // Update cache in background for HTML pages
          if (request.headers.get('accept')?.includes('text/html')) {
            event.waitUntil(
              fetch(request)
                .then((response) => {
                  if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                      cache.put(request, responseClone);
                    });
                  }
                })
                .catch(() => {})
            );
          }
          return cachedResponse;
        }
        
        // Cache miss - fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache certain requests dynamically
            if (shouldCache(request)) {
              event.waitUntil(
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                  })
              );
            }
            
            return response;
          })
          .catch(() => {
            // Network failed - try to serve offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline').catch(() => {
                // Return a basic offline response
                return new Response(
                  `<!DOCTYPE html>
                  <html>
                    <head>
                      <title>Offline - CAG Advisor</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <style>
                        body {
                          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          height: 100vh;
                          margin: 0;
                          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        }
                        .offline-card {
                          background: white;
                          border-radius: 12px;
                          padding: 40px;
                          text-align: center;
                          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                          max-width: 400px;
                        }
                        h1 { color: #333; margin-bottom: 10px; }
                        p { color: #666; line-height: 1.6; }
                        .icon {
                          font-size: 64px;
                          margin-bottom: 20px;
                        }
                        button {
                          background: #667eea;
                          color: white;
                          border: none;
                          padding: 12px 24px;
                          border-radius: 6px;
                          font-size: 16px;
                          cursor: pointer;
                          margin-top: 20px;
                        }
                        button:hover { background: #5a67d8; }
                      </style>
                    </head>
                    <body>
                      <div class="offline-card">
                        <div class="icon">📡</div>
                        <h1>You're Offline</h1>
                        <p>It looks like you've lost your internet connection. Some features may be limited.</p>
                        <p>Check your connection and try again.</p>
                        <button onclick="window.location.reload()">Try Again</button>
                      </div>
                    </body>
                  </html>`,
                  { headers: { 'Content-Type': 'text/html' } }
                );
              });
            }
          });
      })
  );
});

// Helper function to determine if request should be cached
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Cache images, fonts, and static assets
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)) {
    return true;
  }
  
  // Cache CSS and JS files
  if (url.pathname.includes('/_next/static/')) {
    return true;
  }
  
  // Cache API responses for offline reading
  if (url.pathname.startsWith('/api/jobs') || 
      url.pathname.startsWith('/api/resources')) {
    return true;
  }
  
  return false;
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});