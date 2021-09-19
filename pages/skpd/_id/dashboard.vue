<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>

     dashboard
    
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "dashboard",
  middleware: ['auth'],
  layout: "bkpsdmSkpdLayout",
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

