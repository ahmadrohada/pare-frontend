<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </sasaran-kinerja>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai ( SKP )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createRenja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create SKP
    </md-button>
    <el-table
      :data="tableDataSkp"
      highlight-current-row
      :span-method="objectSpanMethodUser"
      border
      style="width: 100%;">
      <el-table-column min-width="60" align="center" prop="periode_tahun" label="Periode"></el-table-column>
      <el-table-column min-width="130" align="center" prop="jenis_jabatan_skp" label="Jenis Jabatan SKP"></el-table-column>
      <el-table-column min-width="230" align="left" prop="nama_pegawai" label="Nama Pegawai"></el-table-column>
      <el-table-column  min-width="100" align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="90" align="center" label="Aksi">
        <template slot-scope="{ row }">
          <el-button  size="mini" type="text" @click="viewSasaranKinerja(row)">
            <i class="el-icon-setting">
            </i> Edit
            <md-tooltip md-direction="top">Edit Data</md-tooltip>
          </el-button>
          <el-button  size="mini" type="text danger" @click="hapusSasaranKinerja(row)">
            <i class="el-icon-delete">
            </i> Hapus
            <md-tooltip md-direction="top">Hapus Data</md-tooltip>
          </el-button>
        </template>
      </el-table-column>


    </el-table>
   
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import SasaranKinerja from '~/components/Modal/SasaranKinerja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    PareLoader,
    SasaranKinerja
  },
  data() {
    return {
      tableDataSkp: [],
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

      jenis_jabatan:'',
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
        `jenis_jabatan=${this.jenis_jabatan}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/sasaran_kinerja_list?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.tableDataSkp = []
          this.total = data.pagination.total
          this.page = data.pagination.current_page
          this.perPage = data.pagination.per_page
          this.totalPage = data.pagination.total_page
          this.limit = data.pagination.limit
          data.data.forEach((item) => {
            this.tableDataSkp.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          this.$refs.loader.finish() 
        })
        .catch((error) => {
          this.tableDataSkp = []
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
    viewSasaranKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/sasaran_kinerja/"+data.id);
    },
    createRenja: function(e) {
      this.$refs.ModalSasaranKinerja.showModal(this.skpd_id);
    },
    hapusSasaranKinerja: function(data) {
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Ini akan menghapus Sasaran Kinerja, Semua data akan ikut terhapus !', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/sasaran_kinerja?id="+data.id)
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