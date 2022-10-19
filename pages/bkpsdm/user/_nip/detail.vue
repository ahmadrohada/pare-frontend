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
  name: "bkpsdmUserProfile",
  middleware: ['auth'],
  layout: 'bkpsdmUserProfileLayout',
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
  async asyncData({$axios,params}) {
      const user =  await $axios.$get(`/user/${params.nip}`)
      return { user } 
  }
};
</script>
<style></style>

