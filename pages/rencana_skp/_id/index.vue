<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Rencana SKP</h4>
      <p class="card-category d-inline">personal</p>
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

  },
};
</script>
<style></style>

