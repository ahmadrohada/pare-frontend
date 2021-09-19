<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">DAFTAR SKPD</h4>
      <p class="card-category d-inline"></p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-skpd
        :tableData="data"
        :total="total"
        :limit="limit"
        v-on:viewSkpd="viewSkpd"
        v-on:handlePaging="paging"
        :current-page.sync="page"
        :layout="layout"
      >
      </tabel-skpd>
    </div>
  </card>
</template>

<script>

import TabelSkpd from "~/components/DataTables/TabelSkpd.vue";
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    TabelSkpd,
    PareLoader
  },
  data() {
    return {
      data: [],
      total: 0,
      limit: 10,
      page: 1,
      layout: "prev, next",
    };
  },
  methods: {

    viewSkpd: function(data) {
      this.$router.push("/skpd/"+data.id);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/skpd" + params)
        .then((resp) => {
          this.data = resp.data;
          this.total = resp.pagination['total'];
          this.page = resp.pagination['page'];
          this.limit = resp.pagination['limit'];
          setTimeout(() => this.$refs.loader.finish(), 700)
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$refs.loader.start() 
    
    this.$axios
      .$get("/skpd")
      .then((resp) => {
        this.data = resp.data;
        this.total = resp.pagination['total'];
        this.page = resp.pagination['page'];
        this.limit = parseInt(resp.pagination['limit']);
        setTimeout(() => this.$refs.loader.finish(), 700)


      })
      .catch((err) => {
        console.log(err);
      });
  },
  
};
</script>