<template>
  <div class="col-lg-12">
    <card card-body-classes="table-full-width">
      <h4 slot="header" class="card-title">User List</h4>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column min-width="50" type="index"></el-table-column>
        <el-table-column min-width="150" prop="nip" label="NIP">
        </el-table-column>
        <el-table-column min-width="200" prop="nama" label="NAMA PEGAWAI">
        </el-table-column>
        <el-table-column min-width="150" prop="jabatan" label="JABATAN">
        </el-table-column>
        <el-table-column min-width="150" header-align="right" label="Actions">
          <div slot-scope="{ row }" class="text-right">
            <el-tooltip content="Info" :open-delay="300" placement="top">
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
              <base-button type="danger" size="sm" icon>
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="2"
          layout="total, sizes, prev, pager, next"
          :total="3"
        >
        </el-pagination>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 0,
      loading: false,
      perPage: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.getData(val);
    },
    getData(val) {
      this.$axios
        .$get("/data_user/?page=" + val)
        .then((resp) => {
          this.tableData = resp.data;
          this.total = resp.total;
          this.currentPage = resp.current_page;
          //this.perPage = resp.per_page
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

