<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="img/lora.jpg" alt="..." />
        <h5 class="title">{{user.pegawai.name}}</h5>
      </a>
      <p class="description">{{user.pegawai.jabatan.name}}</p>
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
      test:'data load....'
    }
  },
  computed: { 
    ...mapGetters([
        'user'
    ])
  },
  mounted() {
    this.test = this.$auth.user
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
