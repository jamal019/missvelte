<script>
  // @ts-nocheck

  let { newImg = $bindable()} = $props();

  function handleImageUpload(event) {
    const file = event.target.files[0];
    console.log("File: ", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newImg = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

//   function handleImageUpload(event) {
//   const file = event.target.files[0];
//   console.log("File: ", file);

//   if (file) {
//     const objectURL = URL.createObjectURL(file);
//     newImg = objectURL;
//   }
// }


</script>

<div class="image-upload">
  <label for="file-input">
    <svg xmlns="http://www.w3.org/2000/svg" width="32pt" height="32pt" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet"><g transform="translate(0,32) scale(0.1,-0.1)" fill="#000" stroke="none"><path fill="#62965a" d="M17 302c-14-15-17-41-17-144 0-163-5-158 162-158 163 0 158-5 158 162 0 163 5 158-162 158-108 0-127-2-141-18zm237-58c18-18 22-95 6-125-8-13-21-19-45-19-19 0-35 5-35 10 0 6 14 10 30 10 30 0 30 1 30 55l0 55-80 0-80 0 0-55c0-54 0-55 30-55 17 0 30-4 30-10 0-5-16-10-35-10-42 0-55 20-55 84 0 65 15 76 110 76 58 0 83-4 94-16zm-72-61c22-20 24-48 3-39-12 4-15-4-15-39 0-25-4-45-10-45-5 0-10 20-10 45 0 35-3 43-15 39-20-8-19 15 2 38 20 22 22 22 45 1z"/></g></svg>
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
  svg {
    max-width: 36px;
  }
</style>
