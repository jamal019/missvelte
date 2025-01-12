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
  <p>© MIS Svelte</p>
  <button class="btn filter-icon" onclick={cycleFilter}>
    {$filterMode}
  </button>

  <button class="btn refresh-icon icon" onclick={refreshHandler}>⟳</button>
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
    background-color: #fff;
    color: #e93f33;
    border-radius: 4px;
    font-size: 1rem;
  }
</style>
