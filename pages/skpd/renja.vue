<template>
  <card style="min-height:480px;">
    <create-renja 
      ref="ModalRenja"
      style="min-height:350px;"
      @reloadTable="reloadTable"
    >
    </create-renja>

    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Renja</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createRenja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create Renja
    </md-button>

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
import CreateRenja from '~/components/Modal/CreateRenja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    TabelRenja,
    PareLoader,
    CreateRenja
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
    reloadTable(){
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
    viewRenja: function(data) {
      //alert(data.id);
      this.$refs.loader.start()
      this.$router.push("/renja/"+data.renja_id);
    },
    createRenja: function(e) {
      //alert(this.skpd_id);

      
      this.$axios
        .$get("/create_renja?skpd_id="+this.skpd_id)
        .then((data) => {
          this.$refs.ModalRenja.showModal(data); 
        })
        .catch((err) => {
          console.log(err);
        }); 

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
    notifyVue(verticalAlign, horizontalAlign, alertType, alertMessage) {
      this.$notify({
        message: alertMessage,
        timeout: 60000,
        closeOnClick:false,
        icon: 'fa fa-info',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: alertType,
      });
    }
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
    //this.notifyVue('top', 'center','danger',"Belum memiliki renja pada periode ini");
  },
  
};
</script>