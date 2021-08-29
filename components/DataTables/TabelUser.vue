<template>
  <div>
    <div>
      <el-table  
        :data="tableData"
        :default-sort = "{prop: 'jabatan_referensi_id', order: 'asc'}"
        >
        <el-table-column min-width="160" label="NAMA USER">
          <template slot-scope="props">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px; color:black;" class="">{{props.row.nama_lengkap}}</span><br>
              <span style="font-size:11px; margin-top:-6px; color:#696969;" class="text-muted">{{props.row.nip}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="60" prop="jabatan_eselon" label="ESELON"></el-table-column>
        <el-table-column min-width="250" prop="jabatan" label="JABATAN"></el-table-column>
        <el-table-column min-width="60" header-align="right" label="Is Admin">
          <template slot-scope="{ row }">
            <div class="text-right">
              <el-tooltip content="admin SKPD" :open-delay="300" placement="top">
                <el-switch
                  v-model="row.is_admin"
                  active-color="#13ce66"
                  v-on:change="$emit('addToAdmin', row)"
                  disabled
                  >
                </el-switch>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="60" header-align="right" label="Actions">
          <template slot-scope="{ row }">
            <div class="text-right">
              <el-tooltip content="detail" :open-delay="300" placement="top">
                <base-button
                  type="info"
                  size="sm"
                  icon
                  v-on:click="$emit('viewUser', row)"
                >
                  <i class="tim-icons icon-single-02"></i>
                </base-button>
              </el-tooltip>
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
        return row.nip;
    }
  },
};
</script>