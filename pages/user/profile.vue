<template>
  <div class="row">
    <div class="col-md-4"><user-card> </user-card></div>
    <div class="col-md-8"><user-profile> </user-profile></div>
  </div>
</template>


<script>
import UserProfile from '../../components/UserProfile/UserProfile.vue';
import UserCard from '../../components/UserProfile/UserCard.vue';
import { mapGetters } from 'vuex'


export default {
  name: 'profile',
  middleware: 'auth',
  layout:'user',
  head() {
    return {
      title: "Profile Pegawai",
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
  
  components: {
    UserProfile,
    UserCard
  },
  mounted() {
    this.test = this.$auth.user
  },
};
</script>
<style></style>
