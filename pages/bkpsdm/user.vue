<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">USER PARE</h4>
      <p class="card-category d-inline">BKPSDM</p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-user
        :tableData="data"
        :total="total"
        :limit="limit"
        v-on:viewUser="viewUser"
        v-on:handlePaging="paging"
        :current-page.sync="page"
        :layout="layout"
      >
      </tabel-user>
    </div>
  </card>
</template>

<script>

import TabelUser from "~/components/DataTables/TabelUser.vue";
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    TabelUser,
    PareLoader
  },
  data() {
    return {
      data: [],
      total: 0,
      limit: 10,
      page: 1,
      layout: "total, prev, pager, next",
    };
  },
  methods: {

    viewUser: function(data) {
      this.$refs.loader.start()
      this.$router.push("/user/"+data.nip);
      setTimeout(() => this.$refs.loader.finish(), 700)

    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/user" + params)
        .then((resp) => {
          this.data = resp.data;
          setTimeout(() => this.$refs.loader.finish(), 700)
          this.page = resp.pagination['current_page'];
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