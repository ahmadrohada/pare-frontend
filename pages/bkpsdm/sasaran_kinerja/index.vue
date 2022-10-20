<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <sasaran-kinerja
      ref="ModalSasaranKinerja"
      @loadAsyncData="loadAsyncData"
    >
    </sasaran-kinerja>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai ( SKP )</h4>
      <!-- <p class="card-category d-inline">{{user.skpd.singkatan}}</p> -->
    </template>

    <!-- <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createSasaranKinerja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create SKP
    </md-button> -->

    <el-input
        size="small"
        style="width:220px; float: right; padding: 3px 0"
        placeholder="Cari Nama Pegawai atau Jenis Jabatan"
        prefix-icon="el-icon-search"
        v-model="search"
        @input="onSearch">
    </el-input>


    <el-table
      :data="tableDataSkp"
      highlight-current-row
      border
      style="width: 100%;">
      <el-table-column min-width="60" align="center" prop="periode_tahun" label="Periode"></el-table-column>
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

      <el-table-column min-width="250" label="Jabatan dan Instansi">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="color:#130f0f;" class="">{{ row.jabatan_pegawai}}</span><br>
          </div>
          <div style="padding:0px !important; margin-top:-5px;">
            <span style="" class="">{{ row.skpd}}</span><br>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column  min-width="100" align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="80" align="center">
        <template slot="header">
          <i class="el-icon-s-tools"></i>
        </template>
        <template slot-scope="{ row }">
            <el-button  size="medium" type="text" @click="viewSasaranKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Lihat SKP</md-tooltip>
            </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column  min-width="100" align="center" label="Status">
        <template slot-scope="{ row }">
         
          <el-button v-if=" row.status == '1' "  size="mini" type="text" @click="submitSasaranKinerja(row)">
            <i class="el-icon-edit-outline">
            </i> Perencanaan
            <md-tooltip md-direction="top">Klik Untuk Submit Sasaran Kinerja</md-tooltip>
          </el-button>
          
          <span v-if=" row.status == '2' " class="text-info">
            Submited
          </span>
          <span v-if=" row.status == '3' " class="text-info">
            Proses Reviu
          </span>
          <el-button v-if=" row.status == '4' "  size="mini" type="text">
            <i class="el-icon-position">
            </i> Ditetapkan
            <md-tooltip md-direction="top">Klik Untuk Submit Perjanjian Kinerja</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="90" align="center" label="Aksi">
        <template slot-scope="{ row }">
          <div v-if=" row.status == '1' ">
            <el-button  size="mini" type="text" @click="viewSasaranKinerja(row)">
              <i class="el-icon-edit-outline">
              </i> Edit
              <md-tooltip md-direction="top">Edit Data</md-tooltip>
            </el-button>
            <el-button  size="mini" type="text danger" @click="hapusSasaranKinerja(row)">
              <i class="el-icon-delete">
              </i> Hapus
              <md-tooltip md-direction="top">Hapus Data</md-tooltip>
            </el-button>
          </div>

          <div v-if=" row.status == '2' ">
            <el-button  size="mini" type="text" @click="reviuSasaranKinerja(row)">
              <i class="el-icon-edit-outline">
              </i> Reviu
              <md-tooltip md-direction="top">Reviu SKP</md-tooltip>
            </el-button>
          </div>
          <div v-if=" row.status == '3' ">
            <el-button  size="mini" type="text" @click="editReviuSasaranKinerja(row)">
              <i class="el-icon-edit-outline">
              </i> Edit Reviu
              <md-tooltip md-direction="top">Reviu SKP</md-tooltip>
            </el-button>
          </div>

          <div v-if=" row.status == '4' ">
            <el-button  size="mini" type="text" @click="viewSasaranKinerja(row)">
              <i class="el-icon-view">
              </i> Lihat
              <md-tooltip md-direction="top">Lihat Data</md-tooltip>
            </el-button>
          </div>
          
        </template>
      </el-table-column> -->


    </el-table>
     <el-pagination
        :layout="layout"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        :total="total"
      />
   
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import SasaranKinerja from '~/components/Modal/SasaranKinerja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "bkpsdmLayout",
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
      sortOrder: 'desc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'20',
      total:0,
      currentPage: 1,
      pageSize:0,

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
        //`skpd_id=${this.skpd_id}`,
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
          this.currentPage = data.pagination.currentPage
          this.pageSize = data.pagination.limit

          data.data.forEach((item) => {
            this.tableDataSkp.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 400);
          
        })
        .catch((error) => {
          this.tableDataSkp = []
          this.total = 0
          this.loading = false
          this.isEmpty = true
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
    handleSizeChange(page) {
      
    },
    viewSasaranKinerja: function (data) {
      this.$refs.loader.start();
      this.$router.push("/bkpsdm/sasaran_kinerja/" + data.id );
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