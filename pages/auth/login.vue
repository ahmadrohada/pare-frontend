<template>
  <div>
    <img class="wave" src="~/static/img/login_form/wave.png" />
    <div class="container">
      <div class="img">
        <img src="~/static/img/login_form/bg.svg" />
      </div>
      <div class="login-content">
        <form method="post" @submit.prevent="login">
          <img src="~/static/img/login_form/avatar.svg" />
          <h2 class="title">Welcome</h2>
          <!-- <div
              class="alert alert-danger"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error[0] }}
            </div> -->
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <h5>Username</h5>
              <input type="text" v-model="form.username" class="input" />
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>Password</h5>
              <input type="password" v-model="form.password" class="input" />
            </div>
          </div>
          <a href="#">Forgot Password?</a>
          <input type="submit" class="btn" />
        </form>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  layout: "guest",
  middleware: "guest",
  head() {
      return {
        script: [
          {
             src: '/js/login.js'
          }
        ],
      }
    },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errors: null,
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form,
        });
        console.log(response);

        this.$router.push(
          this.$route.query.redirect
            ? this.$route.query.redirect
            : "/daily_activity"
        );
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
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
