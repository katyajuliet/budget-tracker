/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/service-worker.js":
/*!*************************************!*\
  !*** ./public/js/service-worker.js ***!
  \*************************************/
/***/ (() => {

eval("// // global constants \n// const APP_PREFIX = 'FoodFest-';     \n// const VERSION = 'version_01';\n// const CACHE_NAME = APP_PREFIX + VERSION;\n\n// const FILES_TO_CACHE = [\n//   '/',\n//   '/index.html',\n//   '/js/index.js',\n//   '/js/idb.js',\n//   '/manifest.json',\n//   '/css/styles.css',\n//   '/icons/icon-72x72.png',\n//   '/icons/icon-96x96.png',\n//   '/icons/icon-128x128.png',\n//   '/icons/icon-144x144.png',\n//   '/icons/icon-152x152.png',\n//   '/icons/icon-192x192.png',\n//   '/icons/icon-384x384.png',\n//   '/icons/icon-512x512.png'  \n// ];\n\n// // adding files to the pre-cache so that the application can use the cache (installing service worker)\n// self.addEventListener('install', function (e) {\n//   e.waitUntil(\n//       caches.open(CACHE_NAME).then(function (cache) {\n//         console.log('installing cache : ' + CACHE_NAME)\n//         return cache.addAll(FILES_TO_CACHE)\n//       })\n//     )\n// });\n\n// // activate a service worker\n// self.addEventListener('activate', function (e) {\n//   e.waitUntil(\n//     caches.keys().then(function (keyList) {\n//       let cacheKeeplist = keyList.filter(function (key) {\n//         return key.indexOf(APP_PREFIX);\n//       });\n//           cacheKeeplist.push(CACHE_NAME);\n//           // returns a promise that resolves once all old versions of the cache have been deleted \n//           return Promise.all(keyList.map(function (key, i) {\n//               if (cacheKeeplist.indexOf(key) === -1) {\n//               console.log('deleting cache : ' + keyList[i] );\n//               return caches.delete(keyList[i]);\n//               }\n//           })\n//       );\n//   })\n//   )\n// });\n\n// // retrieving information from the cache \n// self.addEventListener('fetch', function (e) {\n//   console.log('fetch request : ' + e.request.url)\n//   e.respondWith(\n//     caches.match(e.request).then(function (request) {\n//       if (request) { \n//         console.log('responding with cache : ' + e.request.url)\n//       //   console.log(e.request.url)\n//         return request\n//       } else {      \n//         console.log('file is not cached, fetching : ' + e.request.url)\n//       //   console.log(e.request.url)\n//         return fetch(e.request)\n//       }\n\n//     })\n//   )\n// });\n\nconst CACHE_NAME = 'my-site-cache-v2';\nconst DATA_CACHE_NAME = 'data-cache-v2';\n\nconst FILES_TO_CACHE = [\n  '/',\n  '/index.html',\n  '/js/index.js',\n  '/js/idb.js',\n  '/manifest.json',\n  '/css/styles.css',\n  '/icons/icon-72x72.png',\n  '/icons/icon-96x96.png',\n  '/icons/icon-128x128.png',\n  '/icons/icon-144x144.png',\n  '/icons/icon-152x152.png',\n  '/icons/icon-192x192.png',\n  '/icons/icon-384x384.png',\n  '/icons/icon-512x512.png' \n];\n\n// Install the service worker\nself.addEventListener('install', function(evt) {\n  evt.waitUntil(\n    caches.open(CACHE_NAME).then(cache => {\n      console.log('Your files were pre-cached successfully!');\n      return cache.addAll(FILES_TO_CACHE);\n    })\n  );\n\n  self.skipWaiting();\n});\n\n// Activate the service worker and remove old data from the cache\nself.addEventListener('activate', function(evt) {\n  evt.waitUntil(\n    caches.keys().then(keyList => {\n      return Promise.all(\n        keyList.map(key => {\n          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {\n            console.log('Removing old cache data', key);\n            return caches.delete(key);\n          }\n        })\n      );\n    })\n  );\n\n  self.clients.claim();\n});\n\n// Intercept fetch requests\nself.addEventListener('fetch', function(evt) {\n  if (evt.request.url.includes('/api/')) {\n    evt.respondWith(\n      caches\n        .open(DATA_CACHE_NAME)\n        .then(cache => {\n          return fetch(evt.request)\n            .then(response => {\n              // If the response was good, clone it and store it in the cache.\n              if (response.status === 200) {\n                cache.put(evt.request.url, response.clone());\n              }\n\n              return response;\n            })\n            .catch(err => {\n              // Network request failed, try to get it from the cache.\n              return cache.match(evt.request);\n            });\n        })\n        .catch(err => console.log(err))\n    );\n\n    return;\n  }\n\n  evt.respondWith(\n    fetch(evt.request).catch(function() {\n      return caches.match(evt.request).then(function(response) {\n        if (response) {\n          return response;\n        } else if (evt.request.headers.get('accept').includes('text/html')) {\n          // return the cached home page for all requests for html pages\n          return caches.match('/');\n        }\n      });\n    })\n  );\n});\n\n//# sourceURL=webpack://budget-tracker/./public/js/service-worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/service-worker.js"]();
/******/ 	
/******/ })()
;