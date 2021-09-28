<template>
  <div class="row">
    <add-tim-kerja 
        ref="addTimKerja"
        @reloadTree="reloadTree"
        >
    </add-tim-kerja>
    <add-pejabat 
        ref="addPejabatTimKerja"
        @getPejabatList="getPejabatList"
        >
    </add-pejabat>
    <add-rencana-kinerja 
        ref="addRencanaKinerja"
        @getPejabatList="getPejabatList"
        >
    </add-rencana-kinerja>
    <div class="col-md-4 content">
      <pare-loader ref="loaderLeft"></pare-loader>
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <h4 class="title d-inline">TIM KERJA</h4>
          <p class="card-category d-inline"></p>
          <!-- <el-tooltip content="Reload Data" :open-delay="50" placement="right"> -->
            <el-button 
              type="text"
              @click="() => refreshTree()"
              >
              <span class="el-icon-refresh">
                <md-tooltip md-direction="right">Refresh</md-tooltip>
              </span>
              
            </el-button>
            
          <!-- </el-tooltip> -->
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
                <el-button
                  type="text"
                  size="mini"
                  style="color:#20B2AA"
                  @click="() => addTimKerja(data)"
                  v-if="data.anggota == false"
                  
                  >
                  <md-tooltip md-direction="left">Tambah Tim Kerja ( Child )</md-tooltip>
                  <i class="fa fa-arrow-down"></i>
                    
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-else
                  disabled
                  >
                </el-button>

                
            
              <el-button
                  type="text"
                  size="mini"
                  style="color:#F08080"
                  @click="() => remove(node, data)"
                  v-if="node.isLeaf == true"
                  
                  >
                    <md-tooltip md-direction="right">Hapus Tim Kerja</md-tooltip>
                    <i class="fa fa-times"></i>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-else
                  disabled
                  >
                </el-button>
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

        <md-tabs class="md-vue md_user">
          <md-tab id="tab-pejabat" md-label="Pejabat">

            <md-button 
                style="height:28px;margin-left:-1px; font-size:11px; background:#009168;" 
                class="md-dense  btn-block md-raised md-primary"
                @click="addPejabatTimKerja(timKerja)"
            ><span class="fa fa-plus"></span> Tambah Pejabat ( {{timKerja.label}} )
            </md-button>
            <hr>
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
                <md-button
                  class="md-icon-button md-raised md-accent pegawai_btn"
                  @click="hapusPejabatTimKerja(id)"
                  
                >
                  <span class="fa fa-user-times"></span>
                </md-button>
              </md-card-header>
            </md-card>


            <md-card
              class="md-primary red_card"
              v-if="( pejabatList.length == 0 ) & itemsLoaded"
            >
              <md-card-header>
                <md-card-media>
                  <img src="~/static/img/not_user.png" class="user_img" />
                </md-card-media>
                <md-card-header-text style="text-align: center; margin-top: 15px">
                  <div class="md-title">Pejabat Belum Ditambahkan pada Tim Kerja Ini</div>
                  <div class="md-subhead"></div>
                </md-card-header-text>
              </md-card-header>
            </md-card>
          </md-tab>
          <md-tab id="tab-rencana_kinerja" md-label="Rencana Kinerja">
            <md-button 
                style="height:28px;margin-left:-1px; font-size:11px; background:#009168;" 
                class="md-dense  btn-block md-raised md-primary"
                @click="addRencanaKinerjaTimKerja(timKerja)"
            ><span class="fa fa-plus"></span> Tambah Rencana Kinerja ( {{timKerja.label}} )
            </md-button>
            <hr>
            <el-table
              :data="rencanaKinerjaList"
              highlight-current-row
              style="width: 100%"
              >
              <el-table-column
                prop="label"
                label="Rencana Kinerja"
              >
              </el-table-column>

              <el-table-column width="150" header-align="right" label="Actions">
                <template slot-scope="scope">
                  <div class="text-right">
                    <el-button-group >
                      <el-button size="mini" type="success" @click="editRencanaKinerja(scope.row.id)">
                        <span class="el-icon-edit">
                           <md-tooltip md-direction="top">Edit Rencana Kinerja</md-tooltip>
                        </span>
                      </el-button>
                      
                      <el-button size="mini" type="success" @click="hapusRencanaKinerja(scope.row)">
                        <span class="el-icon-delete">
                           <md-tooltip md-direction="top">Hapus Rencana Kinerja</md-tooltip>
                        </span>
                      </el-button>
                    </el-button-group>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </md-tab>
        </md-tabs>


      </card>
    </div>
  </div>
</template>


<script>

import PareLoader from '~/components/Loader/PareLoader.vue';
import AddTimKerja from '~/components/Modal/AddTimKerja.vue';
import AddPejabat from '~/components/Modal/AddPejabatTimKerja.vue';
import AddRencanaKinerja from '~/components/Modal/addRencanaKinerjaTimKerja.vue';

export default {
  name: 'tim_kerja',
  middleware: 'auth',
  layout:'renjaLayout',
  components:{
    PareLoader,
    AddTimKerja,
    AddPejabat,
    AddRencanaKinerja
  },
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
        //const parent = node.parent;
        //const child = parent.data.child || parent.data;
        
        this.$confirm('Ini akan menghapus Tim Kerja,  lanjutkan?', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/hapus_tim_kerja?id="+node.data.id)
            .then((resp) => {
               this.showTree = false;
                this.$nextTick(() => {
                    this.showTree = true
                })
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
                });
            })

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
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
    },
    addPejabatTimKerja(data) {
        
        this.$refs.addPejabatTimKerja.showModal(data); 
    },
    hapusPejabatTimKerja(id) {

      this.$confirm('Ini akan menghapus Pejabat Tim Kerja,  lanjutkan?', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/hapus_pejabat_tim_kerja?id="+id)
            .then((resp) => {
               
                this.getPejabatList(resp.tim_kerja_id)
                //console.log(resp)
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
                });
            })

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });

    },
    addRencanaKinerjaTimKerja(data) {
      this.$refs.addRencanaKinerja.headerText = 'Create Rencana Kinerja';
      this.$refs.addRencanaKinerja.timKerjaLabel = this.timKerja.label;
      
      this.$refs.addRencanaKinerja.showModal(data); 
    },
    editRencanaKinerja(id){
      //console.log(id)
      this.$refs.addRencanaKinerja.headerText = 'Edit Rencana Kinerja';
      this.$refs.addRencanaKinerja.showModal(id); 
    },
    hapusRencanaKinerja(data){
      console.log(data)
      /* this.$confirm('Hapus Rencana Kinerja,  lanjutkan?', 'Konfirmasi', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/hapus_rencana_kinerja?id="+id)
            .then((resp) => {
                //console.log(resp)
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
                });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        }); */
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

.md-tab {
    padding: 10px 5px 16px 5px;
}

.md-tabs.md-theme-default .md-tabs-navigation {
    height: 30px;
    background: rgba(245, 247, 246, 0.753);
}
.md-tabs-navigation .md-button {
    height: 30px;
    font-size: 12px;
}

.md-tabs.md-theme-default .md-tabs-navigation .md-button.md-active {
    color: #069c8f;
}
</style>