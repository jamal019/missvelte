// src/lib/mediaStore.js
import { writable } from 'svelte/store';
import { MediaItem } from '$lib/models/MediaItem';

export const items = writable([
  new MediaItem("Titel 1", "https://picsum.photos/100/100", "2024-01-01"),
]);

export function addNewMedia() {
    console.log("ADD");
  const randomImgId = Math.floor(Math.random() * 1000);
  items.update(currentItems => [
    ...currentItems,
    new MediaItem(
      `Titel ${currentItems.length + 1}`,
      `https://picsum.photos/100/100?random=${randomImgId}`,
      Date.now().toString()
    )
  ]);
}
