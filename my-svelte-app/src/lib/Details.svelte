<script>
  import { fade } from "svelte/transition";

  let { imgSrc, goBack, deleteCurrentItem } = $props();
</script>

<div class="details-view" transition:fade={{ duration: 300 }}>
  <div class="action-btns">
    <button class="btn back-btn icon" onclick={goBack}>&#8592;</button>
    <button
      class="btn delete-btn icon"
      onclick={() => {
        deleteCurrentItem();
        goBack();
      }}
    >
      <img class="delete-icon" src="/delete.png" alt="delete icon" />
    </button>
  </div>
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
    z-index: 9999;
  }
  .action-btns {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
  .back-btn {
    color: #e93f33;
    font-size: 2rem;
  }
  .delete-icon {
    max-width: 28px;
  }
</style>
