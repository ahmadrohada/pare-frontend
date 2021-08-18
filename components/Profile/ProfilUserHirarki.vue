<template>
  <card class="font-weight-300">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>

    <h4 class="card-title">{{contentHeader}}</h4>
        <p class="card-text"><i class="fa fa-user"></i> NAMA LENGKAP</p>
        <p class="text-muted">{{ user.nama_lengkap }}</p>
        <hr>
        <p class="card-text"><i class="fa fa-id-badge"></i> NIP</p>
        <p class="text-muted">{{ user.nip }}</p>
        <hr>

        <p class="card-text"><i class="fa fa-id-card"></i> JABATAN ( {{ user.jabatan[0].referensi.jenis}} )</p>
        <p class="text-muted">{{ user.jabatan[0].nama}}</p>
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
        jabatan :{
          0 : {
            referensi : ''
          }
        },
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

    detail_pegawai($nip){
      this.start();
      this.contentHeader = "DETAIL PEGAWAI"
      this.$axios
        .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => this.finish(), 500) 
    },
    detail_pejabat_penilai($nip){
      this.start();
      this.contentHeader = "DETAIL PEJABAT PENILAI"
      this.$axios
         .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => this.finish(), 500) 
    },
    detail_atasan_pejabat_penilai($nip){
      this.start();
      this.contentHeader = "DETAIL ATASAN PEJABAT PENILAI"
      this.$axios
        .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => this.finish(), 500) 
    }
  },
  mounted() {
  }
  
};
</script>
<style></style>
