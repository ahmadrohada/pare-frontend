<template>
  <div class="row">
    <div class="col-md-4 content">
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <h4 class="title d-inline"></h4>
          <p class="card-category d-inline"></p>
        </template>

        <el-tree
          :props="defaultProps"
          :load="loadNode"
          @node-click="handleNodeClick"
          lazy
          >
        </el-tree>
    
      </card>
    </div>
    <div class="col-md-8 content">
      <card style="min-height:340px;">

        <pare-loader ref="loader"></pare-loader>

        <template slot="header" class="d-inline">
          <h4 class="title d-inline"></h4>
          <p class="card-category d-inline"></p>
        </template>


        <md-card
          class="md-primary md_user"
          v-for="{id, jabatan, nama_lengkap,nip,photo} in pejabatList" :key="id"
        >
          <md-card-header>
            <md-card-media>
              <img
                :src="photo"
                class="user_img"
              />
            </md-card-media>
            <md-card-header-text>
              <div class="md-title">
                {{ nama_lengkap }}
              </div>
              <div class="md-subhead">
                NIP. {{ nip }}
              </div>
              <div class="md-subhead">
                {{ jabatan }}
              </div>
            </md-card-header-text>
          </md-card-header>
        </md-card>

        <el-table
          :data="rencanaKinerjaList"
          border
          style="width: 100%">
          <el-table-column
            prop="label"
            label="Rencana Kinerja"
            width="">
          </el-table-column>
          <el-table-column
            prop="added_by"
            label="Added By"
            width="120">
          </el-table-column>
        </el-table>



      </card>
    </div>
  </div>
</template>


<script>

import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  name: 'tim_kerja',
  middleware: 'auth',
  layout:'renjaLayout',
  head() {
    return {
      title: "Tim Kerja",
      
    };
  },
  data() {
    return {
      defaultProps: {
        children: 'child',
        id: 'id',
        label: 'label',
        attribute: 'attribute',
        isLeaf: 'leaf'
      },
      pejabatList:[],
      rencanaKinerjaList:[],
      loading: false,
	    overlay: false,
    };
  },
  components:{
    PareLoader,
  },
  async asyncData({ params ,$axios }) {
      const renja_id = params.id
      return { renja_id }

  },
  methods: {
    loadNode(node,resolve) {
      
        if (node.level === 0) {
          this.$axios
          .$get("/tim_kerja_level_0?renja_id="+this.renja_id)
          .then((resp) => {
            this.getPejabatList(resp[0].id)
            return resolve(resp)
            
          })
        }
        if (node.level >= 1) {
          //console.log(node.data.id);
          this.$axios
          .$get("/tim_kerja_child?renja_id="+this.renja_id+"&parent_id="+node.data.id)
          .then((resp) => {
            setTimeout(() => {
              return resolve(resp)
            }, 500);
          })
        }
    },
    handleNodeClick(data) {
      console.log(data.id);
      this.getPejabatList(data.id)
    },
    getPejabatList(tim_kerja_id){
        this.$refs.loader.start()
        this.$axios
          .$get("/tim_kerja?id="+tim_kerja_id)
          .then((resp) => {
            this.pejabatList = resp.pejabat;
            this.rencanaKinerjaList = resp.rencana_kinerja;
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 500);
          })
    }
    
  },
  mounted() {
    //this.initData();
     
  },
};
</script>
<style>
.el-tree {
    background:transparent !important;
}
.el-tree-node__label {
    font-size: 13px;
    overflow: auto;
}

.md-card-header {
  height:98px;
}

.user_img {
  border-radius: 2.3rem !important;
  border: 2px solid rgba(218, 218, 218, 0.603);
}

.md_user {
  background: #00bf8f; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #014d3b,
    #00bf8f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #014d3b,
    #00bf8f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.red_card {
  background: rgb(211, 43, 43) !important;
  opacity: 0.64 !important;
}
.md-card-header-text{
  margin-left:-5px;
}
.md-card .md-title {
  font-size: 14px !important;
  margin-top: -4px !important;
  line-height: 25px;
}
.md-card .md-subhead {
  font-size: 11px !important;
  opacity: 0.74 !important;
}
.md-card-media img {
  width: 80% !important;
}
.md-card-header .md-card-media {
  margin-left: 0px !important;
}
.md-icon-button {
  margin-top: 10px !important;
  margin-right: -8px !important;
}

.btn-sim-asn {
  background: rgb(133, 3, 3) !important;
  color: rgb(236, 236, 236) !important;
}

.active_btn_detail {
  background: rgba(247, 247, 247, 0.521);
}
</style>