<template>
  <card style="min-height: 500px">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">HOME</h4>
      <p class="card-category d-inline">PAGE</p>
    </template>

    <p class="card-text">
      Selamat datang diaplikasi PARE 2021, anda login sebagai {{ namaLengkap }}
    </p>
  </card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  middleware: "auth",
  layout: "home",
  head() {
    return {
      title: "PARE - Home",
      id_skpd: null,
    };
  },
  computed: {
    ...mapGetters({
      namaLengkap: "nama_lengkap",
      id_skpd: "id_skpd",
    }),
  },
  methods: {
    cek_skpd(val) {
      if (this.id_skpd != 28 ) {
        this.$auth.logout();
        if ( this.$route.path == "/"){
            this.$router.go("/login")
          }
      }
    },
  },
  mounted() {
    this.cek_skpd();
  },
};
</script>
<style></style>

