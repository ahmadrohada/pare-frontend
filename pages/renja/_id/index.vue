<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>

     index
    
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "renjaIndex",
  middleware: ['auth'],
  layout: "renjaLayout",
  components:{
    PareLoader,
  },
  data() {
    return {

    };
  },
  methods: {
    routing(renja_id){
      if ( renja_id != 'undefined'){
        this.$router.push(`/renja/${renja_id}/tim_kerja`);
      }else{
        this.$router.push(`/error`);
      }
      

    }
    
    
  },
  mounted() {
    this.routing(this.$route.params.id)
    //this.$router.push(`/renja/${this.$route.params.id}/tim_kerja`);
    
  },
};
</script>
<style></style>

