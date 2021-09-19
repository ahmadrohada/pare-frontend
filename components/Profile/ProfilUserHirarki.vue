<template>
  <card class="font-weight-300">
    <pare-loader ref="loader"></pare-loader>
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
        <p class="text-muted">{{ (user.skpd)?user.skpd.nama:'-' }}</p>
        <hr>

        <p class="card-text"><i class="fa fa-tags"></i> Unit Kerja</p>
        <p class="text-muted">{{ (user.unit_kerja)?(user.unit_kerja.nama):'' }}</p>
        <hr /> 
  </card>
</template>
<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  components:{
    PareLoader,
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
    detail_pegawai($nip){
      this.$refs.loader.start() 
    
      this.contentHeader = "DETAIL PEGAWAI"
      this.$axios
        .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
          setTimeout(() => this.$refs.loader.finish(), 700)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detail_pejabat_penilai($nip){
      this.$refs.loader.start() 
      this.contentHeader = "DETAIL PEJABAT PENILAI"
      this.$axios
         .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => this.$refs.loader.finish(), 700)
    },
    detail_atasan_pejabat_penilai($nip){
      this.$refs.loader.start() 
      this.contentHeader = "DETAIL ATASAN PEJABAT PENILAI"
      this.$axios
        .$get("/user/"+$nip)
        .then((response) => {
          this.user = response["data"];
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => this.$refs.loader.finish(), 700)
    }
  },
  mounted() {
  }
  
};
</script>
<style></style>
