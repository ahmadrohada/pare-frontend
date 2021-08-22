<template>
  <card style="min-height:500px;">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">{{skpd.nama}}</h4>
      <p class="card-category d-inline"></p>
    </template>

     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="USER PARE" name="first">
         <div class="table-full-width table-responsive">
          <tabel-user
            :tableData="data"
            :total="total"
            :limit="limit"
            v-on:viewUser="viewUser"
            v-on:handlePaging="paging"
            :current-page.sync="page"
            :layout="layout"
          >
          </tabel-user>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SKP" name="second">

      </el-tab-pane>
      <el-tab-pane label="TPP" name="third">

      </el-tab-pane>
    </el-tabs>
    
    
  </card>
</template>


<script>
import PareLoader from '~/components/Loader/PareLoader.vue';
import TabelUser from "~/components/DataTables/TabelUser.vue";

export default {
  name: "skpdIndex",
  middleware: ['auth'],
  layout: "bkpsdmLayout",
  components:{
    PareLoader,
    TabelUser,
  },
  data() {
    return {
      activeName: 'first',


      data: [],
      total: 0,
      limit: 10,
      page: 1,
      layout: "total, prev, pager, next",

    };
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    paging: function(params) {
      this.$refs.loader.start() 
      this.$axios
        .$get("/user" + params +"&id_skpd="+this.skpd.id)
        .then((resp) => {
          this.data = resp.data;
          setTimeout(() => this.$refs.loader.finish(), 700)
          this.page = resp.pagination['current_page'];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
  },
  async asyncData({ params ,$axios }) {

      const skpd =  await $axios.$get("/skpd/"+params.id)
      return { skpd }

  },
  mounted() {
    this.$refs.loader.start() 
    this.$axios
      .$get("/user?id_skpd="+this.skpd.id)
      .then((resp) => {
        this.data = resp.data;
        this.total = resp.pagination['total'];
        this.page = resp.pagination['page'];
        this.limit = parseInt(resp.pagination['limit']);
        setTimeout(() => this.$refs.loader.finish(), 700)


      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => this.$refs.loader.finish(), 1200)
    
  },
};
</script>
<style></style>

