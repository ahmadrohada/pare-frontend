<template>
  <card style="min-height:480px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Matrik Pembagian Peran dan Hasil ( MPH )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <modal-jabatan 
      ref="JabatanForm"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </modal-jabatan>

    <modal-outcome 
      ref="OutcomeForm"
      style="min-height:350px;"
      @loadAsyncData="loadAsyncData"
    >
    </modal-outcome>


    
    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addJabatan($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Add Jabatan
    </md-button>
   

    <el-table
      :data="tableMatriksPeranHasil"
      border
      :show-header="true"
      :row-class-name="tableRowClassName"
      :cell-class-name="tableCellClassName"
      :highlight-current-row="false"
      style="width: 100%;">

      <el-table-column  :fixed="true" min-width="260" label="JABATAN">
        <template slot-scope="{ row }">
          <div style="display: inline-block !important; padding:0px !important; width:100%; ">
            <div style="float: left; width:80%;">
              <span style="margin-top:-6px;" class="">{{row.jabatan}}</span><br>
              <span style="color:#100f15;   margin-top:-6px;" class="">{{row.role}}</span>
            </div>
            <div style="float:right;">
              <el-button  
                size="small" 
                type="success" 
                @click="addOutcome(row)" 
                icon="el-icon-s-order" 
                circle>
              </el-button>
              <md-tooltip md-direction="top">Add Outcome</md-tooltip>
            </div>
          </div> 
        </template>
      </el-table-column>
    
      <!-- ========== KOLOM HASIL / OUTCOME ========================== -->
      <template v-for="(data,index) in sasaranStrategis">
        <el-table-column  v-bind:key min-width="220" label="INTERMEDIATE OUTCOME">
          <template slot-scope="{ row }">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px;" class="">{{row.outcome[index].label}}</span>
            </div>
          </template>
        </el-table-column>
      </template>

      
    </el-table>

   <!--  https://stackoverflow.com/questions/70373804/vue-js-element-ui-el-table-how-to-merge-cells-and-subtotal-them -->
   
     
  </card>
</template>




<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalJabatan from '~/components/Modal/ModalJabatan.vue';
import ModalOutcome from '~/components/Modal/ModalOutcome.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdMatrikPeranHasilLayout",
  middleware: "auth",
   components: {
    PareLoader,
    ModalJabatan,
    ModalOutcome
  },
  data() {
    return {
      tableMatriksPeranHasil:[],
      sasaran_strategis:[],
      periode: '',
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
          //return row.row_style;
      },
      tableCellClassName({row, column, rowIndex, columnIndex}) {
        
        /* if ((rowIndex === 0)|(rowIndex === 1)|(rowIndex === 2)) {
          return 'header-row';
        }  */
      },
      addJabatan: function(e) {
        this.$refs.JabatanForm.showModalAdd(this.skpd_id);
      },
      addOutcome: function(e) {
        console.log(e)
        this.$refs.OutcomeForm.showModalAdd(e);
      },
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
    this.periode = this.$route.params.periode
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