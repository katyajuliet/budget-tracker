let db;
// establish a connection to IndexedDB database 
const request = indexedDB.open('budget-tracker', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
    db = event.target.result;
    // check if online
    if (navigator.onLine) {
      uploadTransaction();
    }
  };
  
request.onerror = function(event) {
console.log(event.target.errorCode);
};


function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite'); 
    const budgetObjectStore = transaction.objectStore('new_transaction');
    budgetObjectStore.add(record);
};

// function that will handle collecting data 
function uploadTransaction() {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
  
    // access your object store
    const budgetObjectStore = transaction.objectStore('new_transaction');
  
    // get all transactions from store and set to a variable
    const getAll = budgetObjectStore.getAll();
  
    // upon a successful .getAll() execution, run this function
    getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          
          const transaction = db.transaction(['new_transaction'], 'readwrite');
          // access stored
          const budgetObjectStore = transaction.objectStore('new_transaction');
          // clear all items in your stored
          budgetObjectStore.clear();

          alert('All saved transactions has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
window.addEventListener('online', uploadTransaction);