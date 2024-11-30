<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  import { items } from "$lib/mediaStore.js";

  let map;

  function openDetails() {
    console.log("Detailsview");
  }

  onMount(() => {
    // Initialize the map
    map = L.map("map").setView([52.52, 13.405], 5); // Default coordinates

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker
    $items.forEach((item) => {
      const popupContent = `
        <div>
          <button class="popup-link" data-title="${item.title}">
            ${item.title}
          </button>
        </div>
      `;

      L.marker([item.latitude, item.longitude])
        .addTo(map)
        .bindPopup(popupContent)
        //.openPopup();
    });

    //on popup click
    map.on("popupopen", (e) => {
      const link = e.popup._contentNode.querySelector(".popup-link");
      if (link) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          openDetails();
        });
      }
    });
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
