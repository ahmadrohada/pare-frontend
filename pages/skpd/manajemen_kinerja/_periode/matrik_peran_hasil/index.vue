<template>
  <card style="min-height: 420px">
    <pare-loader ref="loader"></pare-loader>

    <modal-koordinator ref="KoordinatorForm" @loadAsyncData="loadAsyncData">
    </modal-koordinator>

    <modal-pejabat ref="PejabatForm" @loadAsyncData="loadAsyncData">
    </modal-pejabat>

    <modal-jabatan ref="JabatanForm" @loadAsyncData="loadAsyncData">
    </modal-jabatan>

    <modal-outcome
      ref="OutcomeForm"
      style="min-height: 350px"
      @loadAsyncData="loadAsyncData"
    >
    </modal-outcome>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Matrik Peran Hasil</h4>
      <p class="card-category d-inline">{{ user.skpd.singkatan }}</p>
    </template>

    <md-button
      style="height: 28px; margin-left: -1px; font-size: 11px"
      class="md-dense md-raised md-primary"
      v-on:click="addKoordinator($event)"
      value="0"
      ><span class="fa fa-plus"></span> Jabatan
    </md-button>

    <!-- <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addJabatan($event)"
      value="0"
     
    ><span class="fa fa-plus"></span>  Jabatan
    </md-button> -->

    <el-table
      :data="tableKoordinatorList"
      border
      :highlight-current-row="false"
      style="width: 100%; margin-top: 10px"
      row-key="id"
      :expand-row-keys="expands"
    >

      <el-table-column align="center" width="50">
        <template slot="header">
           <i class="fa fa-sitemap"></i>
        </template>
      </el-table-column>
      <el-table-column label="Nama dan Jabatan" width="420">
        <template slot-scope="{ row }">
          <div v-for="data in row.pejabat_skp" :key="data.nama_pejabat">
            <el-button size="mini" type="text" @click="hapusPegawai(data)">
              <i class="el-icon-remove"></i>
              <md-tooltip md-direction="top">Hapus Pejabat</md-tooltip>
            </el-button>
            <span style="color: #100f15; margin-top: -6px" class="">{{
              data.nama_pejabat
            }}</span
            ><br />
          </div>
          <el-button size="mini" type="text" @click="addPegawai(row)">
            <i class="el-icon-circle-plus"></i>Tambah Pejabat
            <md-tooltip md-direction="top">Add Pejabat</md-tooltip>
          </el-button>

          <div style="padding: 0px !important">
            <span style="margin-top: -6px" class="">{{ row.jabatan }}</span>
          </div>
        </template> 
      </el-table-column>
      <el-table-column label="Intermediate Outcome">
        <template slot-scope="{ row }">
          <ol style="margin-left: -22px">
            <li v-for="(data, key) in row.outcome" :key="key">
              {{ data.label }}
            </li>
           <!--  <el-button
              size="mini"
              type="text"
              @click="addOutcome(row)"
              style="margin-left: -18px"
            >
              <i class="el-icon-circle-plus"></i>Tambah Outcome
              <md-tooltip md-direction="top">Add Outcome</md-tooltip>
            </el-button> -->
          </ol>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" width="80" label="AKSI">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="viewMatrikPeranHasil(row)">
            <i class="el-icon-view"></i>
            <md-tooltip md-direction="top">Lihat Matrik Peran Hasil</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalKoordinator from "~/components/Modal/ModalKoordinator.vue";
import ModalPejabat from "~/components/Modal/ModalPejabat.vue";
import ModalJabatan from '~/components/Modal/ModalJabatan.vue';
import ModalOutcome from "~/components/Modal/ModalOutcome.vue";
import { mapGetters } from "vuex";

export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
  components: {
    PareLoader,
    ModalKoordinator,
    ModalPejabat,
    ModalJabatan,
    ModalOutcome,
  },
  data() {
    return {
      tableKoordinatorList: [],
      expands: null,
      //periode: 2022,
    };
  },
  computed: {
    ...mapGetters({
      skpd_id: "id_skpd",
      user: "user",
    }),
  },
  methods: {
    loadAsyncData() {
      const params = [
        `periode=${this.periode}`,
        `skpd_id=${this.skpd_id}`,
        `koordinator_id=${this.koordinator_id}`,
      ].join("&");
      this.loading = true;
      this.$refs.loader.start();
      this.$axios
        .get(`/koordinator_list?${params}`)
        .then(({ data }) => {
          this.tableKoordinatorList = [];

          data.koordinatorList.forEach((item) => {
            this.tableKoordinatorList.push(item);
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 400);
          this.loading = false;
        })
        .catch((error) => {
          this.tableKoordinatorList = [];
          throw error;
        });
    },
    addKoordinator: function (e) {
      this.$refs.KoordinatorForm.showModalAdd(this.skpd_id, this.periode);
    },
    viewMatrikPeranHasil: function (data) {
      /* this.$message({
                      type: 'error',
                      message: "unknown link"
                    });   */
      this.$refs.loader.start();
      //console.log(data.id)
      this.$router.push(
        `/skpd/manajemen_kinerja/${this.$route.params.periode}/matrik_peran_hasil/${data.id}`
      );
    },
    addJabatan: function(e) {
      this.$refs.JabatanForm.showModalAdd(this.skpd_id);
    },
    addPegawai: function (e) {
      this.$refs.PejabatForm.showModalAdd(e);
    },
    hapusPegawai: function (e) {
      console.log(e);
    },
    addOutcome: function (e) {
      console.log(e);
      this.$refs.OutcomeForm.showModalAdd(e);
    },
  },
  async asyncData({ params }) {
    const periode = params.periode;
    return { periode };
  },
  mounted() {
    this.loadAsyncData();
    setTimeout(() => {
      this.expands = ['1']
    }, 2000)
  },
};
</script>

<style>
.el-table .cell {
  word-break: normal !important;
}

.el-table td,
.el-table th {
  vertical-align: top;
}
</style>