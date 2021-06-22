<template>
  <div class="container">
    <div class="row justify-content-md-center" style="margin-top: 85px">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
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
              <button type="submit" class="btn btn-primary">Submit</button>
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
