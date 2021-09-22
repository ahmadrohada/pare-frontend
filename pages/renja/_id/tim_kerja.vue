<template>
  <div class="row">
    <add-tim-kerja 
        ref="addTimKerja"
        @reloadTree="reloadTree"
        >
    </add-tim-kerja>
    <div class="col-md-4 content">
      <pare-loader ref="loaderLeft"></pare-loader>
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <h4 class="title d-inline">TIM KERJA</h4>
          <p class="card-category d-inline"></p>
          <el-tooltip content="Reload Data" :open-delay="50" placement="right">
            <el-button 
              type="text"
              @click="() => refreshTree()"
              >
              <span class="el-icon-refresh"></span>
            </el-button>
          </el-tooltip>
        </template>

        <el-tree
          :key="showTree"
          :props="defaultProps"
          :load="loadNode"
          node-key="id"
          @node-click="lihatPejabat"
          default-expand-all
          :expand-on-click-node="false"
          lazy
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
          
            <span>{{ data.label }}</span>
         
            <span>
              <el-tooltip content="Tambah Bawahan" :open-delay="50" placement="left">
                <el-button
                  type="text"
                  size="mini"
                  style="color:#20B2AA"
                  @click="() => addTimKerja(data)"
                  v-if="data.anggota == false"
                  
                  >
                    <i class="fa fa-arrow-down"></i>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-else
                  disabled
                  >
                </el-button>
              </el-tooltip>
            
              <el-tooltip  content="Hapus Node" :open-delay="50" placement="right">
                <el-button
                  type="text"
                  size="mini"
                  style="color:#F08080"
                  @click="() => remove(node, data)"
                  v-if="node.isLeaf == true"
                  
                  >
                    <i class="fa fa-times"></i>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-else
                  disabled
                  >
                </el-button>
              </el-tooltip>
              <!-- <el-button
                  type="text"
                  size="mini"
                  style="color:#20B2AA"
                  @click="() => lihatPejabat(data)"
                  
                  >
                    <i class="fa fa-arrow-circle-right"></i>
                </el-button> -->
            </span>
          </span>

        </el-tree>
    
      </card>
    </div>
    <div class="col-md-8 content">
      <card style="min-height:340px;">

        <pare-loader ref="loaderRight"></pare-loader>

        <template slot="header" class="d-inline">
          <h4 class="title d-inline"><i class="fa fa-user"></i>  &nbsp; {{timKerja.label}}</h4>
          <p class="card-category d-inline"></p>
        </template>

         
          <el-button-group style="margin-bottom:5px;">
            <el-tooltip content="Tambah Pejabat" :open-delay="50" placement="top">
              <el-button size="mini" type="primary" icon="fa fa-user-plus" ></el-button>
            </el-tooltip>
            <el-tooltip content="Rencana Kerja" :open-delay="50" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-document" ></el-button>
            </el-tooltip>
            <el-tooltip content="Ubah Data Tim Kerja" :open-delay="50" placement="top">
              <el-button size="mini" type="primary" icon="fa fa-cog" ></el-button>
            </el-tooltip>
          </el-button-group>



        <md-card
          
          class="md-primary md_user"
          md-with-hover
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


        <md-card
          class="md-primary red_card"
          md-with-hover
          v-if="( pejabatList.length == 0 ) & itemsLoaded"
        >
          <md-card-header>
            <md-card-media>
              <img src="~/static/img/not_user.png" class="user_img" />
            </md-card-media>
            <md-card-header-text style="text-align: center; margin-top: 15px">
              <div class="md-title">Detail Pejabat tidak ditemukan</div>
              <div class="md-subhead"></div>
            </md-card-header-text>
          </md-card-header>
        </md-card>

        <el-table
          :data="rencanaKinerjaList"
          highlight-current-row
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
import AddTimKerja from '~/components/Modal/AddTimKerja.vue';

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
        renja_id: 'renja_id',
        anggota:'anggota',
        isLeaf: 'leaf'
      },
      pejabatList:[],
      rencanaKinerjaList:[],
      loading: false,
	    overlay: false,
      itemsLoaded:false,
      showTree:true,
      timKerja:{
        label:null
      }
        
      
    };
  },
  components:{
    PareLoader,
    AddTimKerja
  },
  async asyncData({ params ,$axios }) {
      const renja_id = params.id
      return { renja_id }

  }, 
  methods: {
    reloadTree(nodeData){
      //console.log(nodeData.new)
      const data = nodeData.old
      if (!data.child) {
        this.$set(data, 'child', []);
      } 
      data.child.push(nodeData.new);
    },
    refreshTree(nodeData){
      
      this.showTree = false;
      this.$nextTick(() => {
          this.showTree = true
      })
      
    },
    loadNode(node,resolve) {
        this.$refs.loaderLeft.start()
        if (node.level === 0) {
          this.$axios
          .$get("/tim_kerja_level_0?renja_id="+this.renja_id)
          .then((resp) => {
            this.getPejabatList(resp[0].id)
            setTimeout(() => {
              this.itemsLoaded = true;
            }, 1000);

            return resolve(resp)
            
          })
        }
        if (node.level >= 1) {
          //console.log(node.data.id);
          
          this.$axios
          .$get("/tim_kerja_child?renja_id="+this.renja_id+"&parent_id="+node.data.id)
          .then((resp) => {
              return resolve(resp)
          })
        }
        setTimeout(() => {
            this.$refs.loaderLeft.finish() 
        }, 2000);

        
    },
    /* handleNodeClick(data) {
      //console.log(data.id);
      this.getPejabatList(data.id)
    }, */
    lihatPejabat(data) {
      //console.log(data.id);
      this.getPejabatList(data.id)
    }, 
    addTimKerja(data) {
        //console.log(data);
        this.$refs.addTimKerja.showModal(data); 
    },

    remove(node, data) {
       
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        console.log(node.data.leaf)
        
       
    },

    getPejabatList(tim_kerja_id){
        this.$refs.loaderRight.start()
        this.$axios
          .$get("/tim_kerja?id="+tim_kerja_id)
          .then((resp) => {
            this.timKerja = resp.tim_kerja;
            this.pejabatList = resp.pejabat;
            this.rencanaKinerjaList = resp.rencana_kinerja;
            setTimeout(() => {
              this.$refs.loaderRight.finish() 
            }, 500);
          })
    }
    
  },
  mounted() {
    //this.initData();
    console.log(this.$route.params.id)
     
  },
};
</script>
<style>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
  }

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