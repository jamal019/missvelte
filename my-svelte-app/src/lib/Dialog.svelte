<!--Dialog Component-->
<script>
// @ts-nocheck

let  { children, title, isOpen, closeDialog }  = $props();

</script>


{#if isOpen}
<div class="overlay" onclick={closeDialog}></div>
<div class="dialog">
    <h2>{title}</h2>
    <!-- <input class="edit-input" type="text" /> -->
  <div class="actions-btns">
    {@render children()}
  </div>
</div>    
{/if}

<style>
.overlay{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
}
.dialog {
    max-width: 70vw;
    height: max-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 10vh;
    margin: auto;
    border-radius: 6px;
    background-color: #ffffff;
}
.actions-btns{
  display: flex;
  flex-flow: column wrap;
}
h2{
  padding: 1rem;
}
input{
    margin: 0.5rem 0;
}
</style>
