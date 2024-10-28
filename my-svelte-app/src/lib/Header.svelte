<script>
// @ts-nocheck

  import { onMount } from "svelte";

  // @ts-nocheck
  //let { addMedia } = $props();
  import { addNewMedia } from '$lib/mediaStore.js';


  let showMenu = $state(false);

  function toggleMenu() {
    showMenu = !showMenu;
  }

  // @ts-ignore
  function menuHandler(event) {
    const header = document.querySelector("header");
    if (showMenu && !header.contains(event.target)) {
      showMenu = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", menuHandler);
  })
</script>

<header>
  <button class="btn menu-icon" onclick={toggleMenu}>☰</button>
  <h1>Medien</h1>
  <button class="btn add-icon" onclick={addNewMedia}>+</button>
</header>

{#if showMenu}
  <div class="burger-menu">
    <div class="menu-wrapper">
      <h2>Menü</h2>
      <nav>
        <ul>
          <li>List Ansicht</li>
          <li>Map Ansicht</li>
        </ul>
      </nav>
    </div>
  </div>
{/if}

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
  }
  .btn {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
  }
  .burger-menu {
    position: absolute;
    top: 0;
    width: 90vw;
    height: 100vh;
    z-index: 99;
    background-color: #1c1c1c;
    color: #f5f5f5;
  }
  .burger-menu .menu-wrapper{
    padding: 2rem 1rem;
  }
  .burger-menu ul {
    padding: 0;
  }
  .burger-menu li {
    list-style: none;
    margin-bottom: 1rem;
  }
</style>
