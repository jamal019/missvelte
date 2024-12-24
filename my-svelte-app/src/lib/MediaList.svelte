<script>
  // @ts-nocheck

  import {
    items,
    itemStorage,
    deleteItem,
    editItem,
    handleAutofocus,
  } from "$lib/mediaStore.js";
  import Dialog from "./Dialog.svelte";
  //import Details from "./Details.svelte";
  import ImgUpload from "./ImgUpload.svelte";
  //import type { MediaItem } from "./models/MediaItem";

  let showDialog = $state(false);
  let selectedItem = $state(null);
  let dialogMode = $state("view");
  //let detailsItem = $state(false);

  let newImg = $state("");

  function openDialog(item) {
    selectedItem = item;
    showDialog = true;
    dialogMode = "view";
    document.body.classList.add("no-scroll");
  }

  function closeDialog() {
    showDialog = false;
    //selectedItem = null;
    // if (!detailsItem) {
    //   selectedItem = null;
    // }
    dialogMode = "view";
    document.body.classList.remove("no-scroll");
  }

  function openEditDialog() {
    dialogMode = "edit";
    newImg = selectedItem?.imageUrl || "";
  }

  //Edit Item Title or Image
  function editHandler(id, newTitle) {
    console.log("EDITED:", selectedItem?.title, id);
    const imageToSave = newImg || selectedItem?.imageUrl;
    editItem(id, newTitle, imageToSave);
    closeDialog();
  }

  function openDeleteDialog() {
    dialogMode = "accept-delete";
  }
  // Delete Item
  function deleteMediaItem(id) {
    console.log("DELETED:", selectedItem?.title);
    deleteItem(id);
    closeDialog();
    //goBack();
  }

  // function showDetail(item) {
  //   selectedItem = item;
  //   //detailsItem = true;
  //   //console.log("Detail", detailsItem, item);
  //   //document.body.classList.add("no-scroll");
  // }

  // function goBack() {
  //   detailsItem = false;
  //   //document.body.classList.remove("no-scroll");
  // }
</script>

<div class="media-list">
  {#each $items as item, id (id)}
    <div class="media-item-wrap db_key-{item.id} {item.storage}">
      <a href={item.title} class={`media-item media-item-${id}`}>
        <img src={item.imageUrl} alt={item.title} />
        <div class="media-item-content">
          <h3>{item.title}</h3>
          <p>{item.createdAt}</p>
          <!-- <a href={item.id}>Detail</a> -->
           <!-- <p>{item.latitude} // {item.longitude}</p> -->
        </div>
      </a>
      <button class="btn options-icon icon-red" onclick={() => openDialog(item)}
        >⋮</button
      >
    </div>
  {/each}
</div>

<!-- Dynamic Dialog -->
{#if showDialog}
  <Dialog title={selectedItem?.title} {closeDialog} classname="actions-dialog">
    {#if dialogMode === "view"}
      <!-- Edit or Delete -->
      <button class="btn action-btn btn-edit" onclick={openEditDialog}>
        Edit
      </button>
      <button class="btn action-btn btn-del" onclick={openDeleteDialog}>
        Delete
      </button>
    {:else if dialogMode === "edit"}
      <!-- Edit Title -->
      {#if selectedItem}
        <img
          class="prev"
          src={newImg || selectedItem?.imageUrl}
          alt="preview"
        />
        <input
          type="text"
          use:handleAutofocus
          bind:value={selectedItem.title}
          placeholder="Edit Title"
        />
        <div class="preview-edit">
          <ImgUpload bind:newImg />
        </div>
        <button
          class="btn action-btn btn-add"
          onclick={() => {
            editHandler(selectedItem?.id, selectedItem?.title);
          }}
        >
          Save
        </button>
      {/if}
    {:else if dialogMode === "accept-delete"}
      <img class="prev" src={newImg || selectedItem?.imageUrl} alt="preview" />
      <p class="notice">Are you sure you want to delete?</p>
      <button class="btn action-btn" onclick={closeDialog}>Cancel</button>
      <button
        class="btn action-btn btn-del"
        onclick={() => {
          deleteMediaItem(selectedItem?.id);
        }}>Delete</button
      >
    {/if}
  </Dialog>
{/if}

<!--show Details Page/Modal-->
<!-- {#if detailsItem}
  <Details
    imgData={selectedItem}
    {goBack}
    deleteCurrentItem={() => {
      dialogMode = "accept-delete";
      showDialog = true;
    }}
  />
{/if} -->

<style>
  .media-list {
    display: flex;
    flex-direction: column;
  }
  .media-item-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .media-item {
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
    object-position: center;
  }
  .preview-edit {
    margin: 0.5rem 1rem;
  }
</style>
