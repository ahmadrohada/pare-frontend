<template>
  <div class="row">
    <div class="col-md-8"><edit-profile-form> </edit-profile-form></div>
    <div class="col-md-4"><user-card> </user-card></div>
  </div>
</template>
<script>
import EditProfileForm from '../../components/Profile/EditProfileForm.vue';
import UserCard from '../../components/Profile/UserCard.vue';

export default {
  name: 'user',
  components: {
    EditProfileForm,
    UserCard
  }
};
</script>
<style></style>
