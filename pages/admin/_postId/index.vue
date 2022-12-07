<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  data() {
    return {
      loadedPost: {
        author: "Wahyu",
        title: "Basic Nuxt 2",
        content: "Super amazing, thanks!",
        thumbnailLink:
          "https://wp.technologyreview.com/wp-content/uploads/2022/07/government-tech-insider.png",
      },
    };
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
