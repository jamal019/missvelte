<script lang="ts">
  import { onMount } from "svelte";

  import {
    addNewItem,
    itemTitle,
    itemImage,
    itemStorage,
    itemLat,
    itemLong,
    handleAutofocus,
  } from "$lib/mediaStore.js";

  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Dialog from "./Dialog.svelte";
  import ImgUpload from "./ImgUpload.svelte";

  let { headerTitle, showAddButton, children = () => null } = $props();

  //new media title state
  let newTitle = $state("");

  //new media img state
  let newImg = $state("");

  //new media lat/long state
  let lat = $state(0);
  let long = $state(0);

  let setStorage = $state("");

  //Toggle Burger Menu bool state
  let showMenu = $state(false);

  //Validator
  let errorMessage = $state("");

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
    document.body.classList.add("no-scroll");
  }

  function closeDialog() {
    showDialog = false;
    validator = false;
    newTitle = "";
    newImg = "";
    lat = 0;
    long = 0;
    errorMessage = "";
    document.body.classList.remove("no-scroll");
  }

  //'add new media' handler
  function handleAddNewMedia() {
    errorMessage = "";

    if (newTitle.trim() === "") {
      errorMessage += "Title is empty. ";
      handleValidate();
    }
    if (newImg.trim() === "") {
      errorMessage += "No image chosen. ";
      handleValidate();
    }
    if (errorMessage === "") {
      //storage location
      const storageTypeElement = document.querySelector(
        'input[name="storage"]:checked'
      ) as HTMLInputElement;

      if (!storageTypeElement) {
        errorMessage += "Please choose storage location.";
        handleValidate();
        return;
      }
      setStorage = storageTypeElement.value;
      console.log("Storage Location:", setStorage);

      itemTitle.set(newTitle);
      itemImage.set(newImg);
      itemStorage.set(setStorage);

      itemLat.set(lat);
      itemLong.set(long);

      addNewItem();
      closeDialog();
      newTitle = "";
      newImg = "";
      lat = 0;
      long = 0;
      validator = false;
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
    errorMessage = "";
  }
</script>

<!--Header-->
<header class="red-bg">
  <button class="btn menu-icon icon" onclick={toggleMenu}>☰</button>
  <h1>{headerTitle}</h1>
  {#if showAddButton}
    <button class="btn add-icon icon" onclick={openDialog}>+</button>
  {:else}
    {@render children()}
  {/if}
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
    <Dialog title="New Media" {closeDialog} classname="add-dialog">
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
        <ImgUpload
          bind:newImg
          bind:newTitle
          bind:lat
          bind:long
          reset={() => {
            errorMessage = "";
          }}
        />
      </div>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      <fieldset>
        <legend>Storage location:</legend>
        <div>
          <input type="radio" id="local" name="storage" value="local" />
          <label for="local">Local</label>
        </div>
        <div>
          <input type="radio" id="remote" name="storage" value="remote" />
          <label for="remote">Remote</label>
        </div>
      </fieldset>

      <button class="btn action-btn btn-add" onclick={handleAddNewMedia}
        >Add New</button
      >
    </Dialog>
    {#if newImg != ""}
      <img class="preview" src={newImg} alt="preview" />
    {/if}
  </form>
{/if}

<style>
  header {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 10px;
    height: 5vh;
    margin-bottom: 2rem;
  }
  .menu-icon {
    transform: scale(1.25) translateX(2px);
  }
  .add-icon{
    margin-left: auto;
    transform: scale(1.25);
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
  img.preview {
    position: absolute;
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    left: 0;
    right: 0;
    top: 10%;
    bottom: 0;
    opacity: 0.8;
    margin: auto;
    z-index: 99999;
  }
  .error {
    color: #e93f33;
    text-align: center;
    padding: 0.5rem 0;
  }
  fieldset {
    border: none;
    display: flex;
  }
  fieldset input {
    margin: 0;
  }
</style>
