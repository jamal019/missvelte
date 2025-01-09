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
          <h3>
            {#if item.storage === "local"}
            <span class="badge local-badge"></span>
            {:else}
            <span class="badge remote-badge"></span>
            {/if}
            {item.title}
          </h3>
          <p>{item.createdAt}</p>
          <!-- <div class="storagetype">
            {#if item.storage === "local"}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e93f33"><path d="M160-280h640v-240H160v240Zm520-60q25 0 42.5-17.5T740-400q0-25-17.5-42.5T680-460q-25 0-42.5 17.5T620-400q0 25 17.5 42.5T680-340Zm200-260H767l-80-80H273l-80 80H80l137-137q11-11 25.5-17t30.5-6h414q16 0 30.5 6t25.5 17l137 137ZM160-200q-33 0-56.5-23.5T80-280v-320h800v320q0 33-23.5 56.5T800-200H160Z"/></svg>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e93f33"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>
            {/if}
          </div> -->
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
  h3{
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .badge{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .local-badge{
    background-color: rgb(50, 172, 50);
  }
  .remote-badge{
    background-color: rgb(212, 39, 140);
  }
</style>
