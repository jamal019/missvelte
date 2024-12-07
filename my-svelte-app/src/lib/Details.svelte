<script>
  import { fade } from "svelte/transition";

  let { goBack, deleteCurrentItem, imgData } = $props();
</script>

<div class="details-view" transition:fade={{ duration: 300 }}>
  <div class="action-btns">
    <button class="btn back-btn icon" onclick={goBack}>&#8592;</button>
    <button
      class="btn delete-btn icon"
      onclick={() => {
        deleteCurrentItem();
        //goBack();
      }}
    >
      <img class="delete-icon" src="/delete.png" alt="delete icon" />
    </button>
  </div>
  <h2>{imgData?.title}</h2>
  <img src={imgData?.imageUrl} alt="" />
</div>

<style>
  img {
    width: 100vw;
    object-fit: cover;
  }
  h2{
    color: #e93f33;
    font-weight: 500;
    padding: 0 10px;
    margin: 0.5rem 0;
  }
  .details-view {
    position: absolute;
    background-color: white;
    top: 7.4vh;
    width: 100vw;
    height: 100vh;
    z-index: 999;
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
