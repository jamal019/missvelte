<script>
  import {refresh} from "$lib/mediaStore.js";

  const refreshHandler = () => {
    refresh();
  }
</script>

<footer class="red-bg">
  <p>© MIS Svelte 2024</p>
  <button onclick={refreshHandler}>refresh</button>
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
    float: right;
  }
</style>
