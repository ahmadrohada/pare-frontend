<template>
  <div>
    <div>
      <el-table  
        :data="tableData"
        :default-sort = "{prop: 'jabatan_referensi_id', order: 'asc'}"
        >
        <el-table-column min-width="87" prop="tim_kerja.renja.periode" label="PERIODE"></el-table-column>
        <el-table-column min-width="250" label="PERAN DAN JABATAN">
          <template slot-scope="props">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px; color:black;" class="">{{props.row.tim_kerja.label}}</span><br>
              <span style="margin-top:-6px; color:#696969;" class="text-muted">{{props.row.jabatan}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="380" prop="tim_kerja.renja.nama_skpd" label="SKPD"></el-table-column>
        
        
        <el-table-column min-width="120" header-align="center" label="SKP">
          <template slot-scope="{ row }">
            <div class="text-center">
                <base-button
                  type="info"
                  size="sm"
                  icon
                  v-on:click="$emit('createRencanaSkp', row.id)"
                  v-show = "row.rencana_skp == null"
                >
                  <md-tooltip md-direction="top">Create Rencana SKP</md-tooltip>
                  <i class="el-icon-document-add"></i>
                </base-button>
                  <div class="text-right" v-show = "row.rencana_skp != null">
                    <el-button-group >
                      <el-button size="mini" type="success" @click="$emit('lihatRencanaSkp', row.rencana_skp.id)">
                        <md-tooltip md-direction="top">Lihat Data</md-tooltip>
                        <span class="el-icon-edit-outline"></span>
                      </el-button>
                      <el-button size="mini" type="success" @click="$emit('hapusRenja', row)">
                        <span class="el-icon-delete">
                           <md-tooltip md-direction="top">Hapus Data</md-tooltip>
                        </span>
                      </el-button>
                    </el-button-group>
                  </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        :total="total"
        :layout="layout"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :pager-count="4"
      />
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Pagination } from "element-ui";
export default {
  props: ["tableData", "page", "total", "layout","limit"],
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
  },
  data() {
      return {
        search: '',
      }
  },
  methods: {
    handleCurrentChange: function(val) {
      this.$emit("handlePaging", "?page="+val);
    },
    handleSizeChange: function(val) {
        console.log(`${val} items per page`);
        this.$emit("handleSizeChange", "?limit="+val);
    }, 
    formatter(row, column) {
        //return row.nip;
    }
  },
};
</script>