<template>
  <modal :show.sync="modalFormVisible" >
    
    <template slot="header">
      <h4 class="modal-title">Perilaku Kerja</h4>
    </template>

     <!-- <modal-outcome 
        ref="OutcomeForm"
        style="min-height:350px;"
        @loadAsyncData="loadAsyncData"
      >
      </modal-outcome> -->

    <el-table
      :data="tableDataPerilakuKerja"
      style="width: 100%"
      :show-header="tableHeader"
      border
      :span-method="objectSpanMethod"
    >
      <el-table-column align="center" prop="no" label="No" width="45">
      </el-table-column>

      <el-table-column label="Aspek Perilaku Kerja">
        <template slot-scope="{ row }">
          {{ row.aspek }}

          <ul style="margin-left: -30px" v-if="row.point_penilaian != null">
            <li v-for="(data, key) in row.point_penilaian" :key="key">
              <span style="color: #606266">{{ data.label }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column class-name="align-top">
        <template slot-scope="{ row }">
          <!-- {{ row.ekspektasi_pimpinan }} -->
          <span v-if="row.ekspektasi_pimpinan != null">
            Ekspektasi Khusus Pimpinan: 
              <el-button size="mini" type="text" @click="addEkspektasi(row)" >
                <i class="el-icon-circle-plus"></i> Add Ekspektasi
                <md-tooltip md-direction="top">Add Ekspektasi</md-tooltip>
              </el-button>
          </span>

          <!--  <ul style="margin-left: -30px;" v-if="row.point_penilaian != null" >
            <li v-for="(data, key) in row.point_penilaian" :key="key">
              <span style="color:#606266;">{{ data.label }}</span>
            </li>
          </ul> -->
        </template>
      </el-table-column>
    </el-table>

    <template slot="footer"> </template>
  </modal>
</template>

<script>

import ModalOutcome from '~/components/Modal/ModalOutcome.vue';

export default {
  components: {
    ModalOutcome
  },
  data() {
    return {
      modalFormVisible: false,
      tableDataPerilakuKerja:[],
      tableHeader:true
    };
  },
  methods: {
    showModal() {
      
      this.loadData();
      
    },
    loadData() {
      const params = [
          //`sasaran_kinerja_id=${this.sasaranKinerjaId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
        ].join('&')

        this.$axios
          .get(`/sasaran_kinerja_perilaku_kerja?${params}`)
          .then(({ data }) => {
            this.tableDataPerilakuKerja = []
            data.data.forEach((item) => {
              this.tableDataPerilakuKerja.push(item)
            }) 

            this.modalFormVisible = true;
           

          })
          .catch((error) => {
            this.tableDataPerilakuKerja = []
            throw error
          })

       
    },
    addEkspektasi: function(e) {
      console.log(e)
      //this.$refs.OutcomeForm.showModalAdd(e);
    },
    
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 1,
              colspan: 2
            };
          } else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scope>
.modal.show .modal-dialog {
  transform: translate(0, 10%) !important;
}

.modal-body {
  //min-height: 430px !important;
}


.el-table .cell {
  word-break: normal !important;
}
</style>