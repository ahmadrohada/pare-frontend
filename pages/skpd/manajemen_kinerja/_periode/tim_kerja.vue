<template>
  <card style="min-height:420px;">
    <pare-loader ref="loader"></pare-loader>

    <modal-koordinator 
      ref="KoordinatorForm"
      @loadAsyncData="loadAsyncData"
    >
    </modal-koordinator>

    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Tim Kerja ( Koordinator )</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

     <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="addKoordinator($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Add Koordinator
    </md-button>



    <el-table
      :data="tableKoordinatorList"
      border
      :highlight-current-row="false"
      style="width: 100%; margin-top:10px;">
     
      <el-table-column label="NO"
        align="center"
        type="index"
        width="50">
      </el-table-column>
     <!--  <el-table-column   min-width="40" label="PERAN">
        <template slot-scope="{ row }">
          <div style="display: inline-block !important; padding:0px !important;">
            <span style="color:#848484;   margin-top:-6px;" class="">{{row.role}}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column   label="JABATAN">
        <template slot-scope="{ row }">
          <div style="padding:0px !important;">
            <span style="margin-top:-6px;" class="">{{row.jabatan}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column  align="center" width="120" label="AKSI">
        <template slot-scope="{ row }">
            <el-button  size="mini" type="text" @click="viewMatrikPeranHasil(row)">
              <i class="el-icon-view">
              </i> Lihat
              <md-tooltip md-direction="top">Lihat Matrik Peran Hasil</md-tooltip>
            </el-button>
        </template>
      </el-table-column>

       
    </el-table>


     
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import ModalKoordinator from '~/components/Modal/ModalKoordinator.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdManajemenKinerjaLayout",
  middleware: "auth",
   components: {
    PareLoader,
    ModalKoordinator
  },
  data() {
    return {
      tableKoordinatorList:[],
      //periode: 2022,
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
          .get(`/koordinator_list?${params}`)
          .then(({ data }) => {

            this.tableKoordinatorList = []
          
            data.koordinatorList.forEach((item) => {
              this.tableKoordinatorList.push(item)
            })
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 400);
            this.loading = false
          })
          .catch((error) => {
            this.tableKoordinatorList = []
            throw error
          })
    },
    addKoordinator: function(e) {
      this.$refs.KoordinatorForm.showModalAdd(this.skpd_id,this.periode);
    },
    viewMatrikPeranHasil: function(data) {
      /* this.$message({
                      type: 'error',
                      message: "unknown link"
                    });   */
      this.$refs.loader.start()
      //console.log(data.id)
      this.$router.push(`/skpd/manajemen_kinerja/${this.$route.params.periode}/matrik_peran_hasil/${data.id}`); 
    },
  },
  async asyncData({ params }) {
      const periode = params.periode
      return { periode }
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
</style>