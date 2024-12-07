<!--Dialog Component-->
<script>
  let { children, title, closeDialog, classname } = $props();

  import { scale, fade } from "svelte/transition";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="overlay"
  aria-label="overlay"
  onclick={closeDialog}
  transition:fade={{ duration: 200 }}
></div>
<div
  class="dialog {classname}"
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
    position: fixed;
    width: 102vw;
    height: 100vh;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9999;
  }
  /*Dialog*/
  .add-dialog {
    top: 10vh !important;
    bottom: unset !important;
  }
  .dialog {
    max-width: 85vw;
    height: max-content;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 6px;
    background-color: #fff;
    top: 0; /*10vh*/
    bottom: 0;
    z-index: 99999;
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
