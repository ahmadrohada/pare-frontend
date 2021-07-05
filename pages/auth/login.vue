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
  auth: "guet",
  head() {
    return {
      title: "PARE|LOGIN",
    };
  },
  data() {
    
  },
  methods: {
    
    tes_connection() {
      this.$axios.get("/").catch((error) => {
        this.$router.push("/auth/connection_error");
      });
    },
    checkExist(event) {
      this.$refs.input_password.focus();
    },
    onScriptLoaded(event = null) {
      if (event) {
        console.log("Was added");
      } else {
        console.log("Already existed");
      }
      console.log(window.jQuery);
    },
  },
  mounted() {
    if (!process.server && !window.jQuery) {
      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      script.src = "/login.js";
      document.head.appendChild(script);
    } else {
      this.onScriptLoaded();
    }

    this.tes_connection();
  },
};
</script>

<style scoped>
@import "~/assets/css/login.css";
</style>
