<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja</h4>
      <p class="card-category d-inline">Personal</p>
    </template>
  </card>
</template>


<script>

export default {
  middleware: ['auth'],
  layout: "sasaranKinerjaPersonalLayout",
  methods: {
    routing(sasaran_kinerja_id){
      if ( sasaran_kinerja_id != 'undefined'){
        this.$router.push(`/personal/sasaran_kinerja/${sasaran_kinerja_id}/sumary`);
      }else{
        this.$router.push(`/error`);
      }
    }
  },
  mounted() {
    this.routing(this.$route.params.id)
  },
};
</script>
<style></style>

