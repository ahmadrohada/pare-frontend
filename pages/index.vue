<template>
  <card style="min-height:500px;">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">HOME</h4>
      <p class="card-category d-inline">PAGE</p>
    </template>
    
     <p class="card-text">
          Selamat datang diaplikasi PARE 2021, anda login sebagai {{namaLengkap}}
     </p>
  </card>
</template>

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

