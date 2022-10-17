<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">User List</h4>
      <p class="card-category d-inline"></p>


    

    </template>

    

      <el-input
        size="small"
        style="width:220px; float: right; padding: 3px 0"
        placeholder="Cari Nama Pegawai"
        prefix-icon="el-icon-search"
        v-model="search"
        @input="onSearch">
      </el-input>

    
      <el-table
        :data="tableDataUser"
        highlight-current-row
        :span-method="objectSpanMethodUser"
        border
        style="width: 100%;">
        <el-table-column  min-width="160" label="Nama Lengkap">
            <template slot-scope="scope">
              <div style="padding:0px !important;">
                <span style="margin-top:-6px; color:black;" class="">{{scope.row.nama_lengkap}}</span><br>
                <span style="font-size:11px; margin-top:-6px; color:#696969;" class="text-muted">{{scope.row.nip}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="60" align="center" prop="jabatan_eselon" label="Eselon"></el-table-column>
          <el-table-column min-width="250" prop="jabatan" label="Jabatan"></el-table-column>
          <el-table-column min-width="60" header-align="center" label="Is Admin">
            <template slot-scope="{ row }">
              <div class="text-center">
                <el-switch
                    v-model="row.is_admin"
                    active-color="#13ce66"
                    v-on:change="$emit('addToAdmin', row)"
                    disabled
                    >
                  </el-switch>
                  <md-tooltip md-direction="top">Admin</md-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="60" header-align="center" align="center" label="Aksi">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="viewUser(scope.row)">
                <i class="el-icon-view">
                </i> Lihat
                <md-tooltip md-direction="top">Lihat</md-tooltip>
            </el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
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
      skpdid:null,
      tableDataUser: [],

      spanArrUser: [],
      positionUser: null,


      search: '',
      

      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: '',
      sortOrder: 'asc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'15',
      total:'',
      currentPage: 1,

      kalkulasi:1,
    };
  },
  computed: {
      
      ...mapGetters({
        //skpdId:'id_skpd',
        user:'user',
      })
    },
  methods: {
  /*   formatTerm (row, col, value, index,rowIndex, columnIndex ) {
        if ( this.spanArrUser[index] === 1 ){
          return ( index+ this.kalkulasi ) + ( (this.currentPage - 1 ) * this.limit);

        }else{
          return ( index+ this.kalkulasi ) + ( (this.currentPage - 1 ) * this.limit);
          this.kalkulasi = 1 - this.spanArrUser[index]
        }

        

    }, */
    loadAsyncDataUser() {
        const params = [
          //`skpd_id=${this.skpdId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
          `page=${this.page}`,
          `take=${this.limit}`,
        ].join('&')

        this.$refs.loader.start() 
        this.$axios
          .get(`/user?${params}`)
          .then(({ data }) => {
            this.tableDataUser= []
            this.total = data.pagination.total
            this.currentPage = data.pagination.currentPage
            this.pageSize = data.pagination.limit
            
            this.spanArrUser = []
            data.data.forEach((item) => {
              this.tableDataUser.push(item)
            }) 
            this.onMergeLinesUser(data.data);

            this.$refs.loader.finish() 
      
          })
          .catch((error) => {
            this.$refs.loader.finish() 
            this.tableDataUser = []
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
              this.tableDataUser[index].id ===
              this.tableDataUser[index - 1].id
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
      this.loadAsyncDataUser()
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncDataUser()
    },
    viewUser: function(data) {
     
      this.$refs.loader.start()
      this.$router.push("/skpd/user/"+data.nip);
    }
  },
  mounted() {
    
    this.loadAsyncDataUser()
    
  },
  
};
</script>