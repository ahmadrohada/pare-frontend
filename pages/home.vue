<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        Selamat Datang di Aplikasi PARE 2021 <br>
        Anda login sebagai <b>{{namaLengkap}}</b>
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
  head() {
    return {
      title: "PARE - Home",
    };
  },
   computed: {
    ...mapGetters({
      namaLengkap:'nama_lengkap',
    })
  },
  data(){
    return{
      nama_lengkap:' . . . '
    }
  },
  mounted() {
  },
};
</script>
<style></style>

