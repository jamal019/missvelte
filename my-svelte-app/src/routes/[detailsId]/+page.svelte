<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import Details from "$lib/Details.svelte";
  import Dialog from "$lib/Dialog.svelte";
  import { items, deleteItem } from "$lib/mediaStore.js";

  const detailsId = $page.params.detailsId;

  let selectedItem = $items.find((item) => item.title === detailsId);

  let showDialog = $state(false);
  let dialogMode = $state("view");
  let detailsItem = $state(false);

  function openDialog(item) {
    showDialog = true;
    dialogMode = "view";
    document.body.classList.add("no-scroll");
  }
  function closeDialog() {
    showDialog = false;
    dialogMode = "view";
    document.body.classList.remove("no-scroll");
  }

  function openDeleteDialog() {
    dialogMode = "accept-delete";
    showDialog = true;
  }

  // Delete Item
  function deleteMediaItem(id) {
    console.log("DELETED:", selectedItem?.title);
    deleteItem(id); // Remove item from the store
    closeDialog();
    history.back();
  }
</script>

<!-- <h1>Details von {selectedItem?.title}</h1> -->

{#if selectedItem}
  <Details
    imgData={selectedItem}
    goBack={() => history.back()}
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
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
    object-position: center;
  }
</style>
