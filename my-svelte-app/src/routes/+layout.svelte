<script>
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import MediaList from "$lib/MediaList.svelte";
  import { MediaItem } from "$lib/models/MediaItem";

  let items = [
    new MediaItem("Titel 1", "https://picsum.photos/100/100", "2024-01-01"),
  ];

  let addNewMedia = () => {
    const randomImgId = Math.floor(Math.random() * 1000);
    const newMediaItem = new MediaItem(
      `Titel ${items.length + 1}`,
      `https://picsum.photos/100/100?random=${randomImgId}`,
      Date.now().toString()
    );
    //push new MediaItem to items list
    items = [...items, newMediaItem];
  };
</script>

<header>
  <Header addMedia={addNewMedia} />
</header>
<main>
  <MediaList {items} />
</main>
<Footer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  :global(h1, h2, h3, p) {
    margin: 0;
  }
  main {
    margin: 2.5rem 0 5rem 0;
  }
</style>
