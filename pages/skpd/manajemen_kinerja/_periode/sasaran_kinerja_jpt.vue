<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </sasaran-kinerja>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai JPT ( SKP JPT )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createSasaranKinerja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create SKP
    </md-button>


    <el-tabs 
        v-model="activeName"
        type="border-card"
        @tab-click="handleTabClick"
      >
      <el-tab-pane name="sumary">
        <span slot="label"><i class="el-icon-data-board"></i> Sumary</span>
        <skp-sumary
          :skpJptId="40"
          ref="tabSumary"
          >
        </skp-sumary>
        
      </el-tab-pane>
      <el-tab-pane name="rencana_kinerja">
        <span slot="label"><i class="el-icon-notebook-1"></i> Rencana Kinerja</span>
         
      </el-tab-pane>
    </el-tabs>
    
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import SasaranKinerja from '~/components/Modal/SasaranKinerja.vue';
import SkpSumary from '~/components/Tabs/SkpSumary.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    SasaranKinerja,
    SkpSumary
  },
  data() {
    return {
      jenis_jabatan:'',
      periode:null,
      activeName: 'sumary'
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      })
    },
  methods: {
    handleTabClick(tab) {
       
       /*  if ( tab.name == 'sumary'){
          this.$refs.tabSumary.loadData(this.perjanjianKinerjaId);
        }else{
          this.$refs.tabSasaranStrategis.loadData(this.perjanjianKinerjaId);
        }  */
    }
    
  },
  async asyncData({ params }) {
      const periode = params.periode
      return { periode }
  },
  mounted() {
    
  },
  
};
</script>
<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 10px
  }
</style>