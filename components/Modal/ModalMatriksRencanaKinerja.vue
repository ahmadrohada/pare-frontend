<template>
  <modal :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{ headerText }}</h4>
    </template>

    <label
      >Last Update : {{ moment(last_update).format("DD-MM-YYYY HH:mm") }}</label
    >

    <el-table
      ref="outcomeTable"
      :data="outcomeList"
      :show-header="false"
      border
      :highlight-current-row="false"
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        type="selection"
        :selectable="canSelectRow"
        width="40"
      >
      </el-table-column>

      <el-table-column label="LABEL OUTCOME">
        <template slot-scope="{ row }">
          <div style="padding: 0px !important">
            <span style="margin-top: -6px" class="">{{ row.label }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer">
      <el-button  size="mini" type="primary"  :loading="submitLoader" @click="submitOutcome()">Submit</el-button>
    </template>
  </modal>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  components: {
    PareLoader,
  },
  data() {
    return {
      submitLoader: false,
      headerText: "Matriks Hasil",
      modalFormVisible: false,
      last_update: "-",
      outcomeList: null,
      outcomeForm:{
          jabatanId:null,
          periodeSkp:null,
          sasaranKinerjaId:null,
          selectedOutcome:null
      }
    };
  },
  methods: {
    showModal(nipPegawai, periodeSkp, skpId) {
      //alert(periodeSkp);
      this.outcomeForm.nipPegawai = nipPegawai
      this.outcomeForm.periodeSkp = periodeSkp
      this.outcomeForm.sasaranKinerjaId = skpId

      const params = [
        `nipPegawaiYangDinilai=${this.outcomeForm.nipPegawai}`,
        `periode=${this.outcomeForm.periodeSkp}`,
        `skpId=${this.outcomeForm.sasaranKinerjaId}`,
      ].join("&");

      this.$refs.loader.start();

      this.$axios
        .get(`/list_outcome_pegawai?${params}`)
        .then(({ data }) => {
          this.outcomeList = data.outcome;
          this.last_update = data.last_update;

          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.response.data.message,
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        });

      this.modalFormVisible = true;
    },
    canSelectRow(row, index) {
      return row.status == "0";
    },
    handleSelectionChange(val) {
      this.outcomeForm.selectedOutcome = val;
      console.log(this.outcomeForm.selectedOutcome)
    },
    submitOutcome() {
      this.submitLoader = true
      this.$axios
        .$post("/rencana_kinerja_from_outcome", this.outcomeForm )
        .then((response) => {
          this.$emit('loadAsyncData');
          setTimeout(() => {
                this.modalFormVisible = false;
                this.submitLoader = false
                this.$message({
                  type: 'info',
                  message: 'berhasil menyimpan data'
                }); 
          }, 200);
                      
                      
        })
        .catch((error) => {
            this.submitLoader = false
            this.$message({
              type: 'error',
              duration: 2000,
              message: "Tidak Berhasil Menyimpan Data"
            });    
        });


    }
  },
};
</script>