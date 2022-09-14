<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>

    <perilaku-kerja
      ref="ModalPerilakuKerja"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </perilaku-kerja>
   
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja Pegawai ( SKP )</h4>
      <p class="card-category d-inline">Bawahan</p>
    </template>

    <el-table
      :data="tableDataSkp"
      highlight-current-row
      border
      style="width: 100%;">
      <el-table-column width="75" align="center" prop="periode_tahun" label="Periode"></el-table-column>
      <el-table-column width="220" label="Pegawai Yang Dinilai">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="color:#130f0f;" class="">{{ row.nama_pegawai}}</span><br>
          </div>
          <div style="padding:0px !important; margin-top:-5px;">
            <span style="" class="">{{ row.nip_pegawai}}</span><br>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="280" label="Rencana Kerja">
        <template slot-scope="{ row }">
          <ol style="margin-left: -22px">
            <!-- <div v-for="(data, key) in row.rencana_kerja" :key="key"> -->
              <!-- {{ data.indikator_kinerja_individu }} -->
              <li v-for="(data,key) in row.rencana_kerja" :key="key">
                {{ data.label }}
              </li>

            <!-- </div> -->
          </ol>
        </template>
      </el-table-column>
      <el-table-column min-width="80" align="center">
        <template slot="header">
          Perilaku Kerja
        </template>
        <template slot-scope="{ row }">
            <el-button  size="medium" type="text" @click="viewPerilakuKerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Lihat Perilaku Kerja</md-tooltip>
            </el-button>
        </template>
      </el-table-column>
      <el-table-column   align="center" label="Created at">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{moment(row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="70px" align="center">
        <template slot="header">
          <i class="el-icon-s-tools"></i>
        </template>
        <template slot-scope="{ row }">
            <el-button  size="medium" type="text" @click="viewSasaranKinerja(row)">
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Lihat Data</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger" @click="hapusSasaranKinerja(row)">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus Data</md-tooltip>
            </el-button>
        </template> -->
      </el-table-column>


    </el-table>
   
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import PerilakuKerja from '~/components/Modal/PerilakuKerja.vue';
import { mapGetters } from "vuex";

export default {
  layout: "personalLayout",
  middleware: "auth",
  components: {
    PareLoader,
    PerilakuKerja
  },
  data() {
    return {
      tableDataSkp: [],
      search: "",
      //pagination
      layout: " prev,  pager,next",
      search: "",
      sortField: "id",
      sortOrder: "asc",

      defaultSortOrder: "asc",
      page: 1,
      limit: "20",
      total: "",
      currentPage: 1,

      jenis_jabatan: "",
    };
  },
  computed: {
    ...mapGetters({
      user_id: "user_id",
      nip_pejabat_penilai: "nip",
    }),
  },
  methods: {
    loadAsyncData() {
      const params = [
        `nip_pejabat_penilai=${this.nip_pejabat_penilai}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join("&");

      this.$refs.loader.start();
      this.$axios
        .get(`/sasaran_kinerja_bawahan_list?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.tableDataSkp = [];
          this.total = data.pagination.total;
          this.page = data.pagination.current_page;
          this.perPage = data.pagination.per_page;
          this.totalPage = data.pagination.total_page;
          this.limit = data.pagination.limit;
          data.data.forEach((item) => {
            this.tableDataSkp.push(item);
          });
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
          this.$refs.loader.finish();
        })
        .catch((error) => {
          this.tableDataSkp = [];
          this.total = 0;
          this.loading = false;
          this.isEmpty = true;
          throw error;
        });
    },
    onPageChange(page) {
      this.page = page;
      this.loadAsyncData();
    },
    viewPerilakuKerja: function (data) {
      this.$refs.ModalPerilakuKerja.showModal(data);
    },
    viewSasaranKinerja: function (data) {
      this.$refs.loader.start();
      this.$router.push("/personal/sasaran_kinerja/" + data.id + "/sumary");
    },
    reviewSasaranKinerja: function (data) {
      this.$refs.loader.start();
      this.$router.push("/personal/sasaran_kinerja_reviu/" + data.id);
    },
  },
  mounted() {
    this.loadAsyncData();
  },
};
</script>
<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 10px;
}
</style>