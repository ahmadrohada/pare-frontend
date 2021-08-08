<template>
  <card>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Pegawai</h4>
      <p class="card-category d-inline">Data</p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-pegawai
        :data="data"
        :total="total"
        v-loading="loading"
        v-on:handleClick="onEnlargeText"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
      ></tabel-pegawai>
    </div>
  </card>
</template>

<script>

import TabelPegawai from "~/components/DataTables/TabelPegawai.vue";


export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    TabelPegawai
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 0,
      page: 1,
      layout: "total ,prev, pager, next, jumper",
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.$nuxt.$loading.start()
    }) 
    this.$axios
      .$get("/data_user")
      .then((resp) => {
        this.data = resp.data;
        this.total = resp.total;
        this.currentPage = resp.current_page;
        setTimeout(() => this.$nuxt.$loading.finish(), 800)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onEnlargeText: function(payload) {
      alert(payload.username);
    },
    paging: function(params) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      }) 
      this.$axios
        .$get("/data_user?page=" + params)
        .then((resp) => {
          this.data = resp.data;
          setTimeout(() => this.$nuxt.$loading.finish(), 800)
          this.currentPage = resp.current_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>