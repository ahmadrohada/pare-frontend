<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">USER LIST</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>
    
      <el-table
        :data="tableDataUser"
        highlight-current-row
        border
        style="width: 100%;">
       <!--  <el-table-column
          label="No"
          type="index"
          width="45"
          align="center"
          :index="indexMethod">

        </el-table-column> -->
        <el-table-column  min-width="160" label="NAMA USER">
            <template slot-scope="scope">
              <div style="padding:0px !important;">
                <span style="margin-top:-6px; color:black;" class="">{{scope.row.nama_lengkap}}</span><br>
                <span style="font-size:11px; margin-top:-6px; color:#696969;" class="text-muted">{{scope.row.nip}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="60" align="center" prop="jabatan_eselon" label="ESELON"></el-table-column>
          <el-table-column min-width="250" prop="jabatan" label="JABATAN"></el-table-column>
          <el-table-column min-width="60" header-align="right" label="Is Admin">
            <template slot-scope="{ row }">
              <div class="text-center">
                <el-tooltip content="admin SKPD" :open-delay="300" placement="top">
                  <el-switch
                    v-model="row.is_admin"
                    active-color="#13ce66"
                    v-on:change="$emit('addToAdmin', row)"
                    disabled
                    >
                  </el-switch>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="60" header-align="center" label="Actions">
            <template slot-scope="{ row }">
              <div class="text-center">
                <el-tooltip content="detail" :open-delay="300" placement="top">
                  <base-button
                    type="info"
                    size="sm"
                    icon
                    v-on:click="$emit('viewUser', row)"
                  >
                    <i class="tim-icons icon-single-02"></i>
                  </base-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        :layout="layout"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
      />
  </card>
</template>

<script>

import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from 'vuex'

export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    PareLoader
  },
  data() {
    return {
      skpdid:null,
      tableDataUser: [],
      

      //pagination
      layout: ' prev, next',
      search: '',
      sortField: 'id',
      sortOrder: 'asc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'10',
      total:'',
      currentPage: 1,
    };
  },
  computed: {
      
      ...mapGetters({
        skpdId:'id_skpd',
        user:'user',
      })
    },
  methods: {
    indexMethod(index) {
        return ( index+1 ) + ( (this.currentPage - 1 ) * this.limit);
    },
    loadAsyncDataUser() {
        const params = [
          `skpd_id=${this.skpdId}`,
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
            

            data.data.forEach((item) => {
              this.tableDataUser.push(item)
            }) 

            this.$refs.loader.finish() 
      
          })
          .catch((error) => {
            this.$refs.loader.finish() 
            this.tableDataUser = []
            throw error
          })
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncDataUser()
    },
    viewUser: function(data) {
      //alert(data.id);
      this.$refs.loader.start()
      this.$router.push("/skpd/user/"+data.nip);
    },
  },
  mounted() {
    
    this.loadAsyncDataUser()
    
  },
  
};
</script>