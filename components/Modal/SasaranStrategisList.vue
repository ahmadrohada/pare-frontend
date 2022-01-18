<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Sasaran Strategis SKPD</h4>
    </template>
    <md-table
        v-model="data"
        highlight-current-row
        style="width: 100%"
        md-sort="label" 
        md-sort-order="asc"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">

          <md-table-cell v-if=" item.primary == 1 " md-label="Sasaran Strategis" md-sort-by="sasaran_strategis">
              {{ item.sasaran_strategis }}
              <i v-if=" item.indikator_id  != '' ">
              <el-button size="mini" type="text" @click="editSasaranStrategis(item)">
                <i class="el-icon-setting"></i> Edit
                <md-tooltip md-direction="top">Edit Sasaran</md-tooltip>
              </el-button>
            </i>
          </md-table-cell>
          <md-table-cell style="border-top:none !important;"v-if=" item.primary == 0 " md-label="Sasaran Strategis" md-sort-by="sasaran_strategis">
              
          </md-table-cell>
          
          <md-table-cell md-label="Indikator">{{ item.indikator }}</md-table-cell>
          <md-table-cell md-label="Target" >{{ item.target }}</md-table-cell>
          <md-table-cell md-label="Satuan" >{{ item.satuan_target }}</md-table-cell>
          <md-table-cell md-label="Aksi">
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
          </md-table-cell>
        </md-table-row>
      </md-table>
      



    <template slot="footer"> 


    </template>
  </modal>
</template>

<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  components:{
    PareLoader,
  },
  data() {
    return {
      skpId:null,
      data: [],
      layout: 'prev, next',
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
  methods: {
    
    showModalAdd(pkId) {
      const params = [
        `sasaran_kinerja_id=${this.skpId}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join('&')

      this.loading = true
      this.$axios
        .get(`/sasaran_strategis_skpd?${params}`)
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
      

      this.modalFormVisible = true;
    },  
  },
  mounted() {
      
  }
};
</script>
<style>


.modal .modal-header .close {
    visibility: hidden;
}
</style>