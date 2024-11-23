<script>
  // @ts-ignore
  import { onMount } from "svelte";

  let map;

  onMount(() => {
    // Initialize the map
    // @ts-ignore
    map = L.map("map").setView([52.52, 13.405], 10); // Default coordinates

    // @ts-ignore
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker
    // @ts-ignore
    L.marker([52.52, 13.405]).addTo(map).bindPopup("Lorem Ipsum").openPopup();
  });
</script>

<div id="map"></div>

<style>
  #map {
    height: 75vh;
    margin: 0 auto;
    width: 100%;
  }
</style>
