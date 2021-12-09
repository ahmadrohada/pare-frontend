<template>
  <div class="row">
    <div class="col-md-12 col-lg-12 content">
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <i class="el-icon-data-board"></i>
          <h4 class="title d-inline">RENCANA SKP</h4>
          <p class="card-category d-inline"></p>
        </template>


        <div class="table-full-width">
          <tabel-matrik
            :tableData="data"
            :total="total"
            v-on:viewUser="viewUser"
            v-on:handlePaging="paging"
            :current-page.sync="currentPage"
            :layout="layout"
          >
          </tabel-matrik>
        </div>


      </card>
    </div>
  </div>
</template>


<script>
import TabelMatrik from "~/components/DataTables/TabelMatrik.vue";

export default {
  name: 'rencana_skp',
  middleware: 'auth',
  layout:'renjaLayout',
  components:{
    TabelMatrik

  },
  head() {
    return {
      title: "Tim Kerja - Rencana SKP",
      
      
    };
  },
  data() {
    return {
      data: [],
      
    };
  },
  async asyncData({ params ,$axios }) {
      const tim_kerja_id = params.id
      return { tim_kerja_id }

  }, 
  methods: {
   
    
    
  },
  mounted() {
     this.$axios
      .$get("/matrik_peran_hasil?top_id=2")
      .then((resp) => {
        this.data = resp.data;
        //this.total = resp.pagination['total'];
        //this.currentPage = resp.pagination['current_page'];
        //setTimeout(() => this.$refs.loader.finish(), 700)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style>
 
</style>