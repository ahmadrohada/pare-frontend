<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">TIM KERJA</h4>
      <p class="card-category d-inline">PERSONAL RENJA</p>
    </template>

     <div class="table-full-width table-responsive">
      <tabel-tim-kerja
        :tableData="data"
        :total="total"
        v-on:viewPersonalTimKerja="viewPersonalTimKerja"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
      >
      </tabel-tim-kerja>
    </div>
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';
import TabelTimKerja from "~/components/DataTables/TabelTimKerja.vue";
import { mapGetters } from 'vuex'

export default {
  name: "personalIndex",
  middleware: ['auth'],
  layout: 'personalLayout',
  components:{
    PareLoader,
    TabelTimKerja  
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 0,
      pagerCount:0,
      page: 1,
      layout: "prev, next",
    };
  },
  computed: {
      
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
        user_id:'user_id',
      })
  },
  methods: {
    viewPersonalTimKerja: function(id) {
      //alert(data.id);
      this.$refs.loader.start()
      this.$router.push("/personal/tim_kerja/"+id);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/personal_renja" + params+"&user_id="+this.user_id)
        .then((resp) => {
          this.data = resp.data;
          setTimeout(() => this.$refs.loader.finish(), 700)
          this.currentPage = resp.pagination['current_page'];
        })
        .catch((err) => {
          console.log(err);
        });
    },
   
    
  },
  mounted() {
    this.$refs.loader.start() 
    this.$axios
      .$get("/personal_renja?user_id="+this.user_id)
      .then((resp) => {
        this.data = resp.data;
        this.total = resp.pagination['total'];
        this.currentPage = resp.pagination['current_page'];
        setTimeout(() => this.$refs.loader.finish(), 700)
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
</script>
<style></style>

