<script>
  import { fade } from "svelte/transition";

  let { imgSrc, goBack } = $props();
</script>

<div class="details-view" transition:fade={{ duration: 300 }}>
  <button class="btn back-btn icon" onclick={goBack}>&#8592;</button>
  <img src={imgSrc} alt="" />
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
  .back-btn{
    color: #e93f33;
    padding: 5px 10px;
    font-size: 2rem;
  }
</style>
