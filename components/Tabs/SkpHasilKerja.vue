<template>
   <card style="min-height:500px;">
     <rencana-kinerja 
        ref="ModalRencanaKinerja"
        @loadAsyncData="loadAsyncData"
      >
      </rencana-kinerja>

      <indikator-kinerja-individu
        ref="ModalIndikatorKinerjaIndividu"
        @loadAsyncData="loadAsyncData"
      >
      </indikator-kinerja-individu>

      <manual-indikator-kinerja
        ref="ModalManualIndikatorKinerja"
        @loadAsyncData="loadAsyncData"
      >
      </manual-indikator-kinerja>
    
    <p class="" style="margin-top: 20px">A. KINERJA UTAMA</p>
    <el-table
      :data="tableDataKinerjaUtama"
      :span-method="objectSpanMethodKinerjaUtama"
      border
      style="width: 100%;">
      <el-table-column
        align="center"
        prop="no"
        label="No"
        width="45">
      </el-table-column>
      <el-table-column label="Rencana Kinerja" width="270">
        <template slot-scope="{row}">
          {{row.rencana_kinerja}}
          <!-- <i v-if=" row.indikator_id  != '' ">
            <el-button v-if="statusSasaranKinerja == 'drafted' " size="mini" type="text" @click="editRencanaKinerja(row)">
            <i class="el-icon-edit-outline"></i> Edit
            <md-tooltip md-direction="top">Edit Rencana Kinerja</md-tooltip>
            </el-button>
          </i> -->
        </template>
      </el-table-column>
      <el-table-column  label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="{row}">
          {{row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150">
      </el-table-column>
     <!--  <el-table-column  fixed="right" align="center" label="Manual" width="70" v-if="statusSasaranKinerja == 'drafted' ">
        <template slot-scope="{row}">
          <el-button v-if=" row.manual_indikator_kinerja_id  == 0 "  size="medium" type="text" @click="addManualIndikatorKinerja(row)">
            <i class="el-icon-circle-plus-outline"></i>
            <md-tooltip md-direction="top">Add Manual Indikator Kinerja</md-tooltip>
          </el-button>
          
          <el-button v-if=" row.manual_indikator_kinerja_id  != 0 & row.manual_indikator_kinerja_id != 'disabled'" size="mini" type="text" @click="editManualIndikatorKinerja(row)">
            <i class="el-icon-edit-outline"></i>
            <md-tooltip md-direction="top">Edit Manual Indikator Kinerja</md-tooltip>
          </el-button>
        </template>
      </el-table-column> -->
      <!-- <el-table-column fixed="right" align="center"  label="Aksi" width="70"  v-if="statusSasaranKinerja == 'drafted' ">
        <template slot-scope="{row}" >
          <div v-if=" row.indikator_id  != '' ">
            <el-button size="medium" type="text" @click="editIndikatorKinerjaIndividu(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit Indikator Kinerja Individu</md-tooltip>
            </el-button>
            <el-button size="medium" type="text" @click="hapusIndikatorKinerjaIndividu(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Indikator Kinerja Individu</md-tooltip>
            </el-button>
          </div>
          <div v-else>
            <el-button size="medium" type="text" @click="editRencanaKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Kinerja</md-tooltip>
            </el-button>
            <el-button size="medium" type="text" @click="hapusRencanaKinerja(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus  Rencana Kinerja</md-tooltip>
            </el-button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>


    <p class="" style="margin-top: 20px">B. KINERJA TAMBAHAN</p>
    <el-table
      :data="tableDataKinerjaTambahan"
      :span-method="objectSpanMethodKinerjaTambahan"
      border
      style="width: 100%;"
      :show-header = "true">
      <el-table-column
        align="center"
        prop="no"
        label="No"
        width="45">
      </el-table-column>
      <el-table-column label="Rencana Kinerja" width="270">
        <template slot-scope="{row}">
          {{row.rencana_kinerja}}
          <i v-if=" row.indikator_id  != '' ">
            <el-button v-if="statusSasaranKinerja == 'drafted' " size="medium" type="text" @click="editRencanaKinerja(row)">
            <i class="el-icon-edit-outline"></i> Edit
            <md-tooltip md-direction="top">Edit Rencana Kinerja</md-tooltip>
            </el-button>
          </i>
        </template>
      </el-table-column>
      <el-table-column  label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="{row}">
          {{row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150">
      </el-table-column>
      <el-table-column  fixed="right" align="center" label="Manual" width="70" v-if="statusSasaranKinerja == 'drafted' ">
        <template slot-scope="{row}">
          <el-button v-if=" row.manual_indikator_kinerja_id  == 0  "  size="mini" type="text" @click="addManualIndikator(row)">
            <i class="el-icon-circle-plus-outline"></i>
            <md-tooltip md-direction="top">Add Manual Indikator Kinerja</md-tooltip>
          </el-button>
          
          <el-button v-if=" row.manual_indikator_kinerja_id  != 0 & row.manual_indikator_kinerja_id != 'disabled'" size="mini" type="text" @click="editManualIndikator(row)">
            <i class="el-icon-edit-outline"></i>
            <md-tooltip md-direction="top">Edit Manual Indikator Kinerja</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center"  label="Aksi" width="70"  v-if="statusSasaranKinerja == 'drafted' ">
        <template slot-scope="{row}" >
          <div v-if=" row.indikator_id  != '' ">
            <el-button size="medium" type="text" @click="editIndikatorKinerjaIndividu(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit Indikator Kinerja Individu</md-tooltip>
            </el-button>
            <el-button size="medium" type="text" @click="hapusIndikatorKinerjaIndividu(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Indikator Kinerja Individu</md-tooltip>
            </el-button>
          </div>
          <div v-else>
            <el-button size="medium" type="text" @click="editRencanaKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Kinerja</md-tooltip>
            </el-button>
            <el-button size="medium" type="text" @click="hapusRencanaKinerja(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus  Rencana Kinerja</md-tooltip>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>




   </card>
</template>

<script>


import IndikatorKinerjaIndividu from '~/components/Modal/IndikatorKinerjaIndividu.vue';
import RencanaKinerja from '~/components/Modal/RencanaKinerja.vue';
import ManualIndikatorKinerja from '~/components/Modal/ManualIndikatorKinerja.vue';

export default {

  middleware: ['auth'],
  components: {
    RencanaKinerja,
    ManualIndikatorKinerja,
    IndikatorKinerjaIndividu
  },
  data() {
    return {
      sasaranKinerjaId:null,
      tableDataKinerjaUtama: [],
      tableDataKinerjaTambahan: [],
      spanArrKinerjaUtama: [],
      spanArrKinerjaTambahan: [],
      positionKinerjaTambahan: null,
      positionKinerjaUtama: null,
      search: '',
      sortField: 'id',
      sortOrder: 'asc',
      statusSasaranKinerja:'drafted',
     
    }
  },
  mounted() {
    this.sasaranKinerjaId = this.$route.params.id
    this.loadData()
  },
  methods: {
      loadData(){
        this.loadAsyncDataKinerjaUtama()
        this.loadAsyncDataKinerjaTambahan()
      },
      
      loadAsyncData(){
        this.loadAsyncDataKinerjaUtama()
        this.loadAsyncDataKinerjaTambahan()
      },
      loadAsyncDataKinerjaUtama() {
        const params = [
          `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
          `jenis_rencana_kinerja=kinerja_utama`
        ].join('&')

        this.$axios
          .get(`/sasaran_kinerja_rencana_kinerja?${params}`)
          .then(({ data }) => {
            this.tableDataKinerjaUtama = []
            this.spanArrKinerjaUtama = []
            data.data.forEach((item) => {
              this.tableDataKinerjaUtama.push(item)
            }) 
            this.onMergeLinesKinerjaUtama(data.data);
          })
          .catch((error) => {
            this.tableDataKinerjaUtama = []
            throw error
          })
      },
      loadAsyncDataKinerjaTambahan() {
        const params = [
          `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
          `jenis_rencana_kinerja=kinerja_tambahan`
        ].join('&')

        this.$axios
          .get(`/sasaran_kinerja_rencana_kinerja?${params}`)
          .then(({ data }) => {
            this.tableDataKinerjaTambahan = []
            this.spanArrKinerjaTambahan = []
            data.data.forEach((item) => {
              this.tableDataKinerjaTambahan.push(item)
            }) 
            this.onMergeLinesKinerjaTambahan(data.data);
          })
          .catch((error) => {
            this.tableDataKinerjaTambahan = []
            throw error
          })
      },
      onMergeLinesKinerjaUtama(data) {
        data.forEach((item,index) => {
          if (index === 0) {
            this.spanArrKinerjaUtama.push(1);
            this.positionKinerjaUtama = 0;
          } else {
            if (
              this.tableDataKinerjaUtama[index].no ===
              this.tableDataKinerjaUtama[index - 1].no
            ) {
              this.spanArrKinerjaUtama[this.positionKinerjaUtama] += 1 ;
              this.spanArrKinerjaUtama.push(0);
            } else {
              this.spanArrKinerjaUtama.push(1);
              this.positionKinerjaUtama = index;
            }
          }
        })
      },
      onMergeLinesKinerjaTambahan(data) {
        data.forEach((item,index) => {
          if (index === 0) {
            this.spanArrKinerjaTambahan.push(1);
            this.positionKinerjaTambahan = 0;
          } else {
            if (
              this.tableDataKinerjaTambahan[index].no ===
              this.tableDataKinerjaTambahan[index - 1].no
            ) {
              this.spanArrKinerjaTambahan[this.positionKinerjaTambahan] += 1;
              this.spanArrKinerjaTambahan.push(0);
            } else {
              this.spanArrKinerjaTambahan.push(1);
              this.positionKinerjaTambahan = index;
            }
          }
        })
      },
      objectSpanMethodKinerjaUtama({ row, column, rowIndex, columnIndex }) {
        //console.log(row, column);
        
        if (columnIndex === 0 || columnIndex === 1 ) {
         
            const _row = this.spanArrKinerjaUtama[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col,
            };
          
        }
      },
       objectSpanMethodKinerjaTambahan({ row, column, rowIndex, columnIndex }) {
        //console.log(row, column);
        
        if (columnIndex === 0 || columnIndex === 1 ) {
         
            const _row = this.spanArrKinerjaTambahan[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col,
            };
          
        }
      },
      addRencanaKinerja: function(data) {
      //console.log(data)
      this.$refs.ModalRencanaKinerja.showModalAdd(this.sasaranKinerjaId);
      },
      editRencanaKinerja: function(data) {
        //console.log(data)
        this.$refs.ModalRencanaKinerja.showModalEdit(data.id);
      },
      hapusRencanaKinerja: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Hapus Rencana Kinerja', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/rencana_kinerja?id="+data.id)
            .then((resp) => {
                this.loadAsyncData()
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
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
            message: 'Proses Hapus Dibatalkan'
          });          
        });
      },
      addIndikatorKinerjaIndividu: function(data) {
      //console.log(data)
      this.$refs.ModalIndikatorKinerjaIndividu.showModalAdd(this.sasaranKinerjaId);
      },
      editIndikatorKinerjaIndividu: function(data) {
        this.$refs.ModalIndikatorKinerjaIndividu.showModalEdit(data.indikator_id);
      },
      hapusIndikatorKinerjaIndividu: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Hapus Indikator Kinerja Individu', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/indikator_kinerja_individu?id="+data.indikator_id)
            .then((resp) => {
                this.loadAsyncData()
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
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
            message: 'Proses Hapus Dibatalkan'
          });          
        });
      },


      addManualIndikatorKinerja: function(data) {
      //console.log(data)
      this.$refs.ModalManualIndikatorKinerja.showModalAdd(data.indikator_id);
      },
      editManualIndikatorKinerja: function(data) {
        //console.log(data)
        this.$refs.ModalManualIndikatorKinerja.showModalEdit(data.manual_indikator_kinerja_id);
      },
  },
}
</script>

<style lang="scss" scoped>
</style>