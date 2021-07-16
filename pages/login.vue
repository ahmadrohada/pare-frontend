<template>
  <div>
    <div class="login-container">
      <div class="img">
        <!-- <img src="~/static/img/login_form/bg.png" /> -->
      </div>
      <div class="login-content">
        <login-form></login-form>
      </div>
    </div>
  </div>
</template>
 
<script>
import LoginForm from "~/components/Login/LoginForm.vue";

export default {
  name:"login",
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
  data() {
      return {
        user_data: []
      }
  },
  async fetch() {
    if (this.$route.query.token) {
      const user_data = await this.$axios.get('/me', { headers: { Authorization: 'Bearer ' + this.$route.query.token } });
      console.log(user_data.data)
      this.$store.commit('GET_DATA',user_data.data.data)
      this.$auth.setToken('local', 'Bearer ' + this.$route.query.token)
      this.$store.commit('SET_LOGIN', true)
      this.$router.push("/");
    }
  }, 
  methods: {
    tes_connection() {
      this.$axios.get("/").catch((error) => {
        this.$router.push("/auth/connection_error");
      });
    },
    
  },
  created () {
    if (this.$route.query.error){
      this.$toast.error(this.$route.query.error)
      this.goReplace({name : 'login'})
    }
  },
  mounted() {
    this.tes_connection();
  },
};
</script>

<style scoped>
@import "~/assets/css/login.css";
</style>
