<template>
  <div>
    <div>
      <el-table :data="data">
        <el-table-column min-width="50" type="index"></el-table-column>
        <el-table-column min-width="150" prop="username" label="Name"></el-table-column>
        <el-table-column min-width="200" prop="id" label="NIP"></el-table-column>
        <el-table-column min-width="150" header-align="right" label="Actions">
          <template slot-scope="{ row }">
            <div class="text-right">
              <el-tooltip content="info" :open-delay="300" placement="top">
                <base-button type="info" size="sm" icon>
                  <i class="tim-icons icon-single-02"></i>
                </base-button>
              </el-tooltip>

              <el-tooltip content="Settings" :open-delay="300" placement="top">
                <base-button type="success" size="sm" icon>
                  <i class="tim-icons icon-settings"></i>
                </base-button>
              </el-tooltip>

              <el-tooltip content="Delete" :open-delay="300" placement="top">
                <base-button
                  type="danger"
                  size="sm"
                  icon
                  v-on:click="$emit('handleClick', row)"
                >
                  <i class="tim-icons icon-simple-remove"></i>
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
      />
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Pagination } from "element-ui";
export default {
  props: ["data", "currentPage", "total", "layout"],
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
  },
  methods: {
    handleCurrentChange: function(val) {
      this.$emit("handlePaging", val);
    },
  },
};
</script>