<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">BKPSDM</p>
    </template>

  </card>
</template>


<script>

export default {
  layout: 'bkpsdmLayout',
  components:{
  },
  data() {
    return {
    };
  },
  async asyncData({ params, redirect ,$axios,$refs}) {
      /* const persentase =  await $axios.$get("/sync_percentage")
      return { persentase } */

  },
  methods: {
   
    
  },
  mounted() {
    

  },
};
</script>
<style></style>

