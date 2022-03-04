<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Matrik Pembagian Peran dan Hasil ( MPH )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    



    <el-table
      :data="tableMatriksPeranHasil"
      :span-method="objectSpanMethod"
      border
      :show-header="true"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
      :highlight-current-row="false"
      style="width: 100%;">

      <el-table-column  :fixed="true" min-width="60" label="NAMA">
        <template slot-scope="{ row }">
          <div style="display: inline-block !important; padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{row.id_jabatan}}</span><br>
            <span style="color:#848484;   margin-top:-6px;" class="">{{row.role}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column  :fixed="true" min-width="100" label="JABATAN">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{row.jabatan}}</span>
          </div>
        </template>
      </el-table-column>


      <!-- ========== KOLOM HASIL / OUTCOME ========================== -->
      <template v-for="(data,index) in sasaranStrategis">
        <el-table-column  min-width="80" label="INTERMEDIATE OUTCOME">
          <template slot-scope="{ row }">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px;" class="">{{row.outcome[index].label}}</span>
            </div>
          </template>
        </el-table-column>
      </template>

      
    </el-table>

   
   
     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader
  },
  data() {
    return {
      tableMatriksPeranHasil:[],
      sasaran_strategis:[],
      periode: 2022,
      koordinator_id: ''
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      }),
     
  },
  methods: {
    loadAsyncData() {
        const params = [
          `periode=${this.periode}`,
          `skpd_id=${this.skpd_id}`,
          `koordinator_id=${this.koordinator_id}`,
        ].join('&')
        this.loading = true
        this.$axios
          .get(`/matrik_peran_hasil?${params}`)
          .then(({ data }) => {

            this.tableMatriksPeranHasil = []
            this.sasaranStrategis = data.sasaran_strategis
          
            data.matriks.forEach((item) => {
              this.tableMatriksPeranHasil.push(item)
            })
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 400);
            this.loading = false
          })
          .catch((error) => {
            this.tableMatriksPeranHasil = []
            throw error
          })
      },
      tableRowClassName({row, rowIndex}) {
        //console.log(row.row_style)
        if (( rowIndex != 0)&(rowIndex != 1)&(rowIndex != 2)) {
          return row.row_style;
        } 
      },
      tableCellClassName({row, column, rowIndex, columnIndex}) {
        
        if ((rowIndex === 0)|(rowIndex === 1)|(rowIndex === 2)) {
          return 'header-row';
        } 
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if ((rowIndex === 0)|(rowIndex === 1)|(rowIndex === 2)) {
          if ((columnIndex === 0)|(columnIndex === 1)) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }

        }
      } 
  },
  async asyncData({ params ,$route }) {
      //const user =  await $axios.$get("/user/"+params.nip)
      //return { user }
      //this.koordinator_id = this.$route.params.roleId
      const koordinator_id = params.roleId
      return { koordinator_id }
      //console.log(params.roleId)

  },
  mounted() {
    this.loadAsyncData()
  },
  
};
</script>
<style>
 
  .el-table .cell {
    word-break: normal !important;
  }

  .el-table .header-row {
    background: rgb(206, 205, 205);
    font-size: 10pt !important;
    color: #141516;
    text-align: center !important;
  }
  .el-table tr.header-row:hover {
    background: rgb(206, 205, 205);
    font-size: 11pt !important;
    color: #141516;
    text-align: center !important;
  }

  .el-table .style0 {
    background: rgb(196, 196, 196);
  }
  .el-table .style1 {
    background: rgb(255, 243, 243);
  }
  .el-table .style2 {
    background: #fcf8f0;
  }
  .el-table .style3 {
    background: #fffff3;
  }
  .el-table .style4 {
    background: #fef3ff;
  }
  .el-table .style5 {
    background: #f5ffff;
  }
  .el-table .style6 {
    background: #fff5f9;
  }
</style>