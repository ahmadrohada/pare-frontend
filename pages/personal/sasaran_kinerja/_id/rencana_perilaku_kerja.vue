<template>
   <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Sasaran Kinerja</h4>
      <p class="card-category d-inline">Perilaku Kerja</p>
    </template>

    <p class="" style="margin-top: 20px">PERILAKU KERJA</p>


    <el-table
      :data="tableDataPerilakuKerja"
      style="width: 100%;"
      :show-header="tableHeader"
      border
      :span-method="objectSpanMethod"
      >
      <el-table-column
        align="center"
        prop="no"
        label="No"
        width="45">
      </el-table-column>

      <el-table-column
        label="Aspek Perilaku Kerja"
        >
        <template slot-scope="{ row }">
          {{row.aspek}}

          <ul style="margin-left: -30px;" v-if="row.point_penilaian != null" >
            <li v-for="(data, key) in row.point_penilaian" :key="key">
              <span style="color:#606266;">{{ data.label }}</span>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        
        class-name="align-top"
        >
        <template slot-scope="{ row }">
          {{row.ekspektasi_pimpinan}}
         <!--  <span v-if="row.ekspektasi_pimpinan != null">
            Ekspektasi Khusus Pimpinan:
          </span> -->

         <!--  <ul style="margin-left: -30px;" v-if="row.point_penilaian != null" >
            <li v-for="(data, key) in row.point_penilaian" :key="key">
              <span style="color:#606266;">{{ data.label }}</span>
            </li>
          </ul> -->
        </template>
      </el-table-column>

     
    </el-table>
   </card>
</template>

<script>

import PareLoader from '~/components/Loader/PareLoader.vue';
export default {

  middleware: ['auth'],
  layout: "sasaranKinerjaPersonalLayout",
  components: {
    PareLoader
  },
  data() {
    return {
      tableHeader:false,
      tableDataPerilakuKerja: []
     
    }
  },
  mounted() {
    this.sasaranKinerjaId = this.$route.params.id
    this.loadData()
  },
  
  methods: {
    loadData() {
      const params = [
          `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
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
          })
          .catch((error) => {
            this.tableDataPerilakuKerja = []
            throw error
          })

       
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
}
</script>

<style>
  .el-table .cell {
    word-break: normal !important;
  }
</style>