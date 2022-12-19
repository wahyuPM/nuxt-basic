<template>
  <div class="flex justify-center items-center">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  middleware: "log",
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
};
</script>
