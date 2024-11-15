<script lang="ts">
  import { items } from "$lib/mediaStore.js";
  import Dialog from "./Dialog.svelte";
  import type { MediaItem } from "./models/MediaItem";

  let showDialog = $state(false);
  let selectedItem = $state<MediaItem | null>(null);
  let dialogMode = $state<"view" | "edit">("view");

  function openDialog(item: MediaItem) {
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
  function editTitle() {
    console.log("EDITED:", selectedItem?.title);
    closeDialog();
  }

  // Delete Item
  function deleteItem() {
    console.log("DELETED:", selectedItem?.title);
    //closeDialog();
  }

  // function showDetail(item) {
  //   console.log("x", detailsItem, item);
  //   selectedItem = item;
  //   detailsItem = true;
  // }
</script>

<div class="media-list">
  {#each $items as item, id (id)}
    <div class="media-item-wrap">
      <div class={`media-item media-item-${id}`}>
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
      <button class="btn action-btn btn-del" onclick={deleteItem}>
        Delete
      </button>
    {:else if dialogMode === "edit"}
      <!-- Edit Title -->
      {#if selectedItem}
        <input
          type="text"
          bind:value={selectedItem.title}
          placeholder="Edit Title"
        />
        <img src={selectedItem.imageUrl} alt="">
      {/if}
      <button class="btn action-btn btn-add" onclick={editTitle}> Save </button>
    {/if}
  </Dialog>
{/if}

<!--show Details Page/Modal-->
<!-- {#if detailsItem}
  <div class="details-view">
    {selectedItem.title}
    <Details imgSrc={selectedItem.imageUrl} />
  </div>
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
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .details-view {
    position: absolute;
    background-color: white;
    top: 7.5vh;
    width: 100vw;
    height: 100vh;
  }
</style>
