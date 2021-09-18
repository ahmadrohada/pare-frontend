<template>
  <div class="row" v-if="loaded">
    <div class="col-md-4 content">
      <card-user 
        :user="user.data"
      > 
        
      </card-user>
    </div>

    
  </div>
</template>


<script>
import CardUser from '../../components/Profile/CardUser.vue';

export default {
  name: 'user',
  head() {
    return {
      title: "Profile User",
    };
  },
  components: {
    CardUser
  },
  data() {
    return {
      user:[],
      loaded:false
    };
  },
  computed: {
  },
  mounted() {

    console.log("tes")
    this.$axios
        .$get("/user/197805211997111001")
        .then((resp) => {
          this.user = resp;
          this.loaded = true
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>
<style></style>
