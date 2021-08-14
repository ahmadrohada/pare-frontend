<template>
  <card class="font-weight-300">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>

    <h4 class="card-title">DETAIL USER</h4>
        <p class="card-text"><i class="fa fa-user"></i> NAMA LENGKAP</p>
        <p class="text-muted">{{ user.profile.nama_lengkap }}</p>
        <hr>
        <p class="card-text"><i class="fa fa-id-badge"></i> NIP</p>
        <p class="text-muted">{{ user.profile.nip }}</p>
        <hr>

        <p class="card-text"><i class="fa fa-id-card"></i> JABATAN ( {{ user.jabatan.jenis}} )</p>
        <p class="text-muted">{{ user.jabatan.nama}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-university"></i> SKPD</p>
        <p class="text-muted">{{ user.skpd.nama}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-tags"></i> Unit Kerja</p>
        <p class="text-muted">{{ user.unit_kerja.nama }}</p>
        <hr /> 
  </card>
</template>
<script>

export default {
  props: ["user"],
   data() {
    return {
      loading: false,
	    overlay: false,
    };
  },
  methods: {
    start() {
      this.loading = true
      this.overlay = true
    },
    finish() {
      this.loading = false
      this.overlay = false
	  },
  },
  mounted() {
    
  }
  
};
</script>
<style></style>
