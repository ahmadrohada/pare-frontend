<template>
   <card style="min-height:500px;">
      <!-- <sasaran-strategis-list
        ref="ModalSasaranStrategisList"
        style="min-height:350px;"
        @loadAsyncData="loadAsyncData"
      >
      </sasaran-strategis-list> -->

      <!-- <indikator-sasaran-strategis 
        ref="ModalIndikatorSasaranStrategis"
        @loadAsyncData="loadAsyncData"
      >
      </indikator-sasaran-strategis> -->

    <div class="md-toolbar-section-start">
      <template slot="header" class="d-inline">
        <h4 class="title d-inline">SKP Tahunan JPT</h4>
        <p class="card-category d-inline">Kegiatan</p>
      </template>
    </div>

<!--     <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addSasaranStrategis($event)"
      value="0"
     
    ><i class="el-icon-plus"></i>  Sasaran Strategis
    </md-button> -->

  
      <md-table
        v-model="data"
        highlight-current-row
        style="width: 100%"
        md-sort="label" 
        md-sort-order="asc"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">

          <md-table-cell v-if=" item.primary == 1 " md-label="Rencana Kinerja" md-sort-by="sasaran_strategis">
              {{ item.sasaran_strategis }}
              <!-- <i v-if=" item.indikator_id  != '' ">
                <el-button size="mini" type="text" @click="editSasaranStrategis(item)">
                  <i class="el-icon-setting"></i> Edit
                  <md-tooltip md-direction="top">Edit Sasaran</md-tooltip>
                </el-button>
              </i> -->
          </md-table-cell>
          <md-table-cell style="border-top:none !important;"v-if=" item.primary == 0 " md-label="Rencana Kinerja" md-sort-by="sasaran_strategis">
              
          </md-table-cell>
          
          <md-table-cell md-label="Indikator Kinerja Individu">{{ item.indikator }}</md-table-cell>
          <md-table-cell md-label="Target" >{{ item.target }} {{ item.satuan_target }}</md-table-cell>
          <!-- <md-table-cell md-label="Aksi">
            <div v-if=" item.indikator_id  != '' ">
              <el-button size="mini" type="text" @click="editIndikatorSasaranStrategis(item)">
                <i class="el-icon-setting"></i> Edit
                <md-tooltip md-direction="top">Edit Indikator Sasaran</md-tooltip>
              </el-button>
              <el-button size="mini" type="text danger" @click="hapusIndikatorSasaranStrategis(item)">
                <i class="el-icon-delete"></i> Hapus
                <md-tooltip md-direction="top">Hapus Indikator Sasaran</md-tooltip>
              </el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="text" @click="editSasaranStrategis(item)">
                <i class="el-icon-setting"></i> Edit
                <md-tooltip md-direction="top">Edit  Sasaran</md-tooltip>
              </el-button>
              <el-button size="mini" type="text danger" @click="hapusSasaranStrategis(item)">
                <i class="el-icon-delete"></i> Hapus
                <md-tooltip md-direction="top">Hapus  Sasaran</md-tooltip>
              </el-button>
            </div>
          </md-table-cell> -->
        </md-table-row>
      </md-table>
      <el-pagination
        :layout="layout"
        :hide-on-single-page="true"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        :total="total"
      /> 
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

import SasaranStrategisList from '~/components/Modal/SasaranStrategisList.vue';

export default {

  middleware: ['auth'],
  layout: "sasaranKinerjaJptPersonalLayout",
  components: {
    SasaranStrategisList,
  },
  data() {
    return {
      sasaranKinerjaId:null,
      skpdId:null,
      data: [],
      //layout: 'total, sizes, prev, pager, next',
      layout: '',
      loading: false,
      search: '',
      sortField: 'id',
      sortOrder: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      isNarrowed: true,
      isStriped: true,
      isEmpty: true,
      hasMobileCards: true,
      defaultSortOrder: 'asc',
      page: 1,
      perPage: 1,
      totalPage:0,
      total:0,
      isPaginated: true,
      limit:5
    }
  },
  mounted() {
    this.sasaranKinerjaId = this.$route.params.id
    this.loadAsyncData()
  },
  methods: {
    loadAsyncData() {
      const params = [
        `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join('&')

      this.loading = true
      this.$axios
        .get(`/sasaran_kinerja_rencana_kinerja?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.data = []
          this.total = data.pagination.total
          this.page = data.pagination.current_page
          this.perPage = data.pagination.per_page
          this.totalPage = data.pagination.total_page
          this.limit = data.pagination.limit
          data.data.forEach((item) => {
            this.data.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          this.loading = false
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.loading = false
          this.isEmpty = true
          throw error
        })
    },
    addSasaranStrategis: function(data) {
      console.log(data)
      this.PkId = 27 ;
      this.$refs.ModalSasaranStrategisList.showModalAdd(this.pkId);
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
      this.$refs.ModalIndikatorSasaranStrategis.showModalAdd(this.renjaId);
    },
    editIndikatorSasaranStrategis: function(data) {
      this.$refs.ModalIndikatorSasaranStrategis.showModalEdit(data.indikator_id);
    },
    hapusIndikatorSasaranStrategis: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Hapus Indikator Sasaran Strategis', 'Konfirmasi', {
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
    handleSizeChange(value) {
      //alert(value)
      this.limit = value
      this.loadAsyncData()
    },
     onPageChange(value) {
      //alert(value)
      this.page = value
      this.loadAsyncData()
    },
  },
}
</script>

<style lang="scss" scoped>


  .md-table + .md-table {
    margin-top: 10px
  }
</style>