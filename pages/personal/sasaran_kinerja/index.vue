<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </sasaran-kinerja>

    <pejabat-penilai 
      ref="PejabatPenilaiForm" 
      @loadAsyncData="loadAsyncData"
    >
    </pejabat-penilai>

    <atasan-pejabat-penilai 
      ref="AtasanPejabatPenilaiForm" 
      @loadAsyncData="loadAsyncData"
    >
    </atasan-pejabat-penilai>


    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai ( SKP )</h4>
      <p class="card-category d-inline">Personal</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createSkp($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Sasaran Kinerja
    </md-button>

    <el-table
      :data="tableDataSkp"
      highlight-current-row
      border
      style="width: 100%;">
      <el-table-column width="75" align="center" prop="periode_tahun" label="Periode"></el-table-column>
      <el-table-column min-width="180" label="Pegawai Yang Dinilai">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="color:#130f0f;" class="">{{ row.nama_pegawai}}</span><br>
          </div>
          <div style="padding:0px !important; margin-top:-5px;">
            <span style="" class="">{{ row.nip_pegawai}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="Pejabat Penilai">
        <template slot-scope="{ row }">

          <el-button v-if="row.nama_pejabat_penilai == null" size="mini" type="text" @click="addPejabatPenilai(row)" >
            <i class="el-icon-user"></i> Add Pejabat Penilai
            <md-tooltip md-direction="top">Add Pejabat Penilai</md-tooltip>
          </el-button>
          
          <div v-if="row.nama_pejabat_penilai != null" style="padding:0px !important;">
            <span style="color:#130f0f;" class="">{{ row.nama_pejabat_penilai}}</span>
            <el-button  size="medium" type="text" @click="editPejabatPenilai(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Ubah Pejabat Penilai</md-tooltip>
            </el-button>
            <br>
          </div>
          <div v-if="row.nama_pejabat_penilai != null" style="padding:0px !important; margin-top:-5px;">
            <span style="" class="">{{ row.nip_pejabat_penilai}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="Atasan Pejabat Penilai">
        <template slot-scope="{ row }">

          <el-button v-if="row.nama_atasan_pejabat_penilai == null" size="mini" type="text" @click="addAtasanPejabatPenilai(row)" >
            <i class="el-icon-user"></i> Add Atasan Pejabat Penilai
            <md-tooltip md-direction="top">Add Atasan Pejabat Penilai</md-tooltip>
          </el-button>

          <div v-if="row.nama_atasan_pejabat_penilai != null" style="padding:0px !important;">
            <span style="color:#130f0f;" class="">{{ row.nama_atasan_pejabat_penilai}}</span>

            <el-button  size="medium" type="text" @click="editAtasanPejabatPenilai(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Ubah Atasan Pejabat Penilai</md-tooltip>
            </el-button>
            
            <br>
          </div>
          <div v-if="row.nama_atasan_pejabat_penilai != null" style="padding:0px !important; margin-top:-5px;">
            <span style="" class="">{{ row.nip_atasan_pejabat_penilai}}</span><br>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column   align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center">
        <template slot="header">
          <i class="el-icon-s-tools"></i>
        </template>
        <template slot-scope="{ row }">
            <el-button  size="medium" type="text" @click="viewSasaranKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Lihat Data</md-tooltip>
            </el-button>
            <el-button  size="medium" type="text" role="link" @click="cetakSasaranKinerja(row)">
              <i class="el-icon-printer"></i>
              <md-tooltip md-direction="top">Cetak SKP</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusSasaranKinerja(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Data</md-tooltip>
            </el-button>
        </template>
      </el-table-column>


    </el-table>
   
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import SasaranKinerja from '~/components/Modal/ModalSasaranKinerja.vue';
import PejabatPenilai from "~/components/Modal/ModalPejabatPenilai.vue";
import AtasanPejabatPenilai from "~/components/Modal/ModalAtasanPejabatPenilai.vue";
import { mapGetters } from 'vuex' 


export default {
  layout: "personalLayout",
  middleware: "auth",
   components: {
    PareLoader,
    SasaranKinerja,
    PejabatPenilai,
    AtasanPejabatPenilai
  },
  data() {
    return {
      tableDataSkp: [],
      search: '',
      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: 'periode_tahun',
      sortOrder: 'desc',
      page: 1,
      limit:'20',
      total:'',
      currentPage: 1,

      jenis_jabatan:'',
    };
  },
  computed: {
      ...mapGetters({
        user_id:'user_id',
      })
    },
  methods: {
    loadAsyncData() {
      const params = [
        `user_id=${this.user_id}`,
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
      //cek apakah JPT atu bukan
      //console.log(data.jenis_jabatan_skp)
      if ( data.jenis_jabatan_skp == 'JABATAN PIMPINAN TINGGI'){
        this.$router.push("/personal/sasaran_kinerja_jpt/"+data.id+"/sumary");
      }else{
        this.$router.push("/personal/sasaran_kinerja/"+data.id+"/sumary");
      }
    },
    reviewSasaranKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/personal/sasaran_kinerja_reviu/"+data.id);
    },
    createSkp: function(e) {
      this.$refs.ModalSasaranKinerja.showModal(this.skpd_id);
    },
    addPejabatPenilai: function(row){
      console.log(row)
      this.$refs.PejabatPenilaiForm.showModalAdd(row);
    },
    addAtasanPejabatPenilai: function(row){
      console.log(row)
      this.$refs.AtasanPejabatPenilaiForm.showModalAdd(row);
    },
    editPejabatPenilai: function(row){
      console.log(row)
      this.$refs.PejabatPenilaiForm.showModalEdit(row);
    },
    editAtasanPejabatPenilai: function(row){
      console.log(row)
      this.$refs.AtasanPejabatPenilaiForm.showModalEdit(row);
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
    submitSasaranKinerja: function(row) {

      const params = [
        `id=${row.id}`,
      ].join('&')

      this.$axios
        .$get(`/sasaran_kinerja?${params}`)
        .then(({ data }) => {
          
          if(data.jumlahRencanaKinerja >= 1 ){
              this.$confirm('SKP dalam status perencanaan, klik submit untuk lanjut ke proses reviu pengelola kinerja', 'Info', {
                confirmButtonText: 'Submit',
                cancelButtonText: 'Batal',
                type: 'info'
              }).then(() => {
                this.$axios
                  .$put("/submit_sasaran_kinerja?id="+data.id)
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
                  message: 'SKP harus memiliki minimal 1 Rencana Kinerja'
                });   
          }
        

        })
        .catch((error) => {
          throw error
        })
    },
    cetakSasaranKinerja(row) {

      //console.log(row.jenis_jabatan_skp)
      if(row.jenis_jabatan_skp == "JABATAN PIMPINAN TINGGI"){
        window.open('https://api-pare-v3.bkpsdm.karawangkab.go.id/cetak_skp_jpt/'+row.id, '_blank', 'noreferrer');
      }else{
        window.open('https://api-pare-v3.bkpsdm.karawangkab.go.id/cetak_skp/'+row.id, '_blank', 'noreferrer');
      }
      //http://localhost:8000
      //https://api-pare-v3.bkpsdm.karawangkab.go.id
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