<script>
  // @ts-nocheck

  //import { MediaItem } from "$lib/models/MediaItem";

  let { items } = $props();
</script>

<div class="media-list">
  {#each items as item, id (id)}
    <div class="media-item-wrap">
      <div class={`media-item media-item-${id}`}>
        <img src={item.imageUrl} alt={item.title} />
        <div class="media-item-content">
          <h3>{item.title}</h3>
          <p>{item.createdAt}</p>
        </div>
      </div>
      <button class="btn options-icon">⋮</button>
    </div>
  {/each}
</div>

<style>
  .media-list {
    display: flex;
    flex-direction: column;
  }
  .media-item-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .media-item {
    display: flex;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .btn {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
  }
</style>
