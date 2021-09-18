<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Renja</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>
    <div class="table-full-width table-responsive">
      <tabel-renja
        :tableData="data"
        :total="total"
        v-on:viewRenja="viewRenja"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
      >
      </tabel-renja>
    </div>
  </card>
</template>

<script>

import TabelRenja from "~/components/DataTables/TabelRenja.vue";
import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from 'vuex'

export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    TabelRenja,
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
        skpd_id:'id_skpd',
        user:'user',
      })
    },
  methods: {

    viewRenja: function(data) {
      //alert(data.id);
      this.$refs.loader.start()
      this.$router.push("/renja/"+data.renja_id);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/renja" + params+"&skpd_id="+this.skpd_id)
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
      .$get("/renja?skpd_id="+this.skpd_id)
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