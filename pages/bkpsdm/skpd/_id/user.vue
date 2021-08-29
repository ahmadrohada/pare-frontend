<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">USER PARE</h4>
      <p class="card-category d-inline"></p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-user
        :tableData="data"
        :total="total"
        :limit="limit"
        v-on:addToAdmin="addToAdmin"
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
  layout: "bkpsdmSkpdLayout",
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
    addToAdmin: function(data) {
      /* this.$refs.loader.start()
      console.log(data.is_admin)
      setTimeout(() => this.$refs.loader.finish(), 700) */
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/user" + params+"&id_skpd="+this.id_skpd)
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
  async asyncData({ params ,$axios }) {
      //const user =  await $axios.$get("/user/"+params.nip)
      //return { user }
      const id_skpd = params.id
      return { id_skpd }
      //console.log(params.id)

  },
  mounted() {
   
    this.$refs.loader.start() 

    
    this.$axios
      .$get("/user?id_skpd="+this.id_skpd)
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