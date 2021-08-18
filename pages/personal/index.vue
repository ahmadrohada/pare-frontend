<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">PERSONAL</p>
    </template>
    
    tes
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "personalIndex",
  middleware: ['auth'],
  layout: 'personalLayout',
  components:{
    PareLoader,
  },
  data() {
    return {
    };
  },
  methods: {
   
    
  },
  mounted() {
    this.$refs.loader.start() 
    setTimeout(() => this.$refs.loader.finish(), 1200)

  },
};
</script>
<style></style>

