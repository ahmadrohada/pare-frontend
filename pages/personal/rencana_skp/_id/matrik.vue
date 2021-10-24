<template>
  <div class="row">
    <div class="col-md-12 col-lg-12 content">
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <i class="el-icon-data-board"></i>
          <h4 class="title d-inline">MATRIKS PEMBAGIAN PERAN DAN HASIL</h4>
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
  name: 'matriks',
  middleware: 'auth',
  layout:'personalRenjaLayout',
  components:{
    TabelMatrik

  },
  head() {
    return {
      title: "Tim Kerja - Matriks",
      
    };
  },
  data() {
    return {
      
      
    };
  },
  async asyncData({ params ,$axios }) {
      const tim_kerja_id = params.id
      return { tim_kerja_id }

  }, 
  methods: {
   
    
    
  },
  mounted() {
    
  },
};
</script>
<style>
 
</style>