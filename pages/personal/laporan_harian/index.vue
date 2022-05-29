<template>
  <card style="min-height: 480px">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Laporan Harian</h4>
      <p class="card-category d-inline"></p>
    </template>

    <md-button
      style="height: 28px; margin-left: -1px; font-size: 11px; margin-top: 30px"
      class="md-dense md-raised md-primary"
      v-on:click="addLaporanHarian($event)"
      value="0"
      ><i class="el-icon-plus"></i> Laporan Harian
    </md-button>

    <el-table :data="tableLaporanHarian" border style="width: 100%">
      <el-table-column
        align="center"
        prop="tanggal"
        label="Tanggal"
        width="150"
      >
      </el-table-column>
      <el-table-column align="center" prop="waktu" label="Waktu" width="150">
      </el-table-column>
      <el-table-column align="center" prop="menit" label="Menit" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="aktivitas"
        label="Aktivitas / Kegiatan"
      >
      </el-table-column>
      <el-table-column align="center" prop="kaitan_skp" label="Kaitan SKP">
      </el-table-column>
      <el-table-column
        align="center"
        prop="bukti_kegiatan"
        label="Bukti Kegiatan"
        width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="status_verifikasi"
        label="Status Verifikasi"
        width="150"
      >
      </el-table-column>
    </el-table>
  </card>
</template>


<script>
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  name: "personalLaporanHarianCalendar",
  middleware: ["auth"],
  layout: "personalLaporanHarianLayout",
  head() {
    return {
      tableLaporanHarian: [],
      search: "",
      //pagination
      layout: " prev, pager,next",
      search: "",
      sortField: "id",
      sortOrder: "asc",

      defaultSortOrder: "asc",
      page: 1,
      limit: "20",
      total: "",
      currentPage: 1,
    };
  },
  components: {
    PareLoader,
  },
  data() {
    return {};
  },
  methods: {
    addLaporanHarian: function (data) {
      console.log(data)
    },
  },
  mounted() {},
};
</script>


<style>
.is-selected {
  color: #1989fa;
}
</style>


