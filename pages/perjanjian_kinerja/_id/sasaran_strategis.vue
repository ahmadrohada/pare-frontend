<template>
   <card style="min-height:500px;">
      <sasaran-strategis 
        ref="ModalSasaranStrategis"
        style="min-height:350px;"
        @loadAsyncData="loadAsyncData"
      >
      </sasaran-strategis>

      <indikator-sasaran-utama
        ref="ModalIndikatorSasaranStrategis"
        @loadAsyncData="loadAsyncData"
      >
      </indikator-sasaran-utama>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja</h4>
      <p class="card-category d-inline">Sasaran Strategis</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addSasaranStrategis($event)"
      value="0"
      v-if="statusPk == 'open'"
    ><i class="el-icon-plus"></i>  Sasaran Strategis
    </md-button>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addIndikatorSasaranStrategis($event)"
      value="0"
      v-if=" (tableData.length != 0)&(statusPk == 'open') "
    ><i class="el-icon-plus"></i> Indikator Kinerja Utama
    </md-button>

    <hr>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;">
      <el-table-column
        align="center"
        prop="no"
        label="No"
        width="50">
      </el-table-column>
      <el-table-column label="Sasaran Strategis" width="270">
        <template slot-scope="scope">
          {{scope.row.sasaran_strategis}}
          <i v-if=" scope.row.indikator_id  != '' ">
            <el-button v-if="statusPk == 'open' " size="mini" type="text" @click="editSasaranStrategis(scope.row)">
            <i class="el-icon-setting"></i> Edit
            <md-tooltip md-direction="top">Edit Sasaran Strategis</md-tooltip>
            </el-button>
          </i>
        </template>
      </el-table-column>
      <el-table-column  label="Indikator Kinerja Utama" min-width="320">
        <template slot-scope="scope">
          {{scope.row.indikator}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="target"
        label="Target"
        width="150">
      </el-table-column>
      <el-table-column align="center"  label="Aksi" width="160"  v-if="statusPk == 'open' ">
        <template slot-scope="scope" >
          <div v-if=" scope.row.indikator_id  != '' ">
            <el-button size="mini" type="text" @click="editIndikatorSasaranStrategis(scope.row)">
              <i class="el-icon-setting"></i> Edit
              <md-tooltip md-direction="top">Edit Indikator Kinerja Utama</md-tooltip>
            </el-button>
            <el-button size="mini" type="text danger" @click="hapusIndikatorSasaranStrategis(scope.row)">
              <i class="el-icon-delete"></i> Hapus
              <md-tooltip md-direction="top">Hapus Indikator Kinerja Utama</md-tooltip>
            </el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="text" @click="editSasaranStrategis(scope.row)">
              <i class="el-icon-setting"></i> Edit
              <md-tooltip md-direction="top">Edit  Sasaran Strategis</md-tooltip>
            </el-button>
            <el-button size="mini" type="text danger" @click="hapusSasaranStrategis(scope.row)">
              <i class="el-icon-delete"></i> Hapus
              <md-tooltip md-direction="top">Hapus  Sasaran Strategis</md-tooltip>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
   </card>
</template>

<script>

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

import IndikatorSasaranUtama from '~/components/Modal/IndikatorSasaranUtama.vue';
import SasaranStrategis from '~/components/Modal/SasaranStrategis.vue';
export default {

  middleware: ['auth'],
  layout: "perjanjianKinerjaLayout",
  components: {
    IndikatorSasaranUtama,
    SasaranStrategis,
  },
  data() {
    return {
      statusPk:'open',
      isEmpty:false,
      perjanjianKinerjaId:null,
      tableData: [],
      spanArr: [],
      search: '',
      sortField: 'id',
      sortOrder: 'asc',
    }
  },
  mounted() {
    this.perjanjianKinerjaId = this.$route.params.id
    this.detailPk()
    this.loadAsyncData()
  },
  methods: {
    detailPk() {
      const params = [
        `id=${this.perjanjianKinerjaId}`,
      ].join('&')
      this.$axios
        .get(`/perjanjian_kinerja_detail?${params}`)
        .then(({ data }) => {
          this.statusPk = data.status
         
          setTimeout(() => {
          }, 800);

        })
        .catch((error) => {
          throw error
        })

    },
    loadAsyncData() {
      const params = [
        `perjanjian_kinerja_id=${this.perjanjianKinerjaId}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        //`page=${this.page}`,
        //`take=${this.limit}`,
      ].join('&')

      
      this.$axios
        .get(`/sasaran_strategis_skpd?${params}`)
        .then(({ data }) => {
            this.tableData = []
            this.spanArr = []
            data.data.forEach((item) => {
              this.tableData.push(item)
            }) 
            this.onMergeLines(data.data);
            this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
            
          })
          .catch((error) => {
            this.tableData = []
            this.spanArr = []
            this.total = 0
            this.isEmpty = true
            throw error
          })
          
    },
    onMergeLines(data) {
        data.forEach((item,index) => {
          if (index === 0) {
            this.spanArr.push(1);
            this.position = 0;
          } else {
            if (
              this.tableData[index].no ===
              this.tableData[index - 1].no
            ) {
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row, column);
        
        if (columnIndex === 0 || columnIndex === 1 ) {
         
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col,
            };
          
        }
      },
    addSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalAdd(this.perjanjianKinerjaId);
    },
    editSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalEdit(data.id);
    },
    hapusSasaranStrategis: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Hapus Sasaran Strategis', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/sasaran_strategis?id="+data.id)
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
    addIndikatorSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalIndikatorSasaranStrategis.showModalAdd(this.perjanjianKinerjaId);
    },
    editIndikatorSasaranStrategis: function(data) {
      this.$refs.ModalIndikatorSasaranStrategis.showModalEdit(data.indikator_id);
    },
    hapusIndikatorSasaranStrategis: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Hapus Indikator Sasaran Utama', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/indikator_sasaran_strategis?id="+data.indikator_id)
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

<style lang="scss" scoped>

</style>