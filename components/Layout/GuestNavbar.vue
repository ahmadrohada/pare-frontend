<template>
  <guest-nav class="navbar-fixed top-navbar">
    <div class="app_name">
      PARE - BKPSDM KARAWANG
    </div>
  </guest-nav>
</template>
<script>
import GuestNav  from  '~/components/Navbar/GuestNav.vue';

export default {
  components: {
    GuestNav
  },
  computed: {
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
  mounted() {
    
  },
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
.app_name{
  color :rgb(190, 233, 208) ;
}
.top-navbar{
  padding: 2px 2px 2px 10px;
}
</style>
