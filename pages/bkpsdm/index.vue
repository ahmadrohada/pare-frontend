<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DASHBOARD</h4>
      <p class="card-category d-inline">BKPSDM</p>
    </template>
    
    Progress Sikronisasi Data User PARE - SIMPEG
    <el-progress :text-inside="true" :stroke-width="24" :percentage="persentase" status="success"></el-progress>
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: "bkpsdmIndex",
  middleware: ['auth'],
  layout: 'bkpsdmLayout',
  components:{
    PareLoader,
  },
  data() {
    return {
      persentase:0
    };
  },
  async asyncData({ params, redirect ,$axios,$refs}) {
      const persentase =  await $axios.$get("/sync_percentage")
      return { persentase }

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

