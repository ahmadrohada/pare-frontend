<template>
  <div class="row">
    <div class="col-md-4"><user-card> </user-card></div>
    <div class="col-md-8"><user-profile> </user-profile></div>
  </div>
</template>


<script>
import UserProfile from '../../components/Profile/UserProfile.vue';
import UserCard from '../../components/Profile/UserCard.vue';


export default {
  name: 'profile',
  middleware: 'auth',
  layout:'userLayout',
  head() {
    return {
      title: "Profile User",
      
    };
  },
  components: {
    UserProfile,
    UserCard
  }
};
</script>
<style></style>
