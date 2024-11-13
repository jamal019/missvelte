// src/lib/mediaStore.js
import { writable } from "svelte/store";
import { MediaItem } from "$lib/models/MediaItem";

export const items = writable([
  new MediaItem("Titel 1", "https://picsum.photos/100/100", "01.06.2024"),
]);

export const itemTitle = writable("");

export function addNewMedia() {
  /**
   * @type {string}
   */
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
      new Date().toLocaleDateString("de-DE")
    ),
  ]);
}

//INDEXEDDB
// const indexedDB = window.indexedDB;

// const request = indexedDB.open("MediaDatabase", 1);
// request.onerror = (/** @type {any} */ err) => {
//   console.log("Error", err);
// };
