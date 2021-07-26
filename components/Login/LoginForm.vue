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
        <md-button :disabled="!!myInput" class="md-dense md-raised md-primary btn-block btn-pare" @click="login">MASUK</md-button>
      </div>
      <hr>

      <div class="actions " style="margin-top:8px; text-align: center;">
        <span class="text-muted" style="font-size:11px; margin-top:-15px !important;">atau login dengan</span>
        
        <md-button :disabled="!!myInput" class="md-dense md-raised md-primary btn-block btn-sim-asn" :href="simpegLink"><img src="~/static/img/logo-sim-asn.png" style="height:24px;" /> SIM-ASN</md-button>
      </div>
     
      <div class="loading-overlay" v-if="loading">
        <img src="~/static/img/loaders/loader.gif" style="height:120px" alt="">
      </div>
    </md-content>
  </div>
</template>

<script>


export default {
  

  name: "LoginForm",
  data() {
    return {
      simpegLink: `${process.env.simpegUrl}/oauth/authorize?client_id=${process.env.simpegClientId}&redirect_uri=${process.env.apiUrl}/login_simpeg&response_type=code&scope=profile+pegawai&state=login`,
      loading: false,
      username_error: null,
      password_error: null,
      form: {
        
        username: null,
        password: null,
      },
      myInput:false,
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
      } catch (error) {
        console.log(error.response.data.message);
        this.loading = false;
        this.notifyVue('top', 'center','danger',error.response.data.message);
      } 
    },
    notifyVue(verticalAlign, horizontalAlign, alertType, alertMessage) {
      
      
      this.$notify({
        message: alertMessage,
        timeout: 4000,
        closeOnClick:true,
        icon: 'fa fa-key',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: alertType,
      });
    },
    tes_connection() {
      this.$axios.get("/").catch((error) => {
        this.myInput = true ;
      });
    },
  },
  mounted() {
     if (this.$route.query.token) {
      this.loading = true;
    }
    this.tes_connection();

    
      
  }
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 620px;
  background: #1D976C;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #6cc08b, #1D976C);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #6cc08b, #1D976C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  .title {
    text-align: center;
    margin-bottom: -10px;
    
    img {
      margin-top: -10px;
      margin-bottom: -10px;
      height: 140px;
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

    .btn-pare{
      background: rgb(3, 151, 90) !important;
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
