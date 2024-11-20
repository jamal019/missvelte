// @ts-nocheck
// src/lib/mediaStore.js
import { writable } from "svelte/store";
import { MediaItem } from "$lib/models/MediaItem";

// Svelte stores
export const items = writable([]);
export const itemTitle = writable("");

// export function addNewMedia() {
//   let titleValue = "";
//   itemTitle.subscribe((value) => {
//     titleValue = value;
//   })();
//   //don't add if empty
//   //if (titleValue.trim() === "") return;

//   const randomImgId = Math.floor(Math.random() * 1000);
//   items.update((currentItems) => [
//     ...currentItems,
//     new MediaItem(
//       titleValue,
//       `https://picsum.photos/100/100?random=${randomImgId}`,
//       new Date().toLocaleDateString("de-DE"),
//       52.52,
//       13.405
//     ),
//   ]);
// }

/*
***************
INITIALIZE INDEXEDDB
***************
*/

let db;
if (typeof window !== "undefined") {
  const indexedDB = window.indexedDB;

  //Create DB called MediaDatabase
  const request = indexedDB.open("MediaDatabase", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    // Create an objectStore
    if (!db.objectStoreNames.contains("mediaItems")) {
      db.createObjectStore("mediaItems", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("Object store 'mediaItems' created.");
    }
  };

  // Database opened successfully
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("DB Success:", db);

    getAllItems();
  };

  // Error
  request.onerror = (err) => {
    console.error("Error", err);
  };
}

/*
***************
CRUD Operations
***************
*/

//GET
const getAllItems = () => {
  const transaction = db.transaction("mediaItems", "readonly");
  const objStore = transaction.objectStore("mediaItems");
  //get all from objectstore
  const req = objStore.getAll();

  //on success, set all objStore items result into svelte items writable store
  req.onsuccess = () => {
    items.set(req.result);
    console.log("All Items:", req.result);
  };
  // Error
  req.onerror = (err) => {
    console.error("Error", err);
  };
};

//CREATE
export const addNewItem = () => {
  let titleValue = "";
  itemTitle.subscribe((value) => {
    titleValue = value;
  })();

  //create new MediaItem
  const randomImgId = Math.floor(Math.random() * 1000);
  const newItem = new MediaItem(
    titleValue,
    `https://picsum.photos/600/600?random=${randomImgId}`,
    new Date().toLocaleDateString("de-DE"),
    52.52,
    13.405
  );

  //add new MediaItem into object store
  const transaction = db.transaction("mediaItems", "readwrite");
  const objStore = transaction.objectStore("mediaItems");
  const req = objStore.add(newItem);

  //on success, update svelte items writable store
  req.onsuccess = (event) => {
    console.log("key", event.target.result);
    const generatedId = event.target.result;
    newItem.id = generatedId;
    items.update((currentItems) => [...currentItems, newItem]);
    console.log("New Item added:", newItem);
  };
  // Error
  req.onerror = (err) => {
    console.error("Error adding new item", err);
  };
};

//DELETE
export const deleteItem = (id) => {
  //delete MediaItem from object store
  const transaction = db.transaction("mediaItems", "readwrite");
  const objStore = transaction.objectStore("mediaItems");
  const req = objStore.delete(id);

  //on success delete, update svelte items writable store with filter
  req.onsuccess = () => {
    items.update((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
    console.log("Deleted Item:", id);
  };
  // Error
  req.onerror = (err) => {
    console.error("Error deleting item", err);
  };
};

//EDIT
export const editItem = (id, newTitle) => {
  //edit MediaItem title
  const transaction = db.transaction("mediaItems", "readwrite");
  const objStore = transaction.objectStore("mediaItems");
  //get item by id
  const req = objStore.get(id);

  req.onsuccess = () => {
    //change item's title and put into store
    const item = req.result;
    item.title = newTitle;
    objStore.put(item);

    //update svelte items writable store
    items.update((currentItems) => {
      const index = currentItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        currentItems[index] = { ...currentItems[index], title: newTitle };
      }
      return currentItems;
    });
  };
  //Error
  req.onerror = (err) => {
    console.error("Error deleting item", err);
  };
};

//REFRESH
export const refresh = () => {
  getAllItems();
};
