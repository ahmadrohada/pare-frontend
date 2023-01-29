<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      @loadAsyncData="sasaranKinerjaPegawai"
    >
    </sasaran-kinerja>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

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
        <span slot="label"><i class="el-icon-notebook-1"></i> Rencana Kinerja</span>
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
import SasaranKinerja from '~/components/Modal/ModalSasaranKinerja.vue';
import SkpSumary from '~/components/Tabs/SkpSumary.vue';
import SkpRencanaKinerja from '~/components/Tabs/SkpHasilKerja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "sasaranKinerjaPersonalLayout",
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
      showTab:true,
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
      this.$refs.tabSumary.loadData(this.skpJptId);
      this.$refs.tabRencanaKinerja.loadData(this.skpJptId);
    },
    handleTabClick(tab) {
        if ( tab.name == 'sumary'){
          this.$refs.tabSumary.loadData(this.skpJptId);
        }else{
          this.$refs.tabRencanaKinerja.loadData(this.skpJptId);
        }
    },
  },
  async asyncData({ params }) {
      const skpJptId = params.id
      return { skpJptId }
  },
  mounted() {
    this.skpJptId = this.$route.params.id
    this.sasaranKinerjaPegawai()
  },
  
};
</script>
<style lang="scss" scoped>

</style>