<template>
  <div class="row" v-if = "user.data.pegawai">
    <div class="col-md-4 content">
      <card-user 
        :user="user.data.pegawai"
      > 
        
      </card-user>
    </div>
    <div class="col-md-8 content">
      <profil-user 
        :user="user.data.pegawai"
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
      const user =  await $axios.$get("/user/"+params.nip)
      return { user }

  }
};
</script>
<style></style>
