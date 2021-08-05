<template>
  <card class="font-weight-300">
    <h4 class="card-title">Profile Pegawai</h4>
        <p class="card-text"><i class="fa fa-user"></i> NAMA LENGKAP</p>
        <p class="text-muted">{{ user.pegawai.nama_lengkap }}</p>
        <hr>
        <p class="card-text"><i class="fa fa-id-badge"></i> NIP</p>
        <p class="text-muted">{{ user.pegawai.nip }}</p>
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
        pegawai : [],
        skpd : [],
        jabatan : [],
        unit_kerja : []
      },
      nama_lengkap : null ,
    };
  },
  async beforeMount()  {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      }) 

      await this.$axios
        .$get("/me/profile")
        .then((response) => {
          this.user = response['data'];
          setTimeout(() => this.$nuxt.$loading.finish(), 800)
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => this.$nuxt.$loading.finish(), 800)
        });
  },
   mounted() {
   /*   
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 800)
    })  */
  }
  
};
</script>
<style></style>
