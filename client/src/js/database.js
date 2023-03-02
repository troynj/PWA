import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
// Export a function we will use to POST to the database.
// Exporting the function as a constant using ES6 syntax
export const putDb = async (content) => {
  // Logging a message to the console to indicate that the function has been called
  console.log('PUT to the database', content);
  
  // Opening the 'jate' database with version number 1 using the openDB function and waiting for it to complete
  const connectDb = await openDB('jate', 1);
  
  // Creating a transaction on the 'jate' object store in read-write mode
  const tx = connectDb.transaction('jate', 'readwrite');
  
  // Accessing the object store named 'jate' using the transaction object
  const store = tx.objectStore('jate');
  
  // Creating a request to update the record in the store with the given id and content
  const request = store.put({ id: 1, text: content });
  
  // Waiting for the request to complete and storing the result in a variable
  const result = await request;
  
  // Logging a message to the console indicating that the data has been saved
  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
// export const getOneDb = async () => console.error('getOneDb not implemented');
// Export a function we will use to GET to the database.
// Export a function we will use to GET from the database.
export const getOneDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const connectDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
  const tx = connectDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

   // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(1);
console.log("line 61", request)
  // Get confirmation of the request.
  const { text } = await request;
  console.log('result.value', text);
  return text;
};

//Start Database
initdb();
