// @ts-nocheck
// src/lib/mediaStore.js
import { writable } from "svelte/store";
import { MediaItem } from "$lib/models/MediaItem";

// Svelte stores
export const items = writable([
  new MediaItem(
    "Titel 1",
    "https://picsum.photos/100/100",
    "01.06.2024",
    52.52,
    13.405
  ),
]);
export const itemTitle = writable("");

export function addNewMedia() {
  let titleValue = "";
  itemTitle.subscribe((value) => {
    titleValue = value;
  })();
  //don't add if empty
  //if (titleValue.trim() === "") return;

  const randomImgId = Math.floor(Math.random() * 1000);
  items.update((currentItems) => [
    ...currentItems,
    new MediaItem(
      titleValue,
      `https://picsum.photos/100/100?random=${randomImgId}`,
      new Date().toLocaleDateString("de-DE"),
      52.52,
      13.405
    ),
  ]);
}

//INDEXEDDB
if (typeof window !== "undefined") {
  const indexedDB = window.indexedDB;

  //Create DB called MediaDatabase
  const request = indexedDB.open("MediaDatabase", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
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
    const db = event.target.result;
    console.log("DB Success:", db);
  };

  // Error
  request.onerror = (err) => {
    console.error("Error", err);
  };
}

//CRUD Operations
const getAllItems = () => {};

export const addNewItem = () => {};

export const deleteItem = () => {};

export const editItem = () => {};