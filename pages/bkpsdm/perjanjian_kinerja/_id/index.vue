<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
   
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja  <!-- {{perjanjianKinerjaId}} --></h4>
      <!-- <p class="card-category d-inline">{{user.skpd.singkatan}}</p> -->
    </template>

   


    <el-tabs 
        v-model="activeName"
        type="border-card"
        @tab-click="handleTabClick"
        
      >
      <el-tab-pane name="sumary">
        <span slot="label"><i class="el-icon-data-board"></i> Sumary</span>
        <pk-sumary
          :perjanjianKinerjaId="perjanjianKinerjaId"
          ref="tabSumary"
          >
        </pk-sumary>
      </el-tab-pane>
      <el-tab-pane name="sasaran_strategis">
        <span slot="label"><i class="el-icon-notebook-1"></i> Sasaran Strategis</span>
         <pk-sasaran-strategis
          :perjanjianKinerjaId="perjanjianKinerjaId"
          ref="tabSasaranStrategis"
          >
        </pk-sasaran-strategis>
      </el-tab-pane>
    </el-tabs>



    
      
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import PkSumary from '~/components/Tabs/PkSumary.vue';
import PkSasaranStrategis from '~/components/Tabs/PkSasaranStrategis.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "bkpsdmPerjanjianKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    PkSumary,
    PkSasaranStrategis
  },
  data() {
    return {
      activeName: 'sumary',
      perjanjianKinerjaId: null
    };
  },
  computed: {
      ...mapGetters({
        user:'user',
      })
    },
  methods: {
    handleTabClick(tab) {
       
        if ( tab.name == 'sumary'){
          this.$refs.tabSumary.loadData(this.perjanjianKinerjaId);
        }else{
          this.$refs.tabSasaranStrategis.loadData(this.perjanjianKinerjaId);
        } 
    },
   
  },
  async asyncData({ params }) {
      const perjanjianKinerjaId = params.id
      return { perjanjianKinerjaId }
      
  },
  mounted() {
    this.$refs.tabSumary.loadData(this.perjanjianKinerjaId);
    this.$refs.tabSasaranStrategis.loadData(this.perjanjianKinerjaId);
  },
  
};
</script>
<style lang="scss" scoped>
  
</style>