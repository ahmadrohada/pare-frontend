<template>
  <card style="min-height:500px;">
    <create-rencana-skp 
      ref="ModalRencanaSKP"
      style="min-height:450px;"
    >
    </create-rencana-skp>
    
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Rencana SKP</h4>
      <p class="card-category d-inline">PERSONAL</p>
    </template>

     <div class="table-full-width table-responsive">
      <tabel-rencana-skp
        :tableData="data"
        :total="total"
        v-on:createRencanaSkp="createRencanaSkp"
        v-on:lihatRencanaSkp="lihatRencanaSkp"
        v-on:handlePaging="paging"
        :current-page.sync="currentPage"
        :layout="layout"
      >
      </tabel-rencana-skp>
    </div>
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';
import TabelRencanaSkp from "~/components/DataTables/TabelRencanaSkp.vue";
import CreateRencanaSkp from '~/components/Modal/CreateRencanaSkp.vue';
import { mapGetters } from 'vuex'

export default {
  name: "personalIndex",
  middleware: ['auth'],
  layout: 'personalLayout',
  components:{
    PareLoader,
    TabelRencanaSkp,
    CreateRencanaSkp
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 0,
      pagerCount:0,
      page: 1,
      layout: 'total, sizes, prev, pager, next, jumper',
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
    createRencanaSkp: function(id) {
      this.$axios
        .$get("/create_rencana_skp?renja_pejabat_id="+id)
        .then((resp) => {
          this.$refs.ModalRencanaSKP.showModal(resp); 
        })
        .catch((err) => {
          console.log(err);
        });

    },
    lihatRencanaSkp: function(id) {
      this.$refs.loader.start()
      this.$router.push("/rencana_skp/"+id);
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

