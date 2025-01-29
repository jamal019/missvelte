<script>
  import { fade } from "svelte/transition";
  import Header from "./Header.svelte";

  let { goBack, deleteCurrentItem, imgData, header = true } = $props();
</script>

{#if header}
  <Header headerTitle={imgData?.title} showAddButton={false}>
    <button
      class="btn delete-btn icon"
      onclick={() => {
        deleteCurrentItem();
        //goBack();
      }}
    >
      <img class="delete-icon" src="/delete2.png" alt="delete icon" />
    </button>
  </Header>
{/if}

<div class="details-view" transition:fade={{ duration: 300 }}>
  <!-- <h2>{imgData?.title}</h2> -->
  <img class="details-img" src={imgData?.imageUrl} alt="" />
  <div class="go-back-wrap">
    <button class="btn back-btn icon" onclick={goBack}>&#8592;</button>
  </div>
</div>

<style>
  img {
    width: 100vw;
    max-height: 400px;
    object-fit: cover;
  }
  img.details-img{
    height: 700px;
  }
  /* h2 {
    color: #e93f33;
    font-weight: 500;
    padding: 0 10px;
    margin: 0.5rem 0;
  } */
  .details-view {
    position: absolute;
    background-color: white;
    top: 7.4vh;
    width: 100vw;
    height: 86vh;
    z-index: 999;
  }
  /* .action-btns {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  } */
  .back-btn {
    color: #fff;
    font-size: 2rem;
    padding-left: 14px;
  }
  .delete-btn {
    margin-left: auto;
  }
  .delete-icon {
    max-width: 28px;
    transform: translateY(2px);
  }
  .go-back-wrap {
    bottom: 0;
    position: fixed;
    background: #e93f33;
    width: 100%;
  }
</style>
