let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if(navigator.onLine) {
        // function that changes total
        uploadTransaction(); 
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

// if no internet, this function runs
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // access the object store for 'new_transaction'
    const transactionObjectStore = transaction.objectStore('new_transaction');

    transactionObjectStore.add(record);
}

// more functions 
// listen for app coming back online
function uploadTransaction() {
    // open a transaction on your db
    const transaction = db.transaction(['new_transaction'], 'readwrite');
  
    // access your object store
    const transactionObjectStore = transaction.objectStore('new_transaction');
  
    // get all records from store and set to a variable
    const getAll = transactionObjectStore.getAll();
  
    // upon a successful .getAll() execution, run this function
    getAll.onsuccess = function() {
        // if there was data in indexedDb's store, let's send it to the api server
        if (getAll.result.length > 0) {
            // no api route for this
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
            // open one more transaction
            const transaction = db.transaction(['new_transaction'], 'readwrite');
            // access the new_transaction object store
            const transactionObjectStore = transaction.objectStore('new_transaction');

            // clear all items in storage
            transactionObjectStore.clear();
            alert('All saved transactions have been added to the tracker!');
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}

// once connection is reestablished, add saved transactions
window.addEventListener('online', uploadTransaction);