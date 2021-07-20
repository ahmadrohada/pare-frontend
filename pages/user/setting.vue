<template>
  <div class="row">
    <div class="col-md-12">{{test}}</div>
  </div>
</template>


<script>
import EditProfileForm from '../../components/UserProfile/EditProfileForm.vue';
import UserCard from '../../components/UserProfile/UserCard.vue';
import { mapGetters } from 'vuex'


export default {
  name: 'setting',
  middleware: 'auth',
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
    EditProfileForm,
    UserCard
  },
  mounted() {
    this.test = this.$auth.user
  },
};
</script>
<style></style>
