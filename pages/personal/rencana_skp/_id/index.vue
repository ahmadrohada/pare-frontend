<template>

</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "renjaIndex",
  middleware: ['auth'],
  layout: "personalRenjaLayout",
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
        this.$router.push(`/personal/tim_kerja/${renja_id}/peran`);
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

