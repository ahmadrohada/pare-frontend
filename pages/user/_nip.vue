<template>
  <div class="row">
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
  components: {
    ProfilUser,
    CardUser
  },
  head() {
    return {
      title: "Profile User",
    };
  },
  data() {
    return {
      user:{
        data:[]
      }
      
    };
  },
  computed: {

  },
  async asyncData({ params,$axios }) {
      const nip = params.nip
      //console.log(nip)
      const user =  await $axios.$get(`/user/${nip}`)
      return { user } 

  }, 
  mounted() {
    
  },
};
</script>
<style></style>
