<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="this is the title"
      thumbnail="https://wp.technologyreview.com/wp-content/uploads/2022/07/government-tech-insider.png"
      previewText="this is my first post!"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
