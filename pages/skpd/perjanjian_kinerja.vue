<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <create-pk 
      ref="ModalRenja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </create-pk>

    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createRenja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create Perjanjian Kinerja
    </md-button>
    <el-table
      :data="tableDataPk"
      highlight-current-row
      :span-method="objectSpanMethodUser"
      border
      style="width: 100%;">

      <el-table-column min-width="60" align="center" prop="periode" label="Periode"></el-table-column>
      <el-table-column min-width="320" align="left" prop="nama_kepala_skpd" label="Nama Kepala SKPD"></el-table-column>
      <el-table-column  min-width="120" align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180" align="left" prop="nama_admin" label="Created By"></el-table-column>
      <el-table-column min-width="90" align="center" label="Status">
        <template slot-scope="{ row }">
          <el-button v-if=" row.status == 'open' "  size="mini" type="text" @click="submitPerjanjianKinerja(row)">
            <i class="el-icon-position">
            </i> Open
            <md-tooltip md-direction="top">Klik Untuk Submit Perjanjian Kinerja</md-tooltip>
          </el-button>
          <span v-if=" row.status == 'close' ">Close</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="Aksi">
        <template slot-scope="{ row }">
          <el-button v-if=" row.status == 'open' " size="mini" type="text" @click="viewPerjanjianKinerja(row)">
            <i class="el-icon-edit-outline">
                
            </i> Edit
            <md-tooltip md-direction="top">Edit Data</md-tooltip>
          </el-button>
          <el-button v-if=" row.status == 'open' " size="mini" type="text danger" @click="hapusPerjanjianKinerja(row)">
            <i class="el-icon-delete">
                
            </i> Hapus
            <md-tooltip md-direction="top">Hapus Data</md-tooltip>
          </el-button>

          <el-button v-if=" row.status == 'close' " size="mini" type="text" @click="viewPerjanjianKinerja(row)">
            <i class="el-icon-view">
                
            </i> Lihat
            <md-tooltip md-direction="top">Lihat Data</md-tooltip>
          </el-button>
        </template>
      </el-table-column>

    </el-table>
   
      
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import CreatePk from '~/components/Modal/PerjanjianKinerja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdLayout",
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
      sortField: 'id',
      sortOrder: 'asc',
     
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
        `skpd_id=${this.skpd_id}`,
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
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    submitPerjanjianKinerja: function(data) {
     
      //cek jumlah sasaran strategis
      this.$axios
        .get(`/perjanjian_kinerja_detail?id=`+data.id)
        .then(({ data }) => {
          
          if(data.jumlahSasaranStrategis >= 1 ){
              this.$confirm('Submit Perjanjian Kinerja', 'Konfirmasi', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Batal',
                type: 'warning'
              }).then(() => {
                this.$axios
                  .$put("/submit_perjanjian_kinerja?id="+data.id)
                  .then((resp) => {
                      this.loadAsyncData()
                      this.$message({
                        type: 'success',
                        message: 'Berhasil Submit'
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
                  message: 'Proses Submit Dibatalkan'
                });          
              });
          }else{
            this.$message({
                  type: 'warning',
                  message: 'PK harus memiliki minimal 1 Sasaran Strategis'
                });   
          }
        

        })
        .catch((error) => {
          throw error
        })
    },
    viewPerjanjianKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/perjanjian_kinerja/"+data.id);
    },
    createRenja: function(e) {
      this.$refs.ModalRenja.showModal(this.skpd_id);
    },
    hapusPerjanjianKinerja: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Ini akan menghapus Perjanjian Kinerja, Semua data akan ikut terhapus !', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/perjanjian_kinerja?id="+data.id)
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
    /* notifyVue(verticalAlign, horizontalAlign, alertType, alertMessage) {
      this.$notify({
        message: alertMessage,
        timeout: 60000,
        closeOnClick:false,
        icon: 'fa fa-info',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: alertType,
      });
    } */
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