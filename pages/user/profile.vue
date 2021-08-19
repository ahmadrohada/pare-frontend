<template>
  <div class="row" v-if = "user.data">
    
    <div class="col-md-4 content">
      <card-user 
        :user="user.data"
      > 
      </card-user>
    </div>
    <div class="col-md-8 content">
      <pare-loader ref="loader"></pare-loader>
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
  layout:'userLayout',
  head() {
    return {
      title: "Profile User",
      
    };
  },
  data() {
    return {
      
    };
  },
  components: {
    ProfilUser,
    CardUser
  },
  async asyncData({ params, redirect ,$axios,$refs}) {
      const user =  await $axios.$get("/me")
      return { user }

  },
  mounted(){
    this.$refs.loader.start()
  }
};
</script>
<style></style>
