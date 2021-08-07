<template>
  <card class="font-weight-300">
    <h4 class="card-title">HOME</h4>
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
      title: "PARE - Home",
    };
  },
   computed: {
    ...mapGetters({
      namaLengkap:'nama_lengkap',
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    }) 
  },
};
</script>
<style></style>

