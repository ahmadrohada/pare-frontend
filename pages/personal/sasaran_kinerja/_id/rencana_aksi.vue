<template>
   <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>

     
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Rencana Aksi</h4>
      <p class="card-category d-inline"></p>
    </template>


    <rencana-aksi 
        ref="ModalRencanaAksi"
        style="min-height:350px;"
        @loadAsyncData="loadAsyncDataRencanaAksi"
      >
      </rencana-aksi>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createRencanaAksi($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Rencana Aksi
    </md-button>

    
    <el-table
      :data="tableDataRencanaAksi"
      border
      style="width: 100%;">
      <el-table-column
        prop="bulan"
        label="Bulan Pelaksanaan"
        class-name="align-top"
        width="220">
      </el-table-column>
      <el-table-column
        prop="no"
        label="Rencana Aksi"
        >
        <template slot-scope="{ row }">
          <ol style="margin-left: -22px">
            <li style="margin-bottom:8px; margin-top:-5px; padding:5px;box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;" v-for="(data, key) in row.rencana_aksi" :key="key">
              <span style="display: block;" class="">{{data.label}}</span>
              <el-button  v-if="data.label != '' " size="mini" type="text"  style="color:#34a890;margin-left:-3px;margin-top:-10px;" @click="klikRencanaAksi(data)" >
                <i class="el-icon-setting"></i> Update/Delete
                <md-tooltip md-direction="top">Update / Delete Rencana Aksi</md-tooltip>
              </el-button>
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

      <!-- <el-table-column label="Rencana Hasil Kerja" width="290">
        <template slot-scope="{row}">
          {{row.rencana_kerja}}
        </template>
      </el-table-column> -->
      <!-- <el-table-column  
        label="Rencana Aksi" 
        min-width="120"
        >
        <template slot-scope="{row}">
          {{row.label}}
        </template>
      </el-table-column> -->
     
      <!-- <el-table-column class-name="align-top" fixed="right" align="center"  label="Aksi" width="70">
        <template slot-scope="{row}" >
          
            <el-button size="medium" type="text" >
              <i class="el-icon-edit-outline"></i>
              <md-tooltip md-direction="top">Edit  Rencana Aksi</md-tooltip>
            </el-button>
            <el-button size="medium" type="text danger">
              <i class="el-icon-delete" style="color:#F56C6C;"></i>
              <md-tooltip md-direction="top">Hapus  Rencana Aksi</md-tooltip>
            </el-button>
         
        </template>
      </el-table-column> -->
    </el-table>

    <!-- <el-pagination
      v-if="total >= 1"
      :layout="layout"
      @current-change="onPageChange"
      @size-change="handleSizeChange"
      :page-sizes="[15]"
      :page-size="pageSize"
      :total="total"
    /> -->

   </card>
</template>

<script>

import PareLoader from '~/components/Loader/PareLoader.vue';
import RencanaAksi from '~/components/Modal/ModalRencanaAksi.vue';

export default {

  middleware: ['auth'],
  layout: "sasaranKinerjaPersonalLayout",
  components: {
    RencanaAksi,
    PareLoader
  },
  data() {
    return {
      sasaranKinerjaId:null,
      tableDataRencanaAksi:null,
      //pagination
      layout: ' prev,  pager,next',
      search: '',
      sortField: 'bulan_pelaksanaan',
      sortOrder: 'asc',
     
      defaultSortOrder: 'asc',
      page: 1,
      limit:'20',
      total:'',
      currentPage: 1,
     
    }
  },
  mounted() {
    this.sasaranKinerjaId = this.$route.params.id
    this.loadAsyncDataRencanaAksi()
  },
  
  methods: {
      loadAsyncDataRencanaAksi() {
        const params = [
          `sasaran_kinerja_id=${this.sasaranKinerjaId}`,
          `search=${this.search}`,
          `order_by=${this.sortField}`,
          `order_direction=${this.sortOrder}`,
        ].join('&') 

        this.$axios
          .get(`/bulan_rencana_aksi?${params}`)
          .then(({ data }) => {
            this.tableDataRencanaAksi = data.bulanList
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 800);
          })
          .catch((error) => {
            this.tableDataKinerjaUtama = []
            throw error
          })
      },
      
      createRencanaAksi: function(data) {
      //console.log(data)
      this.$refs.ModalRencanaAksi.showModalAdd(this.sasaranKinerjaId);
      },
      klikRencanaAksi: function(e) {
        console.log(e)
        this.$refs.ModalRencanaAksi.showModalUpdate(e);
        
      },
  },
}
</script>

<style>
  .el-table .cell {
    word-break: normal !important;
  }
</style>