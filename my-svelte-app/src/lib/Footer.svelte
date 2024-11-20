<script>
  import {refresh} from "$lib/mediaStore.js";

  const refreshHandler = () => {
    refresh();
  }
</script>

<footer class="red-bg">
  <p>© MIS Svelte 2024</p>
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
  }
  button{
    position: absolute;
    right: 1rem;
  }
</style>
