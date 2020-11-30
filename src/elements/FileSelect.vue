<template>
  <!--
    Everything is wrapped in a label, which acts as a clickable wrapper around a form element.
    In this case, the file input.
  -->
  <label class="file-select mb-0 w-100">
    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="btn btn-outline-primary w-100">
      <!-- Display the filename if a file has been selected. -->
      <span v-if="value">{{value.name}}</span>
      <span v-else>Pilih bukti...</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" @change="handleFileChange"/>
  </label>
</template>

<style scoped>
/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>

<script>
export default {
  props: {
    // Using value here allows us to be v-model compatible.
    value: File
  },

  methods: {
    handleFileChange(e) {
      // Whenever the file changes, emit the 'input' event with the file data.
      this.$emit('input', e.target.files[0])
    }
  }
}
</script>