<script>
  import { fade } from "svelte/transition";

  let { imgSrc, goBack } = $props();
</script>

<div class="details-view" transition:fade={{ duration: 300 }}>
  <img src={imgSrc} alt="" />
  <button onclick={goBack}>back</button>
</div>

<style>
  img {
    width: 100vw;
    object-fit: cover;
  }
  .details-view {
    position: absolute;
    background-color: white;
    top: 7.4vh;
    width: 100vw;
    height: 100vh;
  }
</style>
