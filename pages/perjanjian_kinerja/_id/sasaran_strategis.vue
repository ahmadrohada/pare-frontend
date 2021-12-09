<template>
   <card style="min-height:500px;">
      <sasaran-strategis 
        ref="ModalSasaranStrategis"
        style="min-height:350px;"
        @loadAsyncData="loadAsyncData"
      >
      </sasaran-strategis>

      <indikator-sasaran-strategis 
        ref="ModalIndikatorSasaranStrategis"
        @loadAsyncData="loadAsyncData"
      >
      </indikator-sasaran-strategis>

    <div class="md-toolbar-section-start">
      <template slot="header" class="d-inline">
        <h4 class="title d-inline">Perjanjian Kinerja JPT</h4>
        <p class="card-category d-inline">RENJA SKPD</p>
      </template>
    </div>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addSasaranStrategis($event)"
      value="0"
     
    ><i class="el-icon-plus"></i>  Sasaran Strategis
    </md-button>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px; margin-top:30px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addIndikatorSasaranStrategis($event)"
      value="0"
     
    ><i class="el-icon-plus"></i> Indikator Sasaran Strategis
    </md-button>

      <md-table
        v-model="data"
        highlight-current-row
        style="width: 100%"
        md-sort="label" 
        md-sort-order="asc"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell rowspan="item.row" md-label="Sasaran Strategis" md-sort-by="sasaran_strategis">
              {{ item.sasaran_strategis }}
          </md-table-cell>
          <md-table-cell md-label="Indikator" md-sort-by="indikator">{{ item.indikator }}</md-table-cell>
          <md-table-cell md-label="Target" >{{ item.target }}</md-table-cell>
          <md-table-cell md-label="Satuan" >{{ item.satuan_target }}</md-table-cell>
          <md-table-cell md-label="Aksi">
            <el-button size="mini" type="text" @click="editIndikatorSasaranStrategis(item)">
              <i class="el-icon-setting">
                <md-tooltip md-direction="top">Edit Data</md-tooltip>
              </i>
            </el-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <el-pagination
        :layout="layout"
        :hide-on-single-page="true"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        :pager-count="perPage"
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

import IndikatorSasaranStrategis from '~/components/Modal/IndikatorSasaranStrategis.vue';
import SasaranStrategis from '~/components/Modal/SasaranStrategis.vue';

export default {

  middleware: ['auth'],
  layout: "renjaLayout",
  components: {
    IndikatorSasaranStrategis,
    SasaranStrategis,
  },
  data() {
    return {
      renjaId:null,
      data: [],
      //layout: 'total, sizes, prev, pager, next',
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
      perPage: '',
      totalPage:'',
      isPaginated: true,
      limit:'5'
    }
  },
  mounted() {
    this.renjaId = this.$route.params.id
    this.loadAsyncData()
  },
  methods: {
    loadAsyncData() {
      const params = [
        `renja_id=${this.renjaId}`,
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
    },
    addSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalAdd(this.renjaId);
    },
    editSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalEdit();
    },
    addIndikatorSasaranStrategis: function(data) {
      //console.log(data)
      this.$refs.ModalIndikatorSasaranStrategis.showModalAdd(this.renjaId);
    },
    editIndikatorSasaranStrategis: function(data) {
      this.$refs.ModalIndikatorSasaranStrategis.showModalEdit();
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