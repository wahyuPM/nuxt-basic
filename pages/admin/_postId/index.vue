<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  async asyncData(context) {
    try {
      const res = await axios.get(
        process.env.baseUrl + "/posts/" + context.params.postId + ".json"
      );
      return {
        loadedPost: { ...res.data, id: context.params.postId },
      };
    } catch (e) {
      return console.log(e);
    }
  },
  layout: "admin",
  components: {
    AdminPostForm,
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    },
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
