// @ts-nocheck
// src/lib/mediaStore.js
import { writable } from "svelte/store";
import { MediaItem } from "$lib/models/MediaItem";

// Svelte stores
export const items = writable([]);
export const itemTitle = writable("");
export const itemImage = writable("");

export const itemLat = writable(0);
export const itemLong = writable(0);

export const itemStorage = writable("");

export const itemFile = writable(null);

export const filterMode = writable('all'); 


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
export const addNewItem = async () => {
  let titleValue = "";
  itemTitle.subscribe((value) => {
    titleValue = value;
  })();

  let imgSrcValue = "";
  itemImage.subscribe((src) => {
    imgSrcValue = src;
  })();

  let imgLat = 0;
  itemLat.subscribe((lat) => {
    imgLat = lat;
  })();

  let imgLong = 0;
  itemLong.subscribe((long) => {
    imgLong = long;
  })();


    let storageLoc = "";
  itemStorage.subscribe((loc) => {
    storageLoc = loc;
  })();

  let finalImageUrl = imgSrcValue;

  if (storageLoc === "remote") {
    let file;
    itemFile.subscribe((f) => {
      file = f;
    })();

    if (file) {
      // If file is selected, upload it to the server
      const formData = new FormData();
      formData.append("image", file);  // Append the selected file

      try {
        const response = await fetch("http://localhost:7077/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Fehler beim Hochladen der Datei");
        }

        const data = await response.json();
        console.log(data);
        finalImageUrl = `http://localhost:7077/uploads/${data.file.originalname}`;
      } catch (error) {
        console.error("Fehler beim Hochladen der Datei:", error);
        return;  // Exit if there was an error during upload
      }
    } else {
      // If no file is selected, fall back to the image source URL
      finalImageUrl = imgSrcValue;
    }
  }

  //create new MediaItem
  //const randomImgId = Math.floor(Math.random() * 1000);
  const newItem = new MediaItem(
    titleValue,
    finalImageUrl,
    //`https://picsum.photos/600/600?random=${randomImgId}`,
    new Date().toLocaleDateString("de-DE"),
    storageLoc,
    imgLat,
    imgLong
    //random locations //TODO
    //Math.random() * (55.1 - 47.3) + 47.3,
    //Math.random() * (15.0 - 5.9) + 5.9
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
export const editItem = (id, newTitle, newImage) => {
  if (!id) {
    console.error("Invalid ID:", id);
    return;
  }
  if (!newTitle && !newImage) {
    console.error("No changes provided");
    return;
  }

  //edit MediaItem title
  const transaction = db.transaction("mediaItems", "readwrite");
  const objStore = transaction.objectStore("mediaItems");
  //get item by id
  const req = objStore.get(id);

  req.onsuccess = () => {
    //change item's title and put into store
    const item = req.result;
    if (item) {
      item.title = newTitle;
      item.imageUrl = newImage;
    }
    objStore.put(item);

    //update svelte items writable store
    items.update((currentItems) => {
      const index = currentItems.findIndex((i) => i.id === id);
      if (index !== -1) {
        currentItems[index] = {
          ...currentItems[index],
          title: newTitle,
          imageUrl: newImage,
        };
      }
      return currentItems;
    });
  };
  //Error
  req.onerror = (err) => {
    console.error("Error editing item", err);
  };
};

//REFRESH
export const refresh = () => {
  getAllItems();
};

//AUTOFOCUS
export function handleAutofocus(el) {
  el.focus();
}
