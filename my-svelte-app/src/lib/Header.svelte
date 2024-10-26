<script>
// @ts-nocheck
  let {addMedia} = $props();
</script>

<header>
  <button class="btn menu-icon">☰</button>
  <h1>Medien</h1>
  <button class="btn add-icon" onclick={addMedia}>+</button>
</header>

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
</style>
