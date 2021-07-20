<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        Selamat Datang di Aplikasi PARE 2021 <br>
        Anda login sebagai <b>{{user.pegawai.name}}</b>
      </card>
    </div>
  </div>
</template>
<script>


import { mapGetters } from 'vuex'
export default {
  name: "home",
  middleware: 'auth',
  layout: 'home',
  computed: { 
    ...mapGetters([
        'user'
    ])
  },
};
</script>
<style></style>

