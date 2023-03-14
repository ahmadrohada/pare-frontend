<template>
   <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>

     
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Rencana Aksi</h4>
      <p class="card-category d-inline"></p>
    </template>

    
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
      <el-table-column label="Rencana Hasil Kerja" width="290">
        <template slot-scope="{row}">
          {{row.rencana_kerja}}
        </template>
      </el-table-column>
      <el-table-column  
        label="Rencana Aksi" 
        min-width="120"
        >
        <template slot-scope="{row}">
          {{row.label}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="bulan"
        label="Pelaksanaan ( Bulan )"
        width="170">
      </el-table-column>
      <el-table-column class-name="align-top" fixed="right" align="center"  label="Aksi" width="70">
        <template slot-scope="{row}" >
          
            <el-button size="medium" type="text" >
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Aksi</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus  Rencana Aksi</md-tooltip>
            </el-button>
         
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="total >= 1"
      :layout="layout"
      @current-change="onPageChange"
      @size-change="handleSizeChange"
      :page-sizes="[15]"
      :page-size="pageSize"
      :total="total"
    />

   </card>
</template>

<script>

import PareLoader from '~/components/Loader/PareLoader.vue';
import IndikatorKinerjaIndividu from '~/components/Modal/IndikatorKinerjaIndividu.vue';
import MatriksRencanaKinerja from '~/components/Modal/ModalMatriksRencanaKinerja.vue';
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
    MatriksRencanaKinerja,
    PareLoader
  },
  data() {
    return {
      sasaranKinerjaId:null,
      skpJabatanPegawaiId:null,
      skpNipPegawaiYangDinilai:null,
      skpPeriode:null,
      jenisJabatanSkp:null,
      tableDataKinerjaUtama: [],
      tableDataKinerjaTambahan: [],
      spanArrKinerjaUtama: [],
      spanArrKinerjaTambahan: [],
      positionKinerjaTambahan: null,
      positionKinerjaUtama: null,
      statusSasaranKinerja:'drafted',

      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: 'created_at',
      sortOrder: 'desc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'20',
      total:'',
      currentPage: 1,
     
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

            //console.log(data.periodePenilaian.tahun)

            this.skpJabatanPegawaiId = data.pegawaiYangDinilai.jabatan_id
            this.skpNipPegawaiYangDinilai = data.pegawaiYangDinilai.nip
            this.skpPeriode = data.periodePenilaian.tahun
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
        //this.loadAsyncDataKinerjaUtama()
        //this.loadAsyncDataKinerjaTambahan()
        this.loadAsyncDataRencanaAksi()
      },
      loadAsyncDataRencanaAksi() {
        const params = [
          `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
        ].join('&')

        this.$axios
          .get(`/sasaran_kinerja_rencana_aksi?${params}`)
          .then(({ data }) => {
            this.tableDataKinerjaUtama = []
            this.spanArrKinerjaUtama = []
            data.data.forEach((item) => {
              this.tableDataKinerjaUtama.push(item)
            }) 
            this.onMergeLinesKinerjaUtama(data.data);
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 800);
          })
          .catch((error) => {
            this.tableDataKinerjaUtama = []
            throw error
          })
      },
      /* loadAsyncDataKinerjaUtama() {
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
      }, */
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
      matriksRencanaKinerja: function(data) {
        this.$refs.ModalMatriksRencanaKinerja.showModal(this.skpNipPegawaiYangDinilai,this.skpPeriode,this.sasaranKinerjaId);
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
      editRencanaHasilKerjaPimpinan: function(data){
        console.log(data.id)
        this.$refs.ModalRencanaHasilKerjaPimpinan.showModalEdit(this.sasaranKinerjaId,data.id);
      },
      addIndikatorKinerjaIndividu: function(data) {
      //console.log(data)
      //this.$refs.ModalIndikatorKinerjaIndividu.opsi(this.jenisJabatanSkp);
      this.$refs.ModalIndikatorKinerjaIndividu.showModalAdd(this.sasaranKinerjaId);
      },
      editIndikatorKinerjaIndividu: function(data) {
        this.$refs.ModalIndikatorKinerjaIndividu.showModalEdit(data.indikator_id);
      },
      addManualIndikatorKinerja: function(data) {
      //console.log(data)
      this.$refs.ModalManualIndikatorKinerja.showModalAdd(data.indikator_id);
      },
      editManualIndikatorKinerja: function(data) {
        //console.log(data)
        this.$refs.ModalManualIndikatorKinerja.showModalEdit(data.manual_indikator_kinerja_id);
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
     
  },
}
</script>

<style>
  .el-table .cell {
    word-break: normal !important;
  }
</style>