<template>
    <login-form></login-form>
</template>
 
<script>
import LoginForm from "~/components/Login/LoginForm.vue";
import { BaseAlert } from '@/components';

export default {
  name:"logins",
  components: {
    LoginForm,
    BaseAlert
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
        user_data: [],
      }
  },
  async fetch() {
    if (this.$route.query.token) {
      const user_data = await this.$axios.get('/me', { headers: { Authorization: 'Bearer ' + this.$route.query.token } });
      console.log(user_data.data)
      this.$store.commit('GET_DATA',user_data.data.data)
      this.$store.commit('SET_LOGIN', true)
      //this.$auth.setToken('local', 'Bearer ' + this.$route.query.token)
      this.$axios.setToken(this.$route.query.token, 'Bearer')
      //this.$router.push("/");
      
    }else if(this.$route.query.message){
      console.log(this.$route.query.message)
      this.notifyVue('top', 'center','danger',this.$route.query.message);


    }
  }, 
  methods: {
    tes_connection() {
      this.$axios.get("/").catch((error) => {
        this.notifyVue('top', 'center','danger',"Tidak terkoneksi ke database");
      });
    },
    notifyVue(verticalAlign, horizontalAlign, alertType, alertMessage) {
      this.$notify({
        message: alertMessage,
        timeout: 60000,
        closeOnClick:false,
        icon: 'fa fa-database',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: alertType,
      });
    }
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
