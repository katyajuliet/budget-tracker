// // global constants 
// const APP_PREFIX = 'FoodFest-';     
// const VERSION = 'version_01';
// const CACHE_NAME = APP_PREFIX + VERSION;

// const FILES_TO_CACHE = [
//   '/',
//   '/index.html',
//   '/js/index.js',
//   '/js/idb.js',
//   '/manifest.json',
//   '/css/styles.css',
//   '/icons/icon-72x72.png',
//   '/icons/icon-96x96.png',
//   '/icons/icon-128x128.png',
//   '/icons/icon-144x144.png',
//   '/icons/icon-152x152.png',
//   '/icons/icon-192x192.png',
//   '/icons/icon-384x384.png',
//   '/icons/icon-512x512.png'  
// ];

// // adding files to the pre-cache so that the application can use the cache (installing service worker)
// self.addEventListener('install', function (e) {
//   e.waitUntil(
//       caches.open(CACHE_NAME).then(function (cache) {
//         console.log('installing cache : ' + CACHE_NAME)
//         return cache.addAll(FILES_TO_CACHE)
//       })
//     )
// });

// // activate a service worker
// self.addEventListener('activate', function (e) {
//   e.waitUntil(
//     caches.keys().then(function (keyList) {
//       let cacheKeeplist = keyList.filter(function (key) {
//         return key.indexOf(APP_PREFIX);
//       });
//           cacheKeeplist.push(CACHE_NAME);
//           // returns a promise that resolves once all old versions of the cache have been deleted 
//           return Promise.all(keyList.map(function (key, i) {
//               if (cacheKeeplist.indexOf(key) === -1) {
//               console.log('deleting cache : ' + keyList[i] );
//               return caches.delete(keyList[i]);
//               }
//           })
//       );
//   })
//   )
// });

// // retrieving information from the cache 
// self.addEventListener('fetch', function (e) {
//   console.log('fetch request : ' + e.request.url)
//   e.respondWith(
//     caches.match(e.request).then(function (request) {
//       if (request) { 
//         console.log('responding with cache : ' + e.request.url)
//       //   console.log(e.request.url)
//         return request
//       } else {      
//         console.log('file is not cached, fetching : ' + e.request.url)
//       //   console.log(e.request.url)
//         return fetch(e.request)
//       }

//     })
//   )
// });

const CACHE_NAME = 'my-site-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v2';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/js/index.js',
  '/js/idb.js',
  '/manifest.json',
  '/css/styles.css',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png' 
];

// Install the service worker
self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Your files were pre-cached successfully!');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Activate the service worker and remove old data from the cache
self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache data', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Intercept fetch requests
self.addEventListener('fetch', function(evt) {
  if (evt.request.url.includes('/api/')) {
    evt.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }

              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        })
        .catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(
    fetch(evt.request).catch(function() {
      return caches.match(evt.request).then(function(response) {
        if (response) {
          return response;
        } else if (evt.request.headers.get('accept').includes('text/html')) {
          // return the cached home page for all requests for html pages
          return caches.match('/');
        }
      });
    })
  );
});