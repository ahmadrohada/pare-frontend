<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>

     KEGIATAN
    
  </card>
</template>


<script>


export default {
  name: 'kegiatan',
  middleware: 'auth',
  layout:'renjaLayout',
  head() {
    return {
      title: "Rencana Kerja",
      
    };
  },
  data() {
    return {
      
    };
  },
  components: {

  },
  async asyncData({ params ,$axios }) {
      //const renja =  await $axios.$get("/renja/"+params.id)
      //return { renja }

  }
};
</script>
<style></style>
