<template>
  <card style="min-height: 500px">
    <sasaran-strategis
      ref="ModalSasaranStrategis"
      style="min-height: 350px"
      @loadAsyncData="loadAsyncData"
    >
    </sasaran-strategis>

    <indikator-kinerja-utama
      ref="ModalIndikatorKinerjaUtama"
      @loadAsyncData="loadAsyncData"
    >
    </indikator-kinerja-utama>

    <md-button
      style="height: 28px; margin-left: -1px; font-size: 11px; margin-top: 1px"
      class="md-dense md-raised md-primary"
      v-on:click="addSasaranStrategis($event)"
      value="0"
      v-if="(statusPk == 'open') & (showButton == 'true')"
      ><i class="el-icon-plus"></i> Sasaran Strategis
    </md-button>

    <hr />
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="no" label="No" width="50">
      </el-table-column>
      <el-table-column label="Sasaran Strategis" width="270">
        <template slot-scope="scope">
          {{ scope.row.sasaran_strategis }}
          <el-row>
            <el-button
              v-if="(statusPk == 'open') & (showButton == 'true')"
              size="small"
              type="text"
              @click="editSasaranStrategis(scope.row)"
            >
              <i class="el-icon-edit-outline"></i> Edit
              <md-tooltip md-direction="top">Edit Sasaran Strategis</md-tooltip>
            </el-button>

            <el-button
              style="margin-top: -50px"
              v-if="(statusPk == 'open') & (showButton == 'true')"
              size="small"
              type="text"
              @click="addIndikatorKinerjaUtama(scope.row)"
            >
              <i class="el-icon-document-add"></i> Indikator Kinerja Utama
              <md-tooltip md-direction="top"
                >Tambah Indikator Kinerja Utama</md-tooltip
              >
            </el-button>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Indikator Kinerja Utama" min-width="320">
        <template slot-scope="scope">
          {{ scope.row.indikator }}
          <el-row v-if="scope.row.indikator != '' ">
            <el-button
              v-if="(statusPk == 'open') & (showButton == 'true')"
              size="small"
              type="text"
              @click="editIndikatorKinerjaUtama(scope.row)"
            >
              <i class="el-icon-edit-outline"> Edit</i>
              <md-tooltip md-direction="top"
                >Edit Indikator Kinerja Utama</md-tooltip
              >
            </el-button>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="target" label="Target" width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="Aksi"
        width="70"
        v-if="(statusPk == 'open') & (showButton == 'true')"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.indikator_id != ''">
            <!-- <el-button
              size="medium"
              type="text"
              @click="editIndikatorKinerjaUtama(scope.row)"
            >
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top"
                >Edit Indikator Kinerja Utama</md-tooltip
              >
            </el-button> -->
            <el-button
              size="medium"
              type="text"
              @click="hapusIndikatorSasaranStrategis(scope.row)"
            >
              <i class="el-icon-delete" style="color: #f56c6c"></i>
              <md-tooltip md-direction="top"
                >Hapus Indikator Kinerja Utama</md-tooltip
              >
            </el-button>
          </div>
          <div v-else>
           <!--  <el-button
              size="medium"
              type="text"
              @click="editSasaranStrategis(scope.row)"
            >
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit Sasaran Strategis</md-tooltip>
            </el-button> -->
            <el-button
              size="medium"
              type="text"
              @click="hapusSasaranStrategis(scope.row)"
            >
              <i class="el-icon-delete" style="color: #f56c6c"></i>
              <md-tooltip md-direction="top"
                >Hapus Sasaran Strategis</md-tooltip
              >
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <br />
    <span class="text-info" v-if="statusPk == 'open'">
      * Perjanjian Kinerja wajib memiliki minimal 1 Sasaran Strategis beserta
      indikator nya
    </span>
  </card>
</template>

<script>
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

