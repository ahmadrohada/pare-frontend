<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">HOME</h4>
      <p class="card-category d-inline">PAGE</p>
    </template>
    
     <p class="card-text">
          Selamat datang diaplikasi PARE 2021, anda login sebagai {{namaLengkap}}
     </p>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "home",
  middleware: 'auth',
  layout: 'home',
  head() {
    return {
      title: "PARE - Home"
    };
  },
   computed: {
    ...mapGetters({
      namaLengkap:'nama_lengkap',
    })
  },
  mounted() {
    
  },
};
</script>
<style></style>

