<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { items, deleteItem } from "$lib/mediaStore.js";
  import Details from "$lib/Details.svelte";
  import Dialog from "$lib/Dialog.svelte"; // Assuming you have a Dialog component

  let showDialog = $state(false);
  let selectedItem = $state(null);
  let dialogMode = $state("view");
  let detailsItem = $state(false);

  let map;
  let dialogDelete = $state(false); // New state to manage delete confirmation dialog

  function openDialog(item) {
    selectedItem = item;
    showDialog = true;
    dialogMode = "view";
    document.body.classList.add("no-scroll");
  }
  function closeDialog() {
    showDialog = false;
    if (!detailsItem) {
      selectedItem = null;
    }
    dialogMode = "view";
    document.body.classList.remove("no-scroll");
  }

  // Delete Item
  function deleteMediaItem(id) {
    console.log("DELETED:", selectedItem?.title);
    deleteItem(id); // Remove item from the store
    removeMarker(id); // Remove marker from the map
    closeDialog();
    goBack();
  }

  function showDetail(item) {
    selectedItem = item;
    detailsItem = true;
  }

  function goBack() {
    detailsItem = false;
  }

  function openDeleteDialog() {
    dialogMode = "accept-delete";
    showDialog = true;
  }

  // Function to remove the marker from the map
  function removeMarker(id) {
  const marker = Object.values(map._layers).find(
    (layer) => layer.options && layer.options.id === id
  );
  if (marker) {
    map.removeLayer(marker); // Remove the marker from the map
  }
}


  onMount(() => {
    // Initialize the map
    map = L.map("map").setView([52.52, 13.405], 5); // Default coordinates

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker for each item
    $items.forEach((item) => {
      const popupContent = `
        <div>
          <button class="popup-link" data-title="${item.title}" data-id="${item.id}">
            ${item.title}
          </button>
        </div>
      `;

      const marker = L.marker([item.latitude, item.longitude]).addTo(map);
      marker.bindPopup(popupContent);
      marker.options.id = item.id; // Store item ID on marker for later removal
    });

    // Handle popup click
    map.on("popupopen", (e) => {
      const link = e.popup._contentNode.querySelector(".popup-link");
      if (link) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const itemId = link.getAttribute("data-id");
          const item = $items.find((i) => i.id === Number(itemId));
          showDetail(item);
        });
      }
    });
  });
</script>

<div id="map"></div>

{#if detailsItem}
  <Details
    imgData={selectedItem}
    {goBack}
    deleteCurrentItem={() => openDeleteDialog()}
  />
{/if}

<!-- Delete Confirmation Dialog -->
{#if showDialog && dialogMode === "accept-delete"}
  <Dialog title={selectedItem?.title} {closeDialog} classname="actions-dialog">
    <img class="prev" src={selectedItem?.imageUrl} alt="preview" />
    <p class="notice">Are you sure you want to delete?</p>
    <button class="btn action-btn" onclick={closeDialog}>Cancel</button>
    <button
      class="btn action-btn btn-del"
      onclick={() => {
        deleteMediaItem(selectedItem?.id);
      }}
    >
      Delete
    </button>
  </Dialog>
{/if}

<style>
  #map {
    height: 75vh;
    margin: 0 auto;
    width: 100%;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
    object-position: center;
  }
</style>
