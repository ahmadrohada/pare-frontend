<template>
  <card style="min-height: 420px">
    <pare-loader ref="loader"></pare-loader>

    <modal-koordinator ref="KoordinatorForm" @loadAsyncData="loadAsyncData">
    </modal-koordinator>

    <modal-pegawai
      ref="PegawaiForm"
      @loadAsyncData="loadAsyncData"
      @reloadChild="reloadChild"
    >
    </modal-pegawai>

    <modal-jabatan
      ref="JabatanForm"
      @loadAsyncData="loadAsyncData"
      @reloadChild="reloadChild"
    >
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

    <!-- <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addJabatan($event)"
      value="0"
     
    ><span class="fa fa-plus"></span>  Jabatan
    </md-button> -->

    <el-table
      :data="tableSKpJptList"
      border
      :highlight-current-row="false"
      style="width: 100%; margin-top: 10px"
      row-key="id"
    >
      <el-table-column
        prop="role"
        label="Peran / Role"
        width="160"
      ></el-table-column>
      <el-table-column label="Nama Pegawai dan Jabatan" width="420">
        <template slot-scope="{ row }">
          <div style="color: #100f15; margin-top: -6px">
            <span style="margin-top: -6px" class="">{{
              row.nama_pegawai
            }}</span>
          </div>
          <div style="padding: 0px !important">
            <span style="margin-top: -6px" class="">{{ row.jabatan }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Indikator Kinerja Individu">
        <template slot-scope="{ row }">
          <ol style="margin-left: -22px">
            <div v-for="(data, key) in row.rencana_kinerja" :key="key">
              <!-- {{ data.indikator_kinerja_individu }} -->
              <li
                v-for="(data, key) in data.indikator_kinerja_individu"
                :key="key"
              >
                {{ data.label }}
              </li>
            </div>
          </ol>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" fixed="right" width="80">
        <template slot="header">
           <i class="fa fa-cog"></i>
        </template>
      </el-table-column> -->
    </el-table>
    <br />

    <md-button
      style="height: 28px; margin-left: -1px; font-size: 11px"
      class="md-dense md-raised md-primary"
      v-on:click="addKoordinator($event)"
      value="0"
      ><span class="fa fa-plus"></span> Koordinator
    </md-button>

    <el-table
      :data="tableKoordinatorList"
      border
      :highlight-current-row="false"
      style="width: 100%; margin-top: 10px"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @expand-change="ExpandChange"
    >
      <el-table-column label="Peran / Role" width="160">
        <template slot-scope="{ row }">
          
          {{ row.role }}
          <el-row>
            <el-button
              size="small"
              type="text"
              @click="editKoordinator(row)"
            >
              <i class="el-icon-edit-outline"> Edit</i>
              <md-tooltip md-direction="top"
                >Edit Label Koordinator</md-tooltip
              >
            </el-button>
          </el-row>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="jabatan" label="Jabatan" width="600"></el-table-column> -->
      <el-table-column label="Nama Pegawai dan Jabatan" width="420">
        <template slot-scope="{ row }">
          <div v-if="row.nama_pegawai != null">
            <el-button size="mini" type="text" @click="hapusPegawai(row)">
              <i class="el-icon-remove" style="color: #f56c6c"></i>
              <md-tooltip md-direction="top">Hapus Pegawai</md-tooltip>
            </el-button>
            <span style="color: #100f15; margin-top: -6px" class="">{{
              row.nama_pegawai
            }}</span
            ><br />
          </div>
          <el-button v-else size="mini" type="text" @click="addPegawai(row)">
            <i class="el-icon-user"></i> Tambah Pegawai
            <md-tooltip md-direction="top">Add Pegawai</md-tooltip>
          </el-button>

          <div style="padding: 0px !important">
            <span style="margin-top: -6px" class="">{{ row.jabatan }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Rencana Kinerja SKP">
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
      <el-table-column align="center" fixed="right" width="80">
        <template slot="header">
          <i class="fa fa-cog"></i>
        </template>
        <template slot-scope="{ row }">
          <el-button
            size="medium"
            type="text"
            @click="viewMatrikPeranHasil(row)"
            v-if="row.level == 'S2'"
          >
            <i class="fa fa-sitemap" style="color: #e6a23c"></i>
            <md-tooltip md-direction="top">Lihat Matrik Peran Hasil</md-tooltip>
          </el-button>
          <el-button size="medium" type="text" @click="hapusKoordinator(row)">
            <i class="el-icon-delete" style="color: #f56c6c"></i>
            <md-tooltip md-direction="top">Hapus Koordinator</md-tooltip>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <br />
    <span style="color: #22726f"
      >* Klik Button Tambah Koordinator [
      <i class="fa fa-plus" style="color: #448aff"></i> ] untuk menambahkan
      Koordinator</span
    >
    <br />
    <span style="color: #22726f"
      >* Klik icon matrik peran hasil [
      <i class="fa fa-sitemap" style="color: #e6a23c"></i> ] untuk menambahkan
      kegiatan dan jabatan dibawahnya</span
    >
    <br />
    <span style="color: #22726f"
      >* Klik icon panah bawah [ <i class="el-icon-arrow-right"></i> ] untuk
      melihat jabatan dibawahnya</span
    >
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalKoordinator from "~/components/Modal/ModalKoordinator.vue";
import ModalPegawai from "~/components/Modal/ModalPegawai.vue";
import ModalJabatan from "~/components/Modal/ModalJabatan.vue";
import ModalOutcome from "~/components/Modal/ModalOutcome.vue";
import { mapGetters } from "vuex";

export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
  components: {
    PareLoader,
    ModalKoordinator,
    ModalPegawai,
    ModalJabatan,
    ModalOutcome,
  },

  data() {
    return {
      tableKoordinatorList: [],
      tableSKpJptList: [],
      tableTreeRefreshTool: {},
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
      ].join("&");
      this.loading = true;
      this.$refs.loader.start();
      this.$axios
        .get(`/koordinator_list?${params}`)
        .then(({ data }) => {
          this.tableKoordinatorList = [];
          this.tableSKpJptList = [];

          data.koordinatorList.forEach((item) => {
            this.tableKoordinatorList.push(item);
          });
          data.skpJptList.forEach((item) => {
            this.tableSKpJptList.push(item);
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 400);
          this.loading = false;
        })
        .catch((error) => {
          this.tableKoordinatorList = [];
          this.tableSKpJptList = [];
          throw error;
        });
    },
    addKoordinator: function (e) {
      this.$refs.KoordinatorForm.showModalAdd(this.skpd_id, this.periode);
    },
    editKoordinator: function (e) {
      console.log(e)
      this.$refs.KoordinatorForm.showModalEdit(e);
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
    addJabatan: function (e) {
      this.$refs.JabatanForm.showModalAdd(this.skpd_id);
    },
    addPegawai: function (e) {
      this.lastParent = e.parent_id;
      this.$refs.PegawaiForm.showModalAdd(e);
    },
    hapusPegawai: function (data) {
      console.log(data);
      this.lastParent = data.parent_id;
      this.$confirm(
        "Nama Pegawai akan dihapus dari jabatan ini !",
        "Konfirmasi",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          type: "warning",
        }
      )
        .then(() => {
          this.$axios
            .$delete("/peran_pegawai?id=" + data.id)
            .then((resp) => {
              this.loadAsyncData();
              this.reloadChild();
              this.$message({
                type: "success",
                message: "Pegawai Berhasil dihapus",
              });
            })
            .catch((error) => {
              //console.log(error.response.data.message)
              this.$message({
                type: "error",
                message: error.response.data.message,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Proses Hapus Pegawai Dibatalkan",
          });
        });
    },

    addOutcome: function (e) {
      console.log(e);
      this.$refs.OutcomeForm.showModalAdd(e);
    },
    load(tree, treeNode, resolve) {
      this.tableTreeRefreshTool[tree.id] = {};
      this.tableTreeRefreshTool[tree.id].resolve = resolve;
      this.tableTreeRefreshTool[tree.id].expandCount = 0;

      const params = [`parent_id=${tree.id}`].join("&");
      this.$axios
        .get(`/jabatan_child?${params}`)
        .then(({ data }) => {
          setTimeout(() => {
            resolve(data.jabatan_list);
          }, 1000);
        })
        .catch((error) => {
          throw error;
        });
    },
    ExpandChange(row, expanded) {
      const curr = this.tableTreeRefreshTool[row.id];
      curr.expandCount++;
      if (expanded && curr.expandCount > 1 && !curr.prevStatus) {
        const params = [`parent_id=${row.id}`].join("&");
        this.$axios
          .get(`/jabatan_child?${params}`)
          .then(({ data }) => {
            setTimeout(() => {
              curr.resolve(data.jabatan_list);
            }, 500);
          })
          .catch((error) => {
            throw error;
          });
      }
      curr.prevStatus = expanded;
    },
    reloadChild() {
      const id = this.lastParent;
      const curr = this.tableTreeRefreshTool[id];
      if (curr) {
        const params = [`parent_id=${id}`].join("&");
        this.$axios
          .get(`/jabatan_child?${params}`)
          .then(({ data }) => {
            setTimeout(() => {
              curr.resolve(data.jabatan_list);
            }, 500);
          })
          .catch((error) => {
            throw error;
          });
      }
    },
    hapusKoordinator: function (data) {
      console.log(data);

      this.$confirm(
        "Peran ( Jabatan Koordinator ), pegawai, bawahan dan rencana kinerja akan ikut terhapus !",
        "Konfirmasi",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          type: "warning",
        }
      )
        .then(() => {
          this.$axios
            .$delete("/peran?id=" + data.id)
            .then((resp) => {
              this.loadAsyncData();
              this.$message({
                type: "success",
                message: "Berhasil dihapus",
              });
            })
            .catch((error) => {
              //console.log(error.response.data.message)
              this.$message({
                type: "error",
                message: error.response.data.message,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Proses Hapus Dibatalkan",
          });
        });
    },
  },
  async asyncData({ params }) {
    const periode = params.periode;
    return { periode };
  },
  mounted() {
    this.loadAsyncData();
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