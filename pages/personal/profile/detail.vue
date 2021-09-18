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
import ProfilUser from '@/components/Profile/ProfilUser.vue';
import CardUser from '@/components/Profile/CardUser.vue';

export default {
  name: "personalProfile",
  middleware: ['auth'],
  layout: 'personalProfileLayout',
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
  async asyncData({$axios}) {
      const nip = '199211222015072002'
      const user =  await $axios.$get(`/me`)
      return { user } 
  },
  methods: {
   
    
  },
  mounted() {

  },
};
</script>
<style></style>

