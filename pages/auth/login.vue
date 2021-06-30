<template>
  <div class="container">
    <div class="row justify-content-md-center" style="margin-top: 85px">
      <div class="col-md-5 col-lg-5 col-sm-12">

        <div class="login-box box-login-style">
         
         <div class="text-center">
				<h4 class="visible-sm visible-xs  login-header" style="color:#077821; text-shadow: 1px 1px 2px white, 0 0 25px white, 0 0 5px white;">Performance Agreement Report by Electronic</h4>
			
			</div>


          <div class="card-body">
            <div
              class="alert alert-danger"
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error[0] }}
            </div>
            <form method="post" @submit.prevent="login">
              <div class="form-group">
                <label for="input">Username</label>
                <input
                  type="input"
                  v-model="form.username"
                  class="form-control"
                  placeholder="Enter username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-block btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  layout: "guest",
  middleware: "guest",
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
          this.$route.query.redirect ? this.$route.query.redirect : "/daily_activity"
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

<style>
.box-login-style{
	-webkit-box-shadow: 3px 4px 11px 0px rgba(0,0,0,0.41);
	-moz-box-shadow: 3px 4px 11px 0px rgba(0,0,0,0.41);
	box-shadow: 3px 4px 11px 0px rgba(0,0,0,0.41);
	border-radius: 5px !important;
	padding:20px;
	background-color:rgba(255,255, 255, 0.2);

	
}

</style>
