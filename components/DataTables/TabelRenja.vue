<template>
  <div>
    <div>
      <el-table  
        :data="tableData"
        :default-sort = "{prop: 'jabatan_referensi_id', order: 'asc'}"
        >
        <el-table-column min-width="60" prop="periode" label="PERIODE"></el-table-column>
        <el-table-column min-width="340" prop="nama_skpd" label="NAMA SKPD"></el-table-column>
        <el-table-column min-width="" prop="status" label="STATUS"></el-table-column>
        <el-table-column min-width="100" label="CREATED AT">
          <template slot-scope="props">
            <div style="padding:0px !important;">
              <span style="margin-top:-6px;" class="">{{moment(props.row.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="40" header-align="right" label="">
          <template slot-scope="{ row }">
            <div class="text-right">
              <el-tooltip content="Lihat Data" :open-delay="300" placement="top">
                <base-button
                  type="info"
                  size="sm"
                  icon
                  v-on:click="$emit('viewRenja', row)"
                >
                  <i class="el-icon-right"></i>
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