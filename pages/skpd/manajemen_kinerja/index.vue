<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
  

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Manajemen Kinerja PNS</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

   
        <el-table
          :data="tableDataPeriode"
          highlight-current-row
          border
          style="width: 100%;">

          

          <el-table-column min-width="40" align="center" prop="periode" label="Periode"></el-table-column>
          <el-table-column min-width="120" align="center" label="Perjanjian Kinerja">
            <template slot-scope="{ row }">
              <el-button  size="medium" type="text">
                <i v-if=" row.perjanjian_kinerja == true " class="el-icon-circle-check"></i>
                <i v-else class="el-icon-s-release"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column min-width="120" align="center" label="SKP JPT">
            <template slot-scope="{ row }">
              <el-button  size="medium" type="text">
                <i v-if=" row.skp_jpt == true " class="el-icon-circle-check"></i>
                <i v-else class="el-icon-s-release"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column min-width="120" align="center" label="MPH">
            <template slot-scope="{ row }">
              <el-button  size="medium" type="text">
                <i v-if=" row.mph == true " class="el-icon-circle-check"></i>
                <i v-else class="el-icon-s-release"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column min-width="120" align="center" label="Aksi">
            <template slot-scope="{ row }">
              <el-button  size="mini" type="text" @click="viewManajemenKinerja(row)">
                <i class="el-icon-data-analysis">
                </i> Lihat
                <md-tooltip md-direction="top">Lihat Data</md-tooltip>
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        



   
   
      
  </card>
</template>

<script>
import { mapGetters } from 'vuex' 
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    PareLoader,
  },
  data() {
    return {
      tableDataPeriode: [],
      search: '',
      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: 'id',
      sortOrder: 'desc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'20',
      total:'',
      currentPage: 1,
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      })
  },
  methods: {
    loadAsyncData() {
      const params = [
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
        `skpd_id=${this.skpd_id}`,
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/manajemen_kinerja_list?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.tableDataPeriode = []
          this.total = data.pagination.total
          this.currentPage = data.pagination.currentPage
          this.pageSize = data.pagination.limit

          data.data.forEach((item) => {
            this.tableDataPeriode.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 400);
        })
        .catch((error) => {
          this.$refs.loader.finish() 
          this.tableDataPeriode = []
          throw error
        })
    },
    viewManajemenKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/skpd/manajemen_kinerja/"+data.periode);
    },
  },
  mounted() {
    this.loadAsyncData()
  },
  
};
</script>
<style lang="scss" scoped>

</style>