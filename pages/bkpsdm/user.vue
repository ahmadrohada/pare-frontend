<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">USER PARE</h4>
      <p class="card-category d-inline">BKPSDM</p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-pegawai
        :data="data"
        :total="total"
        v-on:viewPegawai="viewPegawai"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
        
      >
      </tabel-pegawai>
    </div>
  </card>
</template>

<script>

import TabelPegawai from "~/components/DataTables/TabelPegawai.vue";
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    TabelPegawai,
    PareLoader
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 0,
      page: 1,
      layout: "prev, next",
    };
  },
  methods: {

    viewPegawai: function(data) {
      //alert(data.id);
      this.$router.push("/user/"+data.nip);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/user" + params)
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
      .$get("/user")
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