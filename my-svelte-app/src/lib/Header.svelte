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
    setStorage = "";
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
      <nav>
        <ul>
          <a href="/">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
              <span id="media-page">Medien</span>
            </li>
          </a>
          <a href="/map">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>
            <span id="map-page">Karte</span>
          </li>
        </a>
        </ul>
      </nav>
    </div>
  </div>
{/if}

<!--show Add New Dialog-->
{#if showDialog}
  <form onsubmit={handleAddNewMedia}>
    <Dialog title="Neues Medium" {closeDialog} classname="add-dialog">
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
          <input
            type="radio"
            id="local"
            name="storage"
            value="local"
            bind:group={setStorage}
          />
          <label for="local">Local</label>
        </div>
        <div>
          <input
            type="radio"
            id="remote"
            name="storage"
            value="remote"
            bind:group={setStorage}
          />
          <label for="remote">Remote</label>
        </div>
      </fieldset>

      <img
        class="preview"
        src={newImg !== "" ? newImg : "preview.svg"}
        alt="preview"
      />

      <div class="btn-pair">
        <button class="btn action-btn btn-delete" disabled>Löschen</button>
        <button class="btn action-btn btn-add" onclick={handleAddNewMedia}
          >Hinzufügen</button
        >
      </div>
    </Dialog>
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
    transform: scale(1.25) translateX(4px);
  }
  .add-icon {
    margin-left: auto;
    transform: scale(1.5) translateX(-4px);
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
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: auto;
    padding: 1rem 0;
  }
  .error {
    color: #e93f33;
    text-align: center;
    padding: 0.5rem 0;
  }
  fieldset {
    border: none;
    display: flex;
    gap: 4px;
  }
  fieldset input {
    margin: 0;
  }
</style>
