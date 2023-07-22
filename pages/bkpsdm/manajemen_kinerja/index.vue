<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja List</h4>
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
        :data="tableDataPK"
        highlight-current-row
        :span-method="objectSpanMethodUser"
        border
        style="width: 100%;">
        <el-table-column min-width="60" align="center" prop="periode" label="Periode"></el-table-column>
        <el-table-column  min-width="360" label="SKPD">
            <template slot-scope="scope">

              <div>
                <div style="padding:0px !important;">
                  <span style="" class="">{{scope.row.nama_skpd}}</span>
                </div>
              </div>


            </template>
        </el-table-column> 
        <el-table-column min-width="60" header-align="center" label="Status">
            <template slot-scope="scope">
              <div class="text-center">
                <el-switch
                    v-model="scope.row.is_open"
                    active-color="#13ce66"
                    v-on:change="setStatus(scope.row)"
                    >
                  </el-switch>
                  <md-tooltip md-direction="top">Open/Close</md-tooltip>
              </div>
            </template>
          </el-table-column>
        
        <el-table-column min-width="75" header-align="center" align="center" label="Created at">
          <template slot-scope="{ row }">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY HH:mm')}}</span><br>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="60" header-align="center" align="center" label="Aksi">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="viewManajemenKinerja(scope.row)">
              <i class="el-icon-view">
              </i> Lihat
              <md-tooltip md-direction="top">Lihat</md-tooltip>
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
import { mapGetters } from 'vuex'

export default {
  layout: "bkpsdmLayout",
  middleware: "auth",
   components: {
    PareLoader
  },
  data() {
    return {
      tableDataPK: [],

      spanArrUser: [],
      positionUser: null,

      namaSkpd:'',
    
      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: 'created_at',
      sortOrder: 'desc',
     
      defaultSortOrder: 'desc',
      page: 1,
      limit:'30',
      total:0,
      currentPage: 1,
      pageSize:0,

      kalkulasi:1,
    };
  },
  computed: {
      
      ...mapGetters({
        skpdId:'id_skpd',
        user:'user',
      })
    },
  methods: {
    loadAsyncDataPK() {
        const params = [
          
          `nama_skpd=${this.namaSkpd}`,
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
            this.tableDataPK= []
            this.total = data.pagination.total
            this.currentPage = data.pagination.currentPage
            this.pageSize = data.pagination.limit
            
            this.spanArrUser = []
            data.data.forEach((item) => {
              this.tableDataPK.push(item)
            }) 
            this.onMergeLinesUser(data.data);

            this.$refs.loader.finish() 
      
          })
          .catch((error) => {
            this.$refs.loader.finish() 
            this.tableDataPK = []
            throw error
          })
    },
     onMergeLinesUser(data) {
        console.log(data);
        
        data.forEach((item,index) => {
          if (index === 0) {
            this.spanArrUser.push(1);
            this.positionUser = 0;
          } else {
            if (
              this.tableDataPK[index].id ===
              this.tableDataPK[index - 1].id
            ) {
              this.spanArrUser[this.positionUser] += 1;
              this.spanArrUser.push(0);
            } else {
              this.spanArrUser.push(1);
              this.positionUser = index;
            }
          }
        })
      },
    objectSpanMethodUser({ row, column, rowIndex, columnIndex }) {      
        if ( ( columnIndex === 0 )||(columnIndex === 3)||(columnIndex === 4)) {
         
            const _row = this.spanArrUser[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col,
            };
          
        }
    },
    onSearch(value) {
      this.search = value
      this.page = null
      this.loadAsyncDataPK()
    },

    onPageChange(page) {
      this.page = page
      this.loadAsyncDataPK() 
    },
    handleSizeChange(page) {
      
    },
    viewManajemenKinerja: function(data) {
     
      this.$refs.loader.start()
      this.$router.push("/bkpsdm/manajemen_kinerja/"+data.periode+"/"+data.skpd_id);
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
    
    this.loadAsyncDataPK()
    
  },
  
};
</script>