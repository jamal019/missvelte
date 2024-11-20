<script>
  // @ts-nocheck

  import { items, deleteItem, editItem } from "$lib/mediaStore.js";
  import Dialog from "./Dialog.svelte";
  import Details from "./Details.svelte";
  //import type { MediaItem } from "./models/MediaItem";

  let showDialog = $state(false);
  let selectedItem = $state(null);
  let dialogMode = $state("view");
  let detailsItem = $state(false);

  function openDialog(item) {
    selectedItem = item;
    showDialog = true;
    dialogMode = "view";
  }

  function closeDialog() {
    showDialog = false;
    selectedItem = null;
    dialogMode = "view";
  }

  function openEditDialog() {
    dialogMode = "edit";
  }

  //Edit Item Title
  function editTitle(id, newTitle) {
    console.log("EDITED:", selectedItem?.title);
    editItem(id, newTitle);
    closeDialog();
  }

  // Delete Item
  function deleteMediaItem(id) {
    console.log("DELETED:", selectedItem?.title);
    deleteItem(id);
    closeDialog();
  }

  function showDetail(item) {
    selectedItem = item;
    detailsItem = true;
    console.log("Detail", detailsItem, item);
  }
  function goBack() {
    detailsItem = false;
  }
</script>

<div class="media-list">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  {#each $items as item, id (id)}
    <div class="media-item-wrap db_key-{item.id}">
      <div
        class={`media-item media-item-${id}`}
        onclick={() => {
          showDetail(item);
        }}
      >
        <img src={item.imageUrl} alt={item.title} />
        <div class="media-item-content">
          <h3>{item.title}</h3>
          <p>{item.createdAt}</p>
          <!-- <p>Location: {item.latitude} {item.longitude}</p> -->
        </div>
      </div>
      <button class="btn options-icon icon-red" onclick={() => openDialog(item)}
        >⋮</button
      >
    </div>
  {/each}
</div>

<!-- Dynamic Dialog -->
{#if showDialog}
  <Dialog title={selectedItem?.title} {closeDialog}>
    {#if dialogMode === "view"}
      <!-- Edit or Delete -->
      <button class="btn action-btn btn-edit" onclick={openEditDialog}>
        Edit
      </button>
      <button
        class="btn action-btn btn-del"
        onclick={() => {
          deleteMediaItem(selectedItem?.id);
        }}
      >
        Delete
      </button>
    {:else if dialogMode === "edit"}
      <!-- Edit Title -->
      {#if selectedItem}
        <img src={selectedItem.imageUrl} alt="" style="position: absolute; top:.5rem;right:0" />
        <input
          type="text"
          bind:value={selectedItem.title}
          placeholder="Edit Title"
        />
      {/if}
      <button
        class="btn action-btn btn-add"
        onclick={() => {
          editTitle(selectedItem?.id, selectedItem?.title);
        }}
      >
        Save
      </button>
    {/if}
  </Dialog>
{/if}

<!--show Details Page/Modal-->
{#if detailsItem}
  <Details imgSrc={selectedItem?.imageUrl} {goBack} />
{/if}

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
  }
</style>
