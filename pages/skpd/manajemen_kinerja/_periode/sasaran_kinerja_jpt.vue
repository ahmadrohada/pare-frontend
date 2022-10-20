<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      @loadAsyncData="sasaranKinerjaPegawai"
    >
    </sasaran-kinerja>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai JPT</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      v-show="(showButtonCreate == true )"
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary btn-block"
      v-on:click="createSasaranKinerja($event)"
    ><span class="fa fa-plus"></span> Create SKP JPT
    </md-button>


    <el-tabs 
        v-model="activeName"
        type="border-card"
        v-show="(showTab == true )"
        @tab-click="handleTabClick"
      >
      <el-tab-pane name="sumary">
        <span slot="label"><i class="el-icon-data-board"></i> Sumary</span>
        <skp-sumary
          :skpJptId="skpJptId"
          ref="tabSumary"
          @loadAsyncData="sasaranKinerjaPegawai"
          >
        </skp-sumary>
      </el-tab-pane>
      <el-tab-pane name="rencana_kinerja">
        <span slot="label"><i class="el-icon-notebook-1"></i> Rencana Kinerja JPT</span>
        <skp-rencana-kinerja
          :skpJptId="skpJptId"
          ref="tabRencanaKinerja"
          >
        </skp-rencana-kinerja>
      </el-tab-pane>
    </el-tabs>
    
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import SasaranKinerja from '~/components/Modal/SasaranKinerjaJPT.vue';
import SkpSumary from '~/components/Tabs/SkpSumary.vue';
import SkpRencanaKinerja from '~/components/Tabs/SkpHasilKerja.vue'; 
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    SasaranKinerja,
    SkpSumary,
    SkpRencanaKinerja
  },
  data() {
    return {
      jenis_jabatan:'',
      showButtonCreate:false,
      showTab:false,
      periode:null,
      activeName: 'sumary',
      skpJptId:null
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      })
    },
  methods: {
    sasaranKinerjaPegawai(){
       const params = [
        `periode=${this.periode}`,
        `skpd_id=${this.skpd_id}`,
      ].join('&')
      //this.$refs.loader.start() 
      this.$axios
        .get(`/sasaran_kinerja_id?${params}`)
        .then(({ data }) => {
          if ( data.id == null ){
            this.showButtonCreate = true
            this.showTab = false
          }else{
            this.skpJptId = data.id
            this.showButtonCreate = false
            this.showTab = true
            this.$refs.tabSumary.loadData(this.skpJptId);
            this.$refs.tabRencanaKinerja.loadData(this.skpJptId);

          }
          
          //this.$refs.loader.finish() 
        })
        .catch((error) => {
          throw error
        })
    },
    handleTabClick(tab) {
        if ( tab.name == 'sumary'){
          this.$refs.tabSumary.loadData(this.skpJptId);
        }else{
          this.$refs.tabRencanaKinerja.loadData(this.skpJptId);
        }
    },
    createSasaranKinerja: function(e) {

      //cari dulu data dari PK
      const params = [
        `periode=${this.periode}`,
        `skpd_id=${this.skpd_id}`,
      ].join('&')
      //this.$refs.loader.start() 
      this.$axios
        .get(`/perjanjian_kinerja_id?${params}`)
        .then(({ data }) => {
          if ( data.id == null ){
            //Go to PK page

          }else{
            //this.perjanjianKinerjaId = data.id
            console.log(data)
            this.$refs.ModalSasaranKinerja.showModal(data.kepala_skpd_id,data.id,this.periode);
            



          }
          
        })
        .catch((error) => {
          throw error
        })

      
    },
    
  },
  async asyncData({ params }) {
      const periode = params.periode
      return { periode }
  },
  mounted() {
    this.sasaranKinerjaPegawai()
  },
  
};
</script>
<style lang="scss" scoped>

</style>