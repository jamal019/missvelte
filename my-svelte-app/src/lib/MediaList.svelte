<script>
  // @ts-nocheck

  import { items } from "$lib/mediaStore.js";
  //import Details from "./Details.svelte";
  import Dialog from "./Dialog.svelte";

  let showDialog = false;
  let selectedItem = null;

  //let detailsItem = false;

  function openDialog(item) {
    selectedItem = item;
    showDialog = true;
  }

  function closeDialog() {
    showDialog = false;
    selectedItem = null;
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
      <div
        class={`media-item media-item-${id}`}
      >
        <img src={item.imageUrl} alt={item.title} />
        <div class="media-item-content">
          <h3>{item.title}</h3>
          <p>{item.createdAt}</p>
        </div>
      </div>
      <button
        class="btn options-icon"
        onclick={() => {
          openDialog(item);
        }}>⋮</button
      >
    </div>
  {/each}
</div>

<!--show Edit Dialog-->
{#if showDialog}
  <Dialog title={selectedItem.title} isOpen={showDialog} {closeDialog}>
    <button class="btn action-btn">Delete</button>
    <button class="btn action-btn">Edit</button>
  </Dialog>
{/if}

<!--show Details Page-->
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
  .btn {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
  }
  .action-btn{
    padding: 1rem;
  }
  .details-view{
    position: absolute;
    background-color: white;
    top: 7.5vh;
    width: 100vw;
    height: 100vh;
  }
</style>
