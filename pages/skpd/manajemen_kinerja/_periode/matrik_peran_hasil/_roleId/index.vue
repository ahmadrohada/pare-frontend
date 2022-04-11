<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Matrik Pembagian Peran dan Hasil ( MPH )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <modal-jabatan 
      ref="JabatanForm"
      @loadAsyncData="loadAsyncData"
    >
    </modal-jabatan>

    <modal-outcome 
      ref="OutcomeForm"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </modal-outcome>

    <modal-pejabat 
      ref="PejabatForm"
      @loadAsyncData="loadAsyncData"
    >
    </modal-pejabat>


    
    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addJabatan($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Tambah Jabatan
    </md-button>
   

    <el-table
      :data="tableMatriksPeranHasil"
      border
      :show-header="true"
      :highlight-current-row="false"
      style="width: 100%;">

      <el-table-column  :fixed="true" min-width="260" label="JABATAN">
        <template slot-scope="{ row }">
          <div style="display: inline-block !important; padding:0px !important; width:100%; ">
            <div style="float: left; width:80%;">
              <span style="margin-top:-6px;" class="">{{row.jabatan}}</span><br>
              <span style="color:#100f15;   margin-top:-6px;" class="">{{row.role}}</span><br>
              
              <div v-for=" data in row.pejabat_skp" v-bind:key >
                 <span style="color:#100f15;   margin-top:-6px;" class="">{{data.nama_pejabat}}</span><br>
              </div>


            </div>
            <div style="margin-top:10px;float:right;">
              <div>
                <el-button  
                  size="small" 
                  @click="addOutcome(row)" 
                  icon="el-icon-s-order" 
                  circle
                  class="tes-button">
                </el-button>
                <md-tooltip md-direction="left">Tambah Outcome / Hasil</md-tooltip>
              </div>
              <div style="margin-top:10px;">
                <el-button  
                  size="small" 
                  @click="addPegawai(row)" 
                  icon="el-icon-user" 
                  circle
                  class="tes-button">
                </el-button>
                <md-tooltip md-direction="left">Tambah Pegawai</md-tooltip>
              </div>
              

            </div>
          </div> 
        </template>
      </el-table-column>
    
      <!-- ========== KOLOM HASIL / OUTCOME ========================== -->
      <template v-for="(data,index) in sasaranStrategis">
        <el-table-column  v-bind:key min-width="220" label="INTERMEDIATE OUTCOME">
          <template slot-scope="{ row }">
            <div style="cursor:pointer;padding:0px !important;" v-on:click="klikKolom(row.outcome[index])">
              <span style="margin-top:-6px;" class="">{{row.outcome[index].label}}</span>
            </div>
          </template>
        </el-table-column>
      </template>

      
    </el-table>

    

   <!--  https://stackoverflow.com/questions/70373804/vue-js-element-ui-el-table-how-to-merge-cells-and-subtotal-them -->
   
     
  </card>
</template>




<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalJabatan from '~/components/Modal/ModalJabatan.vue';
import ModalPejabat from '~/components/Modal/ModalPejabat.vue';
import ModalOutcome from '~/components/Modal/ModalOutcome.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdMatrikPeranHasilLayout",
  middleware: "auth",
   components: {
    PareLoader,
    ModalJabatan,
    ModalOutcome,
    ModalPejabat
    
  },
  data() {
    return {
      tableMatriksPeranHasil:[],
      sasaranStrategis:[],
      periode: '',
      koordinator_id: '',
      visible:false,
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      }),
     
  },
  methods: {
    loadAsyncData() {
        const params = [
          `periode=${this.periode}`,
          `skpd_id=${this.skpd_id}`,
          `koordinator_id=${this.koordinator_id}`,
        ].join('&')
        this.loading = true
        this.$axios
          .get(`/matrik_peran_hasil?${params}`)
          .then(({ data }) => {
            this.tableMatriksPeranHasil = []
            this.sasaranStrategis = data.sasaran_strategis
            data.matriks.forEach((item) => {
              this.tableMatriksPeranHasil.push(item)
            })
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 400);
            this.loading = false
          })
          .catch((error) => {
            this.tableMatriksPeranHasil = []
            throw error
          })
      },
      addJabatan: function(e) {
        this.$refs.JabatanForm.showModalAdd(this.skpd_id);
      },
      addOutcome: function(e) {
        console.log(e)
        this.$refs.OutcomeForm.showModalAdd(e);
      },
      addPegawai: function(e) {
        this.$refs.PejabatForm.showModalAdd(e);
      },
      klikKolom: function(e) {
        console.log(e.id)
        this.$refs.OutcomeForm.showModalEdit(e);
       /*  this.$message({
          showClose: true,
          message: 'Warning, fungsi dalam pengerjaan',
          type: 'warning'
        }); */
        
      },
  },
  async asyncData({ params ,$route }) {
      const koordinator_id = params.roleId
      return { koordinator_id }

  },
  mounted() {
    this.periode = this.$route.params.periode
    this.loadAsyncData()
  },
  
};
</script>
<style lang="scss" scoped>
 
  .el-table .cell {
    word-break: normal !important;
  }

  
/*   .el-button .tes-button {
    opacity:50% !important;
    box-shadow:0 0 1px rgb(95, 111, 119);
    background-color: rgb(255, 255, 255);
    color:rgb(1, 30, 58) !important;
    transition: 0.4s;
  }

  .el-button:hover {
    opacity:70% !important;
    box-shadow:0 0 3px rgb(196, 196, 196);
    background-color: rgb(66, 129, 145) !important;
    color:rgb(253, 253, 253);
  } */
</style>