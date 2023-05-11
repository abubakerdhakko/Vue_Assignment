<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.email }}</strong>
      </h3>
      <router-link to="/home" class="nav-link">
        click home to table route
      </router-link>
    </header>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>