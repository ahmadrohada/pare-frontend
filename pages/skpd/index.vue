<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">ADMIN SKPD</p>
    </template>
    
    
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "skpdIndex",
  middleware: ['auth'],
  layout: 'skpdLayout',
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

