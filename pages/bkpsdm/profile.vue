<template>
  <div class="row">
    <div class="col-md-4 content"><user-card> </user-card></div>
    <div class="col-md-8 content"><user-profile> </user-profile></div>
  </div>
</template>


<script>
import UserProfile from '../../components/Profile/UserProfile.vue';
import UserCard from '../../components/Profile/UserCard.vue';


export default {
  name: 'profile',
  middleware: 'auth',
  layout:'bkpsdmLayout',
  head() {
    return {
      title: "Profile Pegawai",
      
    };
  },
  components: {
    UserProfile,
    UserCard
  }
};
</script>
<style></style>
