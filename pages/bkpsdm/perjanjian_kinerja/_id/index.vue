<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>
  </card>
</template>


<script>
export default {
  middleware: ['auth'],
  //layout: "perjanjianKinerjaLayout",
  methods: {
    routing(renja_id){
      /* if ( renja_id != 'undefined'){
        this.$router.push(`/bkpsm/perjanjian_kinerja/${renja_id}/sasaran_strategis`);
      }else{
        this.$router.push(`/error`);
      } */
    }
  },
  mounted() {
    this.routing(this.$route.params.id)
  },
};
</script>
<style></style>

