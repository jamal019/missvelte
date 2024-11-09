<script lang="ts">
  import { onMount } from "svelte";

  import { addNewMedia, itemTitle } from "$lib/mediaStore.js";

  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Dialog from "./Dialog.svelte";

  //new media title
  let newTitle = $state("");

  //Toggle Burger Menu
  let showMenu = $state(false);

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function menuHandler(event: any) {
    const header = document.querySelector("header");
    if (header && showMenu && !header.contains(event.target)) {
      showMenu = false;
    }
  }
  onMount(() => {
    document.addEventListener("click", menuHandler);
  });

  //'add new item' Dialog
  let showDialog = $state(false);

  function openDialog() {
    showDialog = true;
  }

  function closeDialog() {
    showDialog = false;
  }

  //'add new media' handler
  function handleAddNewMedia() {
    itemTitle.set(newTitle);
    addNewMedia();
    closeDialog();
    newTitle = "";
  }
</script>

<!--Header-->
<header class="red-bg">
  <button class="btn menu-icon" onclick={toggleMenu}>☰</button>
  <h1>Medien</h1>
  <button class="btn add-icon" onclick={openDialog}>+</button>
</header>

<!--Show Burger Menu-->
{#if showMenu}
  <div
    class="burger-menu red-bg"
    transition:slide={{ axis: "x", duration: 300, easing: cubicOut }}
  >
    <div class="menu-wrapper">
      <h2>Menü</h2>
      <nav>
        <ul>
          <li><a href="/">Media</a></li>
          <li><a href="/map">Map</a></li>
        </ul>
      </nav>
    </div>
  </div>
{/if}

<!--show Add New Dialog-->
{#if showDialog}
  <Dialog title="New Media" isOpen={showDialog} {closeDialog}>
    <input bind:value={newTitle} type="text" placeholder="Name" id="newItem" />
    <button class="btn action-btn btn-add" onclick={handleAddNewMedia}
      >Add New</button
    >
  </Dialog>
{/if}

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 5vh;
  }
</style>
