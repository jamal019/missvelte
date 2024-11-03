<script>
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import MediaList from "$lib/MediaList.svelte";
</script>

<Header />
<main>
  <MediaList />
</main>
<Footer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  :global(h1, h2, h3, p, button) {
    margin: 0;
    text-align: left;
  }
  main {
    margin: 2.5rem 0 5rem 0;
  }
</style>
