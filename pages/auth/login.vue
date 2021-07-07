<template>
  <div>
    <img class="wave" src="~/static/img/login_form/wave.png" />
    <div class="login-container">
      <div class="img">
        <img src="~/static/img/login_form/bg.svg" />
      </div>
      <div class="login-content">
        <login-form></login-form>
      </div>
    </div>
  </div>
</template>
 
<script>
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  components: {
    LoginForm
  },
  layout: "guest",
  middleware: "guest",
  head() {
    return {
      title: "Login Masuk",
    };
  },
  methods: {
    
    tes_connection() {
      this.$axios.get("/").catch((error) => {
        this.$router.push("/auth/connection_error");
      });
    },
    
  },
  mounted() {
    
    this.tes_connection();
  },
};
</script>

<style scoped>
@import "~/assets/css/login.css";
</style>
