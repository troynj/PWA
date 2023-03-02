import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) =>
  await openDB("jate", 1)
    .transaction("jate", "readwrite")
    .objectStore("jate")
    .put({ id: 1, text: content });

export const getOneDb = async (id) =>
  await openDB("jate", 1)
    .transaction("jate", "readwrite")
    .objectStore("jate")
    .get(id);

//Start Database
initdb();
