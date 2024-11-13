<!--Dialog Component-->
<script>
  // @ts-nocheck

  let { children, title, closeDialog } = $props();

  import { scale, fade } from "svelte/transition";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="overlay" aria-label="overlay" onclick={closeDialog} transition:fade={{duration:200}}></div>
<div
  class="dialog"
  in:scale={{ start: 0.8, duration: 300 }}
  out:scale={{ duration: 200 }}
  style="transform-origin: center center;"
>
  <h2 class="dialog-title">{title}</h2>
  <!-- <input class="edit-input" type="text" /> -->
  <div class="actions-btns">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .dialog {
    max-width: 85vw;
    height: max-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 10vh;
    margin: auto;
    border-radius: 6px;
    background-color: #fff;
  }
  @media screen and (min-width: 900px) {
    .dialog {
      max-width: 40vw;
    }
  }
  .dialog-title {
    padding: 1rem;
  }
  .actions-btns {
    display: flex;
    flex-flow: column wrap;
  }
  /* input{
    margin: 0.5rem 0;
} */
</style>
