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
      <p class="description">{{nama_lengkap}}</p>
    </div>
   
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
      title: "Profile Atasan",
    };
  },
  data(){
    return{
      test:'data load....',
      photoUrl: '/img/user.png',
      nama_lengkap:null,
      nip:null,
    }
  },
  computed: { 
    ...mapGetters([
        'profile'
    ])
  },
  mounted() {
    this.test = this.$auth.user
    this.photoUrl = this.$auth.user.profile.photo
    this.nama_lengkap = this.$auth.user.profile.pegawai.nama_lengkap
    this.nip = this.$auth.user.nip
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
