<script>
    import { MediaItem } from '$lib/models/MediaItem';

    let items = [
        new MediaItem("Titel 1", "https://via.placeholder.com/50", "2023-01-01"),
        new MediaItem("Titel 2", "https://via.placeholder.com/50", "2023-02-01")
    ];
</script>

<div class="media-list">
    {#each items as item}
        <div class="media-item">
            <img src={item.imageUrl} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p>{item.createdAt}</p>
            </div>
            <div class="options-icon">⋮</div>
        </div>
    {/each}
</div>

<style>
    .media-list {
        display: flex;
        flex-direction: column;
    }
    .media-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
    .options-icon {
        cursor: pointer;
    }
</style>
