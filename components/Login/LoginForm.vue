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
          <label>E-mail</label>
          <md-input v-model="form.username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="form.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
       
        <md-button class="md-raised md-primary" @click="login">Log in</md-button>
      </div>

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
export default {
  name: "LoginForm",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
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
        //this.errors = e.response.data.errors;
      }
    }
  },
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
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 340px;
    position: relative;
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
