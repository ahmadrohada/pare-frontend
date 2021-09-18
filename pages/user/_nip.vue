<template>
  <div>
    {{user}}
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
