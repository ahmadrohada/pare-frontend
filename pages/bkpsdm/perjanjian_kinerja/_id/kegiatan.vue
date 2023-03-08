<template>
  <div class="row">
    <div class="col-md-6 content">
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <h4 class="title d-inline"></h4>
          <p class="card-category d-inline"></p>
        </template>

        <el-tree
          :props="defaultProps"
          :load="loadNode"
          node-key="id"
          @node-click="handleNodeClick"
          lazy
          accordion
          >
        </el-tree>
    
      </card>
    </div>
    <div class="col-md-6 content">
      <card style="min-height:340px;">
        <template slot="header" class="d-inline">
          <h4 class="title d-inline">DETAIL</h4>
          <p class="card-category d-inline"></p>
        </template>

        TES KOLOM B
    
      </card>
    </div>
  </div>
</template>


<script>


export default {
  name: 'kegiatan',
  middleware: 'auth',
  layout:'perjanjianKinerjaLayout',
  head() {
    return {
      title: "Rencana Kerja",
      
    };
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        id: 'id',
        label: 'label',
        attribute: 'attribute',
        isLeaf: 'leaf'
      },
    };
  },
  components: {

  },
  async asyncData({ params ,$axios }) {
      const renja_id = params.id
      return { renja_id }

  },
  methods: {
    loadNode(node,resolve) {
      
        if (node.level === 0) {
          this.$axios
          .$get("/rencana_kerja_tahunan_level_0?renja_id="+this.renja_id)
          .then((resp) => {
            return resolve(resp)
          })
        }
        if (node.level >= 1) {
          //console.log(node.data.id);
          this.$axios
          .$get("/rencana_kerja_tahunan_child?renja_id="+this.renja_id+"&parent_id="+node.data.id)
          .then((resp) => {
            setTimeout(() => {
              return resolve(resp)
            }, 500);
          })
        }
    },
    handleNodeClick(data) {
      //console.log(data.id);
    },
    
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
</style>
