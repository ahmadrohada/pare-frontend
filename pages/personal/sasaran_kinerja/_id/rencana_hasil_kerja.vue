<template>
   <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>

     <rencana-kinerja 
        ref="ModalRencanaKinerja"
        style="min-height:350px;"
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

      <rencana-hasil-kerja-pimpinan
        ref="ModalRencanaHasilKerjaPimpinan"
        @loadAsyncData="loadAsyncData"
      >
      </rencana-hasil-kerja-pimpinan>
      


    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja</h4>
      <p class="card-category d-inline">Perencanaan Hasil Kerja</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addRencanaKinerja($event)"
      value="0"
      v-if="statusSasaranKinerja == 'drafted'"
    ><i class="el-icon-plus"></i>  Rencana Hasil Kerja
    </md-button>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addIndikatorKinerjaIndividu($event)"
      value="0"
      v-if=" statusSasaranKinerja == 'drafted'"
    ><i class="el-icon-plus"></i> Indikator Kinerja Individu
    </md-button>

    <hr>


    <p class="" style="margin-top: 20px">A. UTAMA</p>
    <el-table
      :data="tableDataKinerjaUtama"
      :span-method="objectSpanMethodKinerjaUtama"
      border
      style="width: 100%;">
      <el-table-column
        align="center"
        prop="no"
        label="No"
        width="45"
        class-name="align-top"
        >
      </el-table-column>
      <el-table-column  
            v-if="(this.jenisJabatanSkp != 'JABATAN PIMPINAN TINGGI')"
            label="Rencana Hasil Kerja Pimpinan yang Diintervensi" 
            width="290">
        <template slot-scope="{row}">
          {{row.parent_label}}
          <i v-if=" row.parent_id  == null ">
            <el-button  size="mini" type="text" @click="addRencanaHasilKerjaPimpinan(row)">
            <i class="el-icon-document-copy"></i> Pilih Rencana Hasil Kerja Pimpinan
            <md-tooltip md-direction="top">Rencana Hasil Kerja Pimpinan yang diintervensi</md-tooltip>
            </el-button>
          </i>
        </template>
      </el-table-column>
      <el-table-column label="Rencana Hasil Kerja" width="290">
        <template slot-scope="{row}">
          {{row.rencana_kinerja}}
          <i v-if=" row.indikator_id  != '' ">
            <el-button v-if="statusSasaranKinerja == 'drafted' " size="mini" type="text" @click="editRencanaKinerja(row)">
            <i class="el-icon-edit-outline"></i> Edit
            <md-tooltip md-direction="top">Edit Rencana Hasil Kerja</md-tooltip>
            </el-button>
          </i>
        </template>
      </el-table-column>
      <el-table-column  
        label="Aspek" 
        min-width="120"
        v-if="(this.jenisJabatanSkp != 'JABATAN PIMPINAN TINGGI')"
        >
        <template slot-scope="{row}">
          {{row.aspek}}
        </template>
      </el-table-column>
      <el-table-column class-name="align-top" label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="{row}">
          {{row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150"
        class-name="align-top">
      </el-table-column>
      <el-table-column
        align="center"
        prop="perspektif"
        label="Perspektif"
        width="150"
        class-name="align-top"
        v-if="(this.jenisJabatanSkp == 'JABATAN PIMPINAN TINGGI')"
        >
      </el-table-column>
      <el-table-column class-name="align-top" fixed="right" align="center"  label="Aksi" width="70">
        <template slot-scope="{row}" >
          <div v-if=" row.indikator_id  != '' ">
            <el-button size="medium" type="text" @click="editIndikatorKinerjaIndividu(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit Indikator Kinerja Individu</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusIndikatorKinerjaIndividu(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Indikator Kinerja Individu</md-tooltip>
            </el-button>
          </div>
          <div v-else>
            <el-button size="medium" type="text" @click="editRencanaKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Kinerja</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusRencanaKinerja(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus  Rencana Kinerja</md-tooltip>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <p class="" style="margin-top: 20px">B. TAMBAHAN</p>
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
        width="45"
        class-name="align-top">
      </el-table-column>
      <el-table-column  
            v-if="(this.jenisJabatanSkp != 'JABATAN PIMPINAN TINGGI')"
            label="Rencana Hasil Kerja Pimpinan yang Diintervensi" 
            width="290"
            class-name="align-top">
        <template slot-scope="{row}">
          -
        </template>
      </el-table-column>
      <el-table-column class-name="align-top" label="Rencana Hasil Kerja" width="290">
        <template slot-scope="{row}">
          {{row.rencana_kinerja}}
          <i v-if=" row.indikator_id  != '' ">
            <el-button v-if="statusSasaranKinerja == 'drafted' " size="medium" type="text" @click="editRencanaKinerja(row)">
            <i class="el-icon-edit-outline"></i> Edit
            <md-tooltip md-direction="top">Edit Rencana Hasil Kerja</md-tooltip>
            </el-button>
          </i>
        </template>
      </el-table-column>
      <el-table-column  
        label="Aspek" 
        min-width="120"
        v-if="(this.jenisJabatanSkp != 'JABATAN PIMPINAN TINGGI')"
        class-name="align-top">
        <template slot-scope="{row}">
          {{row.aspek}}
        </template>
      </el-table-column>
      <el-table-column class-name="align-top" label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="{row}">
          {{row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
     <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150"
        class-name="align-top">
      </el-table-column>
      <el-table-column
        align="center"
        prop="perspektif"
        label="Perspektif"
        width="150"
        class-name="align-top"
        v-if="(this.jenisJabatanSkp == 'JABATAN PIMPINAN TINGGI')"
        >
      </el-table-column>
      <el-table-column class-name="align-top" fixed="right" align="center"  label="Aksi" width="70">
        <template slot-scope="{row}" >
          <div v-if=" row.indikator_id  != '' ">
            <el-button size="medium" type="text" @click="editIndikatorKinerjaIndividu(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit Indikator Kinerja Individu</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusIndikatorKinerjaIndividu(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Indikator Kinerja Individu</md-tooltip>
            </el-button>
          </div>
          <div v-else>
            <el-button size="medium" type="text" @click="editRencanaKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Kinerja</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusRencanaKinerja(row)">
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

import PareLoader from '~/components/Loader/PareLoader.vue';
import IndikatorKinerjaIndividu from '~/components/Modal/IndikatorKinerjaIndividu.vue';
import RencanaKinerja from '~/components/Modal/RencanaKinerja.vue';
import ManualIndikatorKinerja from '~/components/Modal/ManualIndikatorKinerja.vue';
import RencanaHasilKerjaPimpinan from '~/components/Modal/RencanaHasilKerjaPimpinan.vue';

export default {

  middleware: ['auth'],
  layout: "sasaranKinerjaPersonalLayout",
  components: {
    RencanaKinerja,
    IndikatorKinerjaIndividu,
    ManualIndikatorKinerja,
    RencanaHasilKerjaPimpinan,
    PareLoader
  },
  data() {
    return {
      sasaranKinerjaId:null,
      jenisJabatanSkp:null,
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
        loadData() {

        const params = [
          `id=${this.sasaranKinerjaId}`,
        ].join('&')
        this.$refs.loader.start() 
        this.$axios
          .$get(`/sasaran_kinerja?${params}`)
          .then(({ data }) => {

            this.jenisJabatanSkp = data.jenisJabatanSkp

            this.loadAsyncData()
            setTimeout(() => {
              //this.$refs.loader.finish() 
            }, 800);

          })
          .catch((error) => {
            throw error
          })
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
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 800);
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
        
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 ) {
         
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
      addRencanaHasilKerjaPimpinan: function(data){
        console.log(data.id)
        this.$refs.ModalRencanaHasilKerjaPimpinan.showModalAdd(this.sasaranKinerjaId,data.id);
      },
      addIndikatorKinerjaIndividu: function(data) {
      //console.log(data)
      //this.$refs.ModalIndikatorKinerjaIndividu.opsi(this.jenisJabatanSkp);
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

<style>
  .el-table .cell {
    word-break: normal !important;
  }
</style>