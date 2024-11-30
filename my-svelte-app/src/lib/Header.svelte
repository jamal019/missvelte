<script lang="ts">
  import { onMount } from "svelte";

  import {
    addNewItem,
    itemTitle,
    itemImage,
    handleAutofocus,
  } from "$lib/mediaStore.js";

  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Dialog from "./Dialog.svelte";
  import ImgUpload from "./ImgUpload.svelte";

  //new media title
  let newTitle = $state("");

  //new media img
  let newImg = $state(`https://picsum.photos/600/600?random=${Math.floor(Math.random()*100)}`);

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
    validator = false;
    newTitle = "";
  }

  //'add new media' handler
  function handleAddNewMedia() {
    if (newTitle.trim() !== "") {
      itemTitle.set(newTitle);
      itemImage.set(newImg);

      addNewItem();
      closeDialog();
      newTitle = "";
    } else {
      handleValidate();
    }
  }

  //validate input field
  let validator = $state(false);
  function handleValidate() {
    //alert("Add Title");
    validator = true;
  }

  function resetValidation(ev: Event) {
    let input = ev.target as HTMLInputElement;
    input.style.borderColor = "green";
  }

  function chosenImg(event: Event) {
    console.log(event.target);
  }
</script>

<!--Header-->
<header class="red-bg">
  <button class="btn menu-icon icon" onclick={toggleMenu}>☰</button>
  <h1>Medien</h1>
  <button class="btn add-icon icon" onclick={openDialog}>+</button>
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
          <a href="/"><li>Media</li></a>
          <a href="/map"><li>Map</li></a>
        </ul>
      </nav>
    </div>
  </div>
{/if}

<!--show Add New Dialog-->
{#if showDialog}
<form onsubmit={handleAddNewMedia}>
  <Dialog title="New Media" {closeDialog}>
    <div class="inputs-wrap">
      <input
        bind:value={newTitle}
        type="text"
        placeholder="Name"
        id="newItem"
        use:handleAutofocus
        onfocus={resetValidation}
        onchange={resetValidation}
        style:border-color={validator ? "#e93f33" : "#62965a"}
      />
      <!-- <input onchange={chosenImg} type="file" id="newImgItem" accept="image/png, image/jpeg" /> -->
      <ImgUpload />
    </div>
      <button class="btn action-btn btn-add" onclick={handleAddNewMedia}
        >Add New</button
      >
  </Dialog>
</form>

{/if}

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 5vh;
  }
  /* input[type="file"] {
    border: none;
  } */
  .inputs-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.25rem;
  }
  #newItem {
    flex: 1;
  }
</style>
