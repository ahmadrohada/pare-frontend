<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        Selamat Datang di Aplikasi PARE 2021 <br>
        Anda login sebagai <b>{{nama_lengkap}}</b>
      </card>
    </div>
  </div>
</template>
<script>

export default {
  name: "home",
  middleware: 'auth',
  layout: 'home',
  head() {
    return {
      title: "PARE - Home",
    };
  },
  data(){
    return{
      nama_lengkap:' . . . '
    }
  },
  mounted() {
    this.nama_lengkap = this.$auth.user.profile.pegawai.nama_lengkap
  },
};
</script>
<style></style>

