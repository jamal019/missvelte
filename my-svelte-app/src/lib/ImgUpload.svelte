<script>
  // @ts-nocheck

  let { newImg = $bindable() } = $props();

  function handleImageUpload(event) {
    const file = event.target.files[0];
    console.log("File: ",file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newImg = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="image-upload">
  <label for="file-input">
    <img src="/upload1.png" alt="add icon" />
  </label>
  <input
    id="file-input"
    onchange={handleImageUpload}
    type="file"
    accept="image/png, image/jpeg"
  />
</div>

<style>
  .image-upload #file-input {
    display: none;
  }
  img {
    max-width: 40px;
  }
</style>
