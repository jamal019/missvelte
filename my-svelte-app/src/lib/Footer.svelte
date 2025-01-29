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
  <p id="name">© MIS Svelte</p>
  <button class="btn filter-icon" onclick={cycleFilter}>
    {#if $filterMode === "local"}
      <span class="badge local-badge"></span>
    {:else if $filterMode === "remote"}
      <span class="badge remote-badge"></span>
    {/if}
    {$filterMode}
  </button>

  <button class="btn refresh-icon icon" onclick={refreshHandler}>⟳</button>
</footer>

<style>
  footer {
    height: 2.5rem;
    display: flex;
    /* justify-content: center; */
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
  #name{
    padding-left: 10px;
  }
  .filter-icon {
    right: 3rem;
    background-color: #fff;
    color: #e93f33;
    border-radius: 4px;
    font-size: 1rem;
  }
  .badge {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .local-badge {
    background-color: rgb(50, 172, 50);
  }
  .remote-badge {
    background-color: rgb(212, 39, 140);
  }
</style>
