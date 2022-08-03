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

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("let db;\n// establish a connection to IndexedDB database \nconst request = indexedDB.open('budget-tracker', 1);\n\n// this event will emit if the database version changes\nrequest.onupgradeneeded = function(event) {\n    const db = event.target.result;\n    db.createObjectStore('new_transaction', { autoIncrement: true });\n};\n\n// upon a successful \nrequest.onsuccess = function(event) {\n    db = event.target.result;\n    // check if online\n    if (navigator.onLine) {\n      uploadTransaction();\n    }\n  };\n  \nrequest.onerror = function(event) {\nconsole.log(event.target.errorCode);\n};\n\n\nfunction saveRecord(record) {\n    const transaction = db.transaction(['new_transaction'], 'readwrite'); \n    const budgetObjectStore = transaction.objectStore('new_transaction');\n    budgetObjectStore.add(record);\n};\n\n// function that will handle collecting data \nfunction uploadTransaction() {\n    const transaction = db.transaction(['new_transaction'], 'readwrite');\n  \n    // access your object store\n    const budgetObjectStore = transaction.objectStore('new_transaction');\n  \n    // get all transactions from store and set to a variable\n    const getAll = budgetObjectStore.getAll();\n  \n    // upon a successful .getAll() execution, run this function\n    getAll.onsuccess = function() {\n    // if there was data in indexedDb's store, let's send it to the api server\n    if (getAll.result.length > 0) {\n      fetch('/api/transaction', {\n        method: 'POST',\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: 'application/json, text/plain, */*',\n          'Content-Type': 'application/json'\n        }\n      })\n        .then(response => response.json())\n        .then(serverResponse => {\n          if (serverResponse.message) {\n            throw new Error(serverResponse);\n          }\n          \n          const transaction = db.transaction(['new_transaction'], 'readwrite');\n          // access stored\n          const budgetObjectStore = transaction.objectStore('new_transaction');\n          // clear all items in your stored\n          budgetObjectStore.clear();\n\n          alert('All saved transactions has been submitted!');\n        })\n        .catch(err => {\n          console.log(err);\n        });\n    }\n  }\n}\nwindow.addEventListener('online', uploadTransaction);\n\n//# sourceURL=webpack://budget-tracker/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;