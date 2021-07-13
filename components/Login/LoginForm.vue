<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img
          src="~/static/img/login_form/pare-logo.png"
        />
        <!-- <div class="md-title">particles-bg-vue</div> -->
        <div class="md-body-1">
          Performance Agreement Report by Electronic
        </div>
      </div>

      <div class="form">
        <md-field>
          <label>Username</label>
          <md-input v-model="form.username" autofocus></md-input>
        </md-field>
        <span class="float-left kesalahan">{{username_error}}</span>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="form.password" type="password"></md-input>
        </md-field>
        <span class="float-left kesalahan">{{password_error}}</span>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-dense btn-sim-asn" href="https://sim-asn.bkpsdm.karawangkab.go.id/oauth/authorize?client_id=93ce4ca9-b473-4f37-bd34-1a03c5c61e58&redirect_uri=http://localhost:8000/api/login_simpeg&response_type=code&scope=profile+pegawai&state=login"><img src="~/static/img/logo-sim-asn.png" style="height:24px;" /> SIM-ASN</md-button>
        <md-button class="md-dense md-raised md-primary" @click="login">MASUK</md-button>
      </div>
      <hr>
     
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>
    </md-content>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  

  name: "LoginForm",
  data() {
    return {
      loading: false,
      username_error: null,
      password_error: null,
      form: {
        
        username: null,
        password: null,
      },
    };
  },
  methods: {
    
    async login() {
      this.loading = true;
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form,
        });
        console.log(response);
        this.$router.push("/home");
      } catch (e) {
        this.loading = false;
      }
    }
  },
  create() {
      if (this.$route.query.error){
          this.$toast.error(this.$route.query.error)
          
      }
  },
  mounted() {
      
      if (this.$route.query.token) {
           
          this.$auth.setToken('local', 'Bearer ' + this.$route.query.token)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push("/home")
          
      } 
  }
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  
  .title {
    text-align: center;
    margin-bottom: 30px;
    
    img {
      margin-bottom: -5px;
      height: 160px;
    }
    .md-body-1{
      color:#077821;
      text-shadow: 1px 1px 2px rgb(241, 241, 241), 0 0 25px rgb(235, 234, 234), 0 0 5px rgb(230, 230, 230);

    }
   
   
  }
  
  .actions {
    margin-top:-30px;
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
    .kesalahan{
      color:#b40000;
      font-size:8pt;
      margin-top:-22px;

    }
    
  }
  .md-content {
    z-index: 1;
    padding: 30px;
    width: 100%;
    max-width: 380px;
    position: relative;
    border-radius: 8px;

    .btn-sim-asn{
      background: rgb(133, 3, 3) !important;
      color:rgb(236, 236, 236) !important;
    }

  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  
}
</style>
