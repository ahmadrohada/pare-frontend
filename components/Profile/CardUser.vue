<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <img class="avatar" :src="(user.photo!=null)?user.photo:defaultPhoto" alt="..." />
      <p class="card-text" style="font-size:15px;">{{user.nama_lengkap}}</p>
      <p class="text-muted" style="font-size:11px; margin-top:-6px;">NIP.{{user.nip}}</p> 
    </div>
   
  </card>
</template>
<script>
 
export default {
  props: ["user"],
  data(){
    return {
      defaultPhoto:'/img/user.png'
    }
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
