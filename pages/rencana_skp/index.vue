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
  layout: "rencanaSkpLayout",
  components:{
  },
  mounted() {
    this.$router.push(`/personal/rencana_skp`);
  },
};
</script>
<style></style>

