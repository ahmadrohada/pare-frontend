<template>
  <card style="min-height:480px;">
    <div class="loading-overlay" v-if="loading" :value="overlay">
      <img src="~/static/img/loaders/loader.gif" style="height:80px" alt="">
    </div>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Pegawai</h4>
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


export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    TabelPegawai
  },
  data() {
    return {
      loading: false,
	    overlay: false,
      data: [],
      total: 0,
      currentPage: 0,
      page: 1,
      layout: "prev, next",
    };
  },
  methods: {
    start() {
      this.loading = true
      this.overlay = true
    },
    finish() {
      this.loading = false
      this.overlay = false
	  },
    

    viewPegawai: function(data) {
      //alert(data.id);
      this.$router.push("/user/"+data.nip);
    },
    paging: function(params) {
      this.start()
      this.$axios
        .$get("/user" + params)
        .then((resp) => {
          this.data = resp.data;
          setTimeout(() => this.finish(), 800)
          this.currentPage = resp.pagination['current_page'];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.start() 
    this.$axios
      .$get("/user")
      .then((resp) => {
        this.data = resp.data;
        this.total = resp.pagination['total'];
        this.currentPage = resp.pagination['current_page'];
        setTimeout(() => this.finish(), 1200)


      })
      .catch((err) => {
        console.log(err);
      });
  },
  
};
</script>