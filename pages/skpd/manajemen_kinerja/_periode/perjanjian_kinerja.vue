<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <create-pk 
      ref="ModalRenja"
      style="min-height:350px;"
      @loadAsyncData="perjanjianKinerja"
    >
    </create-pk>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja Periode {{periode}}</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      v-show="(showButtonCreate == true )"
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary btn-block"
      v-on:click="createRenja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create Perjanjian Kinerja
    </md-button>


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
import CreatePk from '~/components/Modal/PerjanjianKinerja.vue';
import PkSumary from '~/components/Tabs/PkSumary.vue';
import PkSasaranStrategis from '~/components/Tabs/PkSasaranStrategis.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    CreatePk,
    PkSumary,
    PkSasaranStrategis
  },
  data() {
    return {
      periode:null,
      showButtonCreate:false,
      showTab:false,
      perjanjianKinerjaId:null,
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
    createRenja: function(e) {
      this.$refs.ModalRenja.tes();
      this.$refs.ModalRenja.showModal(this.skpd_id,this.periode);
      
    },
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
            this.$refs.tabSumary.loadData(data.id);
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
    }
  },
  async asyncData({ params }) {
      const periode = params.periode
      return { periode }
      
  },
  mounted() {
    this.perjanjianKinerja()
  },
  
};
</script>
<style lang="scss" scoped>
  
</style>