import IndikatorKinerjaUtama from "~/components/Modal/ModalIndikatorKinerjaUtama.vue";
import SasaranStrategis from "~/components/Modal/ModalSasaranStrategis.vue";
export default {
  middleware: ["auth"],
  components: {
    IndikatorKinerjaUtama,
    SasaranStrategis,
  },
  data() {
    return {
      statusPk: "open",
      showButton: "true",
      isEmpty: false,
      perjanjianKinerjaId: null,
      tableData: [],
      spanArr: [],
      search: "",
      sortField: "id",
      sortOrder: "asc",
    };
  },
  mounted() {
    if (this.perjanjianKinerjaId != null) {
      this.loadData();
    }
  },
  methods: {
    hideButton() {
      this.showButton = "false";
    },
    loadAsyncData() {
      const params = [
        `perjanjian_kinerja_id=${this.perjanjianKinerjaId}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
      ].join("&");

      this.$axios
        .get(`/sasaran_strategis_skpd?${params}`)
        .then(({ data }) => {
          this.tableData = [];
          this.spanArr = [];
          data.data.forEach((item) => {
            this.tableData.push(item);
          });
          this.onMergeLines(data.data);
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
        })
        .catch((error) => {
          this.tableData = [];
          this.spanArr = [];
          this.total = 0;
          this.isEmpty = true;
          throw error;
        });
    },
    detailPk() {
      const params = [`id=${this.perjanjianKinerjaId}`].join("&");
      this.$axios
        .get(`/perjanjian_kinerja_detail?${params}`)
        .then(({ data }) => {
          this.statusPk = data.status;

          setTimeout(() => {}, 800);
        })
        .catch((error) => {
          throw error;
        });
    },

    loadData(perjanjianKinerjaId) {
      this.perjanjianKinerjaId = perjanjianKinerjaId;
      const params = [
        `perjanjian_kinerja_id=${this.perjanjianKinerjaId}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
      ].join("&");

      if (this.perjanjianKinerjaId != null) {
        this.detailPk();

        this.$axios
          .get(`/sasaran_strategis_skpd?${params}`)
          .then(({ data }) => {
            this.tableData = [];
            this.spanArr = [];
            data.data.forEach((item) => {
              this.tableData.push(item);
            });
            this.onMergeLines(data.data);
            this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
          })
          .catch((error) => {
            this.tableData = [];
            this.spanArr = [];
            this.total = 0;
            this.isEmpty = true;
            throw error;
          });
      }
    },
    onMergeLines(data) {
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.tableData[index].no === this.tableData[index - 1].no) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //console.log(row, column);

      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    addSasaranStrategis: function (data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalAdd(this.perjanjianKinerjaId);
    },
    editSasaranStrategis: function (data) {
      //console.log(data)
      this.$refs.ModalSasaranStrategis.showModalEdit(data.id);
    },
    hapusSasaranStrategis: function (data) {
      //const parent = node.parent;
      //const child = parent.data.child || parent.data;

      this.$confirm("Hapus Sasaran Strategis", "Konfirmasi", {
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .$delete("/sasaran_strategis?id=" + data.id)
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
    addIndikatorKinerjaUtama: function (data) {
      console.log(data);
      this.$refs.ModalIndikatorKinerjaUtama.showModalAdd(
        this.perjanjianKinerjaId,
        data.id
      );
    },
    editIndikatorKinerjaUtama: function (data) {
      this.$refs.ModalIndikatorKinerjaUtama.showModalEdit(data.indikator_id);
    },
    hapusIndikatorSasaranStrategis: function (data) {
      //const parent = node.parent;
      //const child = parent.data.child || parent.data;

      this.$confirm("Hapus Indikator Sasaran Utama", "Konfirmasi", {
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .$delete("/indikator_sasaran_strategis?id=" + data.indikator_id)
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
};
</script>

<style lang="scss" scoped>
.el-table .cell {
    word-break: normal !important;
  }
</style>