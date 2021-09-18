<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">USER</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-user
        :tableData="data"
        :total="total"
        v-on:viewUser="viewUser"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
      >
      </tabel-user>
    </div>
  </card>
</template>

<script>

import TabelUser from "~/components/DataTables/TabelUser.vue";
import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from 'vuex'

export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    TabelUser,
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
  computed: {
      
      ...mapGetters({
        id_skpd:'id_skpd',
        user:'user',
      })
    },
  methods: {

    viewUser: function(data) {
      //alert(data.id);
      this.$refs.loader.start()
      this.$router.push("/user/"+data.nip);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/user" + params+"&id_skpd="+this.id_skpd)
        .then((resp) => {
          this.data = resp.data;
          this.currentPage = resp.pagination['current_page'];
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
      .$get("/user?id_skpd="+this.id_skpd)
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