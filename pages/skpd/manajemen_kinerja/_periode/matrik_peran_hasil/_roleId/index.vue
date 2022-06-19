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

    <modal-pegawai 
      ref="PegawaiForm"
      @loadAsyncData="loadAsyncData"
    >
    </modal-pegawai>


    
    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addJabatan($event)"
      value="0"
     
    ><span class="fa fa-plus"></span>  Jabatan
    </md-button>
   

    <el-table
      :data="tableMatriksPeranHasil"
      border
      :show-header="true"
      :highlight-current-row="false"
      style="width: 100%;">

      <el-table-column  :fixed="true" min-width="360" label="Jabatan dan Nama Pegawai">
        <template slot-scope="{ row }">
          <div style="display: inline-block !important; padding:0px !important; width:100%; ">
            <div style="float: left; width:80%;">

              <div v-if="row.nama_pegawai != null ">
                <el-button size="mini" type="text" @click="hapusPegawai(row)">
                  <i class="el-icon-remove" style="color:#F56C6C;"></i>
                  <md-tooltip md-direction="top">Hapus Pegawai</md-tooltip>
                </el-button>
                <span style="color: #100f15; margin-top: -6px" class="">{{
                  row.nama_pegawai
                }}</span
                ><br />
              </div>
              <el-button v-else size="mini" type="text" @click="addPegawai(row)" >
                <i class="el-icon-user"></i> Tambah Pegawai
                <md-tooltip md-direction="top">Add Pegawai</md-tooltip>
              </el-button>

              <div style="padding: 0px !important">
                <span style="margin-top:-6px;" class="">{{row.jabatan}}</span>
              </div>
              <div style="padding: 0px !important">
                <span style="color:#100f15;   margin-top:-6px;" class="">{{row.role}}</span><br>
              </div>
              
            </div>
            <div style="margin-top:10px;float:right;">
              <div>
                <el-button  
                  size="small" 
                  @click="addOutcome(row)" 
                  icon="el-icon-s-order" 
                  circle
                  style="color:#34a890;">
                </el-button>
                <md-tooltip md-direction="left">Tambah Outcome / Hasil</md-tooltip>
              </div>
            </div>
          </div> 
        </template>
      </el-table-column>
    
      <!-- ========== KOLOM HASIL / OUTCOME ========================== -->
      <template v-for="(data,index) in sasaranStrategis">
        <el-table-column  v-bind:key min-width="250" label="INTERMEDIATE OUTCOME">
          <template slot-scope="{ row }">
            <span style="margin-top:-6px;" class="">{{row.outcome[index].label}}</span>

            <!-- <el-button v-if="" size="mini" type="text" @click="klikKolom(row.outcome[index])" >
              <i class="el-icon-circle-plus-outline"></i> Tambah Pegawai
              <md-tooltip md-direction="top">Add Pegawai</md-tooltip>
            </el-button> -->
            <br>
            <el-button  v-if="row.outcome[index].label != '' " size="mini" type="text"  style="color:#34a890;margin-left:-3px;" @click="klikKolom(row.outcome[index],row.perjanjian_kinerja_id)" >
              <i class="el-icon-setting"></i> Update/Delete
              <md-tooltip md-direction="top">Update / Delete Outcome</md-tooltip>
            </el-button>
          </template>
        </el-table-column>
      </template>

      
    </el-table>

    <br>

    <span style="color:#22726f">* Klik pada item Intermediate Outcome untuk melakukan menghapus atau melakukan perubahan narasi</span>
    

   <!--  https://stackoverflow.com/questions/70373804/vue-js-element-ui-el-table-how-to-merge-cells-and-subtotal-them -->
   
     
  </card>
</template>




<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalJabatan from '~/components/Modal/ModalJabatan.vue';
import ModalPegawai from '~/components/Modal/ModalPegawai.vue';
import ModalOutcome from '~/components/Modal/ModalOutcome.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdMatrikPeranHasilLayout",
  middleware: "auth",
   components: {
    PareLoader,
    ModalJabatan,
    ModalOutcome,
    ModalPegawai
    
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
        this.$refs.loader.start() 
        const params = [
          `periode=${this.periode}`,
          `skpd_id=${this.skpd_id}`,
          `koordinator_id=${this.koordinator_id}`,
        ].join('&')
        
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
            }, 600);
          })
          .catch((error) => {
            this.tableMatriksPeranHasil = []
            this.$refs.loader.finish() 
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
        this.$refs.PegawaiForm.showModalAdd(e);
      },
      hapusPegawai: function (data) {
      console.log(data);
        this.$confirm('Nama Pegawai akan dihapus dari jabatan ini !', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/peran_pegawai?id="+data.id)
            .then((resp) => {
                this.loadAsyncData()
                this.$message({
                  type: 'success',
                  message: 'Pegawai Berhasil dihapus'
                });
            })
            .catch((error) => {
              //console.log(error.response.data.message)
              this.$message({
                type: 'error',
                message: error.response.data.message
              });          
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Proses Hapus Pegawai Dibatalkan'
          });          
        });

      },
      klikKolom: function(e,pk_id) {
        console.log(pk_id)
        this.$refs.OutcomeForm.showModalEdit(e,pk_id);
        
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
<style>
  .el-table .cell {
    word-break: normal !important;
  }
</style>