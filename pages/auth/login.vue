<template>
  <div>
    <img class="wave" src="~/static/img/login_form/wave.png" />
    <div class="login-container">
      <div class="img">
        <img src="~/static/img/login_form/bg.svg" />
      </div>
      <div class="login-content">
        <form method="post" @submit.prevent="login">
          <img src="~/static/img/login_form/pare-logo.png" />
          <p class="login-title">Performance Agreement Report by Electronic</p>

          <br />
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <h5>Username</h5>
              <input type="text"  v-model="form.username" class="input_login" />
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <h5>Password</h5>
              <input
                type="password"
                v-model="form.password"
                class="input_login"
                v-on:change="event => checkExist(event)"
                ref="input_password"
              />
            </div>
          </div>
          <!-- <a href="#">Forgot Password?</a> -->
          <input type="submit" class="btn" value="Login">
           <div class="text-danger" v-for="(error, index) in errors" :key="index">
          {{ error[0] }}
        </div>
        </form>
       
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
export default {
  layout: "guest",
  middleware: "guest",
  auth:"guet",
  computed: { 
    ...mapGetters([
        'isLoggedIn'
    ])
  },
  head() {
    
    return {
      title: "PARE|LOGIN",
      script: [
        {
          src: "/js/login.js",
        },
      ],
    };
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
    checkExist(event){
         this.$refs.input_password.focus();
    } 
  },
  mounted() {
    this.tes_connection();

    console.log(this.$auth);


  },
};
</script>

<style scoped>
@import "~/assets/css/login.css";
</style>
