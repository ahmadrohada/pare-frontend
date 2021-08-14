<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        ADMIN BKPSDM DASHBOARD
      </card>
    </div>
  </div>
</template>
<script>


export default {
  name: "dashoard",
  layout: "dashboard",
  middleware: 'auth',
  mounted() {
    this.$router.push("/bkpsdm/pegawai");
  },
};
</script> 
<style></style>

