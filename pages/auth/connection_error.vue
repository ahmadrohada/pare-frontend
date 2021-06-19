<template>
  <div class="container">
    <div class="row justify-content-md-center" style="margin-top: 85px">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <base-alert type="success" >
              <strong>Network Error !!! </strong> Tidak terkoneksi ke database
            </base-alert>
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
  methods: {
    tes_connection() {
      this.$axios.get("/")
      .then((response) => {
          this.$router.push("/auth/login");
        })
      
      .catch((error) => {
        this.$router.push("/auth/connection_error");
      });
    },
  },
  mounted() {
    this.tes_connection();
  },
};
</script>
