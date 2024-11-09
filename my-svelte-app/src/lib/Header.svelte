<script lang="ts">

  import { onMount } from "svelte";

  import { addNewMedia } from "$lib/mediaStore.js";

  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

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
</script>

<header class="red-bg">
  <button class="btn menu-icon" onclick={toggleMenu}>☰</button>
  <h1>Medien</h1>
  <button class="btn add-icon" onclick={addNewMedia}>+</button>
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
          <li><a href="/">List Ansicht</a></li>
          <li><a href="/">Map Ansicht</a></li>
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
    height: 5vh;
  }
</style>
