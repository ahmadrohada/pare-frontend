<template>
  <card style="min-height:480px;">
    <create-renja 
      ref="ModalRenja"
      style="min-height:350px;"
      @reloadTable="reloadTable"
    >
    </create-renja>

    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Perjanjian Kinerja</h4>
      <p class="card-category d-inline">{{user.skpd.singkatan}}</p>
    </template>

    <md-button 
      style="height:28px;margin-left:-1px; font-size:11px;" 
      class="md-dense md-raised md-primary"
      v-on:click="createRenja($event)"
      value="0"
     
    ><span class="fa fa-plus"></span> Create Perjanjian Kinerja
    </md-button>

   
      <md-table
        v-model="data"
        highlight-current-row
        style="width: 100%"
        md-sort="label" 
        md-sort-order="asc"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Periode" md-sort-by="periode_id">{{ item.periode }}</md-table-cell>
          <md-table-cell md-label="Nama SKPD" md-sort-by="nama_skpd">{{ item.nama_skpd }}</md-table-cell>
          <md-table-cell md-label="Created at" >
            <template slot-scope="props">
              <div style="padding:0px !important;">
                <span style="margin-top:-6px;" class="">{{moment(item.created_at).format('DD-MM-YYYY hh:mm')}}</span><br>
              </div>
            </template>
          </md-table-cell>
          <md-table-cell md-label="Status" >{{ item.status }}</md-table-cell>
          <md-table-cell md-label="Aksi">
            <el-button size="mini" type="text" @click="viewPerjanjianKinerja(item)">
              <i class="el-icon-setting">
                
              </i> Setting
              <md-tooltip md-direction="top">Edit Data</md-tooltip>
            </el-button>
          </md-table-cell>
        </md-table-row>

       

      </md-table>
       <el-pagination
        :layout="layout"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :pager-count="perPage"
        :total="totalPage"
      />
  </card>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";
import CreateRenja from '~/components/Modal/CreateRenja.vue';
import { mapGetters } from 'vuex' 


export default {
  layout: "skpdLayout",
  middleware: "auth",
   components: {
    PareLoader,
    CreateRenja
  },
  data() {
    return {
      data: [],
      layout: ' prev, next',
      search: '',
      sortField: 'id',
      sortOrder: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      isNarrowed: true,
      isStriped: true,
      isEmpty: true,
      hasMobileCards: true,
      defaultSortOrder: 'asc',
      page: 1,
      perPage: '',
      totalPage:'',
      isPaginated: true,
      limit:'10',
    };
  },
  computed: {
      ...mapGetters({
        skpd_id:'id_skpd',
        user:'user',
      })
    },
  methods: {
    loadAsyncData() {
      const params = [
        `skpd_id=${this.skpd_id}`,
        `search=${this.search}`,
        `order_by=${this.sortField}`,
        `order_direction=${this.sortOrder}`,
        `page=${this.page}`,
        `take=${this.limit}`,
      ].join('&')

      this.$refs.loader.start() 
      this.$axios
        .get(`/renja?${params}`)
        .then(({ data }) => {
          // api.themoviedb.org manage max 1000 pages
          this.data = []
          this.total = data.pagination.total
          this.page = data.pagination.current_page
          this.perPage = data.pagination.per_page
          this.totalPage = data.pagination.total_page
          this.limit = data.pagination.limit
          data.data.forEach((item) => {
            this.data.push(item)
          })
          this.total > 0 ? (this.isEmpty = false) : (this.isEmpty = true)
          this.$refs.loader.finish() 
        })
        .catch((error) => {
          this.data = []
          this.total = 0
          this.loading = false
          this.isEmpty = true
          throw error
        })
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    viewPerjanjianKinerja: function(data) {
      this.$refs.loader.start()
      this.$router.push("/perjanjian_kinerja/"+data.id);
    },
    createRenja: function(e) {
      this.$refs.ModalRenja.showModal(this.skpd_id);
    },
    notifyVue(verticalAlign, horizontalAlign, alertType, alertMessage) {
      this.$notify({
        message: alertMessage,
        timeout: 60000,
        closeOnClick:false,
        icon: 'fa fa-info',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: alertType,
      });
    }
  },
  mounted() {
    this.loadAsyncData()
  },
  
};
</script>
<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 10px
  }
</style>