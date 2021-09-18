<template>
  <div class="row" v-if = "user.data">
    <div class="col-md-4 content">
      <card-user 
        :user="user.data"
      > 
        
      </card-user>
    </div>
    <div class="col-md-8 content">
      <profil-user 
        :user="user.data"
      >
        
      </profil-user>
      </div>
  </div>
</template>


<script>
import ProfilUser from '../../components/Profile/ProfilUser.vue';
import CardUser from '../../components/Profile/CardUser.vue';


export default {
  name: 'user',
  middleware: 'auth',
  layout:'bkpsdmLayout',
  head() {
    return {
      title: "Profile User",
      user:{
        data:null
      }
        
      
    };
  },
  data() {
    return {
      user:null,
      
    };
  },
  components: {
    ProfilUser,
    CardUser
  },
  async asyncData({ params,$axios }) {
      const nip = params.nip
      //console.log(nip)
      const user =  await $axios.$get(`/user/${nip}`)
      return { user } 

  }
};
</script>
<style></style>
