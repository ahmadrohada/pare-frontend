<template>
   <card style="min-height:500px;">

    <manual-indikator-kinerja
      ref="ModalManualIndikatorKinerja"
      @loadAsyncData="loadAsyncData"
    >
    </manual-indikator-kinerja>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Reviu Sasaran Kinerja</h4>
      <p class="card-category d-inline">Rencana Kinerja</p>
    </template>

    
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
        <template slot-scope="scope">
          {{scope.row.rencana_kinerja}}
        </template>
      </el-table-column>
      <el-table-column  label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="scope">
          {{scope.row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150">
      </el-table-column>
      <el-table-column align="center" label="Manual" width="70" >
        <template slot-scope="{row}">
          <el-button v-if=" row.manual_indikator_kinerja_id  != 0 & row.manual_indikator_kinerja_id != 'disabled'" size="mini" type="text" @click="lihatManualIndikatorKinerja(row)">
            <i class="el-icon-view"></i>
            <md-tooltip md-direction="top">Lihat Manual Indikator Kinerja</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="Reviu Pengelola Kinerja" width="260" >
        <template slot-scope="{row}" >
         
        </template>
      </el-table-column>
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
        <template slot-scope="scope">
          {{scope.row.rencana_kinerja}}
        </template>
      </el-table-column>
      <el-table-column  label="Indikator Kinerja Individu" min-width="320">
        <template slot-scope="scope">
          {{scope.row.indikator_kinerja_individu}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150">
      </el-table-column>
      <el-table-column align="center" label="Manual" width="70" >
        <template slot-scope="{row}">
          <el-button v-if=" row.manual_indikator_kinerja_id  != 0 & row.manual_indikator_kinerja_id != 'disabled'" size="mini" type="text" @click="lihatManualIndikatorKinerja(row)">
            <i class="el-icon-eye"></i>
            <md-tooltip md-direction="top">Lihat Manual Indikator Kinerja</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="Reviu Pengelola Kinerja" width="260" >
        <template slot-scope="{row}" >
         
        </template>
      </el-table-column>
    </el-table>




   </card>
</template>

<script>

import ManualIndikatorKinerja from '~/components/Modal/ManualIndikatorKinerjaDetail.vue';

export default {

  middleware: ['auth'],
  layout: "sasaranKinerjaReviuLayout",
  components: {
    ManualIndikatorKinerja
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
    this.loadAsyncData()
     
    
  },
  methods: {
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

        this.loading = true
        this.$axios
          .get(`/sasaran_kinerja_rencana_kinerja?${params}`)
          .then(({ data }) => {
            this.tableDataKinerjaUtama = []
            this.spanArrKinerjaUtama = []
            data.data.forEach((item) => {
              this.tableDataKinerjaUtama.push(item)
            }) 
            this.onMergeLinesKinerjaUtama(data.data);
            this.loading = false
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

        this.loading = true
        this.$axios
          .get(`/sasaran_kinerja_rencana_kinerja?${params}`)
          .then(({ data }) => {
            this.tableDataKinerjaTambahan = []
            this.spanArrKinerjaTambahan = []
            data.data.forEach((item) => {
              this.tableDataKinerjaTambahan.push(item)
            }) 
            this.onMergeLinesKinerjaTambahan(data.data);
            this.loading = false
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
      lihatManualIndikatorKinerja: function(data) {
        //console.log(data)
        this.$refs.ModalManualIndikatorKinerja.showModalDetail(data.manual_indikator_kinerja_id);
        //this.$router.push(`/sasaran_kinerja_reviu/${data.manual_indikator_kinerja_id}/manual_indikator`);
      }
     
  },
}
</script>

<style>
.modal-dialog_x {
    max-width: 900px !important;
}

</style>


<style lang="scss" scoped>

</style>