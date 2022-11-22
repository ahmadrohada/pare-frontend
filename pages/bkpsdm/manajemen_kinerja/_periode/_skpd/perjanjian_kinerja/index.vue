<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <create-pk 
      ref="ModalRenja"
      @loadAsyncData="perjanjianKinerja"
    >
    </create-pk>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja  <!-- {{periode}} --></h4>
      <!-- <p class="card-category d-inline">{{user.skpd.singkatan}}</p> -->
    </template>

   


    <el-tabs 
        v-model="activeName"
        type="border-card"
        v-show="(showTab == true )"
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
  layout: "bkpsdmManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    PkSumary,
    PkSasaranStrategis
  },
  data() {
    return {
      periode:null,
      showTab:false,
      perjanjianKinerjaId:null,
      activeName: 'sumary'
    };
  },
  computed: {
      ...mapGetters({
        user:'user',
      })
    },
  methods: {
    perjanjianKinerja(){
       const params = [
        `periode=${this.periode}`,
        `skpd_id=${this.skpd_id}`,
      ].join('&')
      this.$refs.loader.start() 
      this.$axios
        .get(`/perjanjian_kinerja_id?${params}`)
        .then(({ data }) => {
          if ( data.id == null ){
            this.showButtonCreate = true
            this.showTab = false
          }else{
            this.perjanjianKinerjaId = data.id
            this.showButtonCreate = false
            this.showTab = true
            this.$refs.tabSumary.hideSubmit();
            this.$refs.tabSumary.loadData(data.id);
            this.$refs.tabSasaranStrategis.hideButton();
            this.$refs.tabSasaranStrategis.loadData(data.id);

          }
          
          this.$refs.loader.finish() 
        })
        .catch((error) => {
          throw error
        })
    },
    handleTabClick(tab) {
       
        if ( tab.name == 'sumary'){
          this.$refs.tabSumary.loadData(this.perjanjianKinerjaId);
        }else{
          this.$refs.tabSasaranStrategis.loadData(this.perjanjianKinerjaId);
        } 
    },
    openTab2() {
       
        alert("hahaha")
    }
  },
  async asyncData({ params }) {
      const periode = params.periode
      const skpd_id = params.skpd
      return { periode,skpd_id }
      
  },
  mounted() {
    this.perjanjianKinerja()
  },
  
};
</script>
<style lang="scss" scoped>
  
</style>