<template>
  <section class="post-list">
    <PostPreview
      v-for="item in posts"
      :key="item.id"
      :id="item.id"
      :is-admin="isAdmin"
      :title="item.title"
      :thumbnail="item.thumbnail"
      :previewText="item.previewText"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";
export default {
  name: "PostList",
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
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
