<template>
  <card class="font-weight-300">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>

    <h4 class="card-title">{{contentHeader}}</h4>
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
  components: {
    
  },
  data() {
    return {
      user: [],
      user:{
        profile : [],
        skpd : [],
        jabatan : [],
        unit_kerja : []
      },
      nama_lengkap : null ,
      loading: false,
	    overlay: false,
      contentHeader: "DETAIL PEGAWAI"
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

    detail_pegawai(){
      this.contentHeader = "DETAIL PEGAWAI"
      this.$axios
        .$get("/me/hirarki")
        .then((response) => {
          this.user = response["pegawai"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detail_pejabat_penilai(){
      this.contentHeader = "DETAIL PEJABAT PENILAI"
      this.$axios
        .$get("/me/hirarki")
        .then((response) => {
          this.user = response["pejabat_penilai"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detail_atasan_pejabat_penilai(){
      this.contentHeader = "DETAIL ATASAN PEJABAT PENILAI"
      this.$axios
        .$get("/me/hirarki")
        .then((response) => {
          this.user = response["atasan_pejabat_penilai"];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
   this.detail_pegawai()
  }
  
};
</script>
<style></style>
