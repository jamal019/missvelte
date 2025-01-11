<script>
  import { refresh, filterMode } from "$lib/mediaStore.js";

  function cycleFilter() {
    filterMode.update((current) => {
      if (current === "all") return "local";
      if (current === "local") return "remote";
      return "all";
    });
  }

  const refreshHandler = () => {
    refresh();
  };

  // function filterItems() {
  //   const selectElement = document.getElementById('select');
  //   const selectedValue = selectElement.value;

  //   if (selectedValue === 'all') {
  //     console.log('Showing all items');
  //   } else if (selectedValue === 'local') {
  //     console.log('Showing local items');
  //   } else if (selectedValue === 'remote') {
  //     console.log('Showing remote items');
  //   }
  // }
</script>

<footer class="red-bg">
  <!-- <p>© MIS Svelte 2024</p> -->
  <!-- <select name="Select" id="select" onchange={filterItems}>
    <option value="all">All</option>
    <option value="local">Local</option>
    <option value="remote">Remote</option>
   </select> -->
  <p>© MIS Svelte 2024</p>
  <button class="btn filter-icon" on:click={cycleFilter}>
    {$filterMode}
  </button>

  <button class="btn refresh-icon icon" on:click={refreshHandler}>⟳</button>
</footer>

<style>
  footer {
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }
  button {
    position: absolute;
    right: 0.5rem;
    transform: scale(1.1);
  }

  .filter-icon {
    right: 3rem;
  }
</style>
