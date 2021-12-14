<template>
   <card style="min-height:500px;">
    
    <div class="md-toolbar-section-start">
      <template slot="header" class="d-inline">
        <h4 class="title d-inline">SKP JPT Pratama</h4>
        <p class="card-category d-inline">RENJA SKPD</p>
      </template>
    </div>


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
          <md-table-cell md-label="Indikator Kinerja Individu" md-sort-by="indikator_kinerja_individu">{{ item.indikator_kinerja_individu }}</md-table-cell>
          <md-table-cell md-label="Target" >{{ item.target }}</md-table-cell>
          <md-table-cell md-label="Satuan" >{{ item.satuan_target }}</md-table-cell>
          <md-table-cell md-label="Aksi">
            <el-button size="mini" type="text" @click="editRencanaKinerja(item)">
              <i class="el-icon-setting">
                
              </i> Setting
              <md-tooltip md-direction="top">Edit Data</md-tooltip>
            </el-button>
          </md-table-cell>
        </md-table-row>

       

      </md-table>
       <el-pagination
        :layout="layout"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="totalPage"
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


export default {

  middleware: ['auth'],
  layout: "perjanjianKinerjaLayout",
  components: {
  },
  data() {
    return {
      data: [],
      layout: ' prev, next',
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
      perPage: 0,
      totalPage:0,
      total:0,
      isPaginated: true,
      limit: 10,
      skp_id:1,
    }
  },
  mounted() {
    this.loadAsyncData()
  },
  methods: {
    loadAsyncData() {
      const params = [
        `skp_id=${this.skp_id}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join('&')

      this.loading = true
      this.$axios
        .get(`/rencana_kinerja_skp?${params}`)
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
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    editRencanaKinerja() {
      alert("dalam pengembangan")
    },
    /* editRencanaKinerja(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData()
    },
    onSearch(value) {
      this.search = value
      this.loadAsyncData()
    },*/
  },
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 10px
  }
</style>