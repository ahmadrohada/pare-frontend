<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <create-pk 
      ref="ModalRenja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </create-pk>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja</h4>
      <p class="card-category d-inline"></p>
    </template>

    <el-input
        size="small"
        style="width:250px; float: right; padding: 3px 2px;"
        placeholder="Nama SKPD"
        prefix-icon="el-icon-search"
        v-model="search"
        @input="onSearch"
        clearable>
      </el-input>

    <el-table
      :data="tableDataPk"
      highlight-current-row
      :span-method="objectSpanMethodUser"
      border
      style="width: 100%;">

      <el-table-column min-width="60" align="center" prop="periode_tahun" label="Periode"></el-table-column>
      <el-table-column min-width="190" align="left" prop="nama_skpd" label="Nama SKPD"></el-table-column>
      <el-table-column min-width="190" align="left" prop="nama_kepala_skpd" label="Kepala SKPD"></el-table-column>
      <el-table-column min-width="180" align="left" prop="nama_admin" label="Admin SKPD"></el-table-column>
      <el-table-column min-width="52" header-align="center" label="Draft">
        <template slot-scope="scope">
          <div class="text-center">
            <el-switch
              v-model="scope.row.is_open"
              active-color="#13ce66"
              v-on:change="setStatus(scope.row)"
            >
            </el-switch>
            <md-tooltip md-direction="top">Close/Open</md-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column  min-width="100" align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY HH:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="60" align="center" label="Aksi">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="viewPerjanjianKinerja(row)">
            <i class="el-icon-view"></i>
            <md-tooltip md-direction="top">Lihat Data</md-tooltip>
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
import PareLoader from "~/components/Loader/PareLoader.vue";
import CreatePk from '~/components/Modal/ModalPerjanjianKinerja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    PareLoader,
    CreatePk
  },
  data() {
    return {
      tableDataPk: [],
      search: '',
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
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/perjanjian_kinerja?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.tableDataPk = []
          this.total = data.pagination.total
          this.currentPage = data.pagination.currentPage
          this.pageSize = data.pagination.limit

          data.data.forEach((item) => {
            this.tableDataPk.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 400);
        })
        .catch((error) => {
          this.$refs.loader.finish() 
          this.tableDataPk = []
          throw error
        })
    },
    onSearch(value) {
      this.search = value
      this.page = null
      this.loadAsyncData()
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    viewPerjanjianKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/bkpsdm/perjanjian_kinerja/"+data.id);
    },
    setStatus: function(data){
      //console.log(data)
      this.$axios
        .$put("/update_pk_status", data )
          .then((response) => {

          setTimeout(() => {
                        
          }, 200);
          })
          .catch((errors) => {
            console.log(errors);
        });
    },
  },
  mounted() {
    this.loadAsyncData()
  },
  
};
</script>
<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 10px
  }
</style>