<template>
  <div>
    <div>
      <el-table :data="tableData">
        <el-table-column min-width="150" prop="nama_lengkap" label="NAMA USER"></el-table-column>
        <el-table-column min-width="200" prop="nip" label="NIP"></el-table-column>
        <el-table-column min-width="150" header-align="right" label="Actions">
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
  },
};
</script>