<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" :src="photoUrl" alt="..." />
        <h5 class="title">{{nip}}</h5>
      </a>
      <p class="description">{{namaLengkap}}</p> 
    </div>
    
    <br>
    Koneksikan akun PARE  dengan SIM-ASN agar  dapat melakukan sinkronisasi untuk memperbaharui profile PARE anda
    <p>SIM-ASN <a :href="simpegLink"> Connect with SIM-ASN</a> </p>
   
  </card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  middleware: 'auth',
  layout:'user',
  head() {
    return {
      title: "Profile",
    };
  },
  data(){
    return{
      simpegLink: `${process.env.simpegUrl}/oauth/authorize?client_id=${process.env.simpegClientId}&redirect_uri=${process.env.apiUrl}/login_simpeg&response_type=code&scope=profile+pegawai&state=profile`,
    }
  },
  computed: { 
    ...mapGetters({
      photoUrl: 'photo',
      namaLengkap:'nama_lengkap',
      nip:'nip',
    })
  },
  mounted() {
    
  },
};
</script>
<style>
  .md-tabs.md-theme-default .md-tabs-navigation{
     background: rgb(46,203,65) !important;
    background: linear-gradient(90deg, rgba(46,203,65,1) 0%, rgba(23,120,79,1) 0%, rgba(10,194,137,1) 100%) !important; 
    margin-top: 14px;
    
  }
 
</style>
