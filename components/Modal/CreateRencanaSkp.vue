<template>
    <modal 
    :show.sync="modalFormVisible" 
    >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Create Rencana SKP</h4>
    </template>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="min-height:260px;">
      <el-tab-pane label="Detail Rencana SKP" name="detail">
        <div v-for="item in data.detailRencanaSKP" class="list-item">
          <span class="title">{{item.title}}</span>
          <span class="label">{{item.label}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PEGAWAI" name="pegawai">
        <div v-for="item in data.pegawai" class="list-item">
          <span class="title">{{item.title}}</span>
          <span class="label">{{item.label}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PEJABAT PENILAI" name="pejabat_penilai">
        <div v-for="item in data.pejabatPenilai" class="list-item">
          <span class="title">{{item.title}}</span>
          <span class="label">{{item.label}}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-form
        ref="RencanaSKPForm"
        :model="RencanaSKPForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="RencanaSKPForm.renjaPejabatId" hidden></input>
        <input v-model="RencanaSKPForm.userId" hidden ></input>
        
       
        <el-form-item size="mini" style="margin-top:20px;">
          <el-button  type="primary"  :loading="submitLoader" @click="submitForm('RencanaSKPForm')"
            >Create</el-button
          >
          <el-button @click="resetForm()">Tutup</el-button>
        </el-form-item>
      </el-form>
    <template slot="footer"> </template>
  </modal>
</template>

<script>
import PareLoader from '~/components/Loader/PareLoader.vue';

export default {
  components:{
    PareLoader,
  },
  data() {
    return {
      modalFormVisible: false,
      activeName: 'detail',
      submitLoader:false,
      data:{
          detailRencanaSKP:null,
          pegawai:null,
          pejabatPenilai:null
      },
      RencanaSKPForm: {
        renjaPejabatId: "",
        userId:""
      },
   
    };
  },
  methods: {
    showModal(data) {
        this.data = data
        this.RencanaSKPForm.renjaPejabatId = data.renjaPejabatId
         this.RencanaSKPForm.userId = data.userId
        this.modalFormVisible = true;
    },
    submitForm(formName) {

        this.submitLoader = true
        this.$axios
                    .$post("/create_rencana_skp", this.RencanaSKPForm )
                    .then((response) => {
                      //console.log(response);
                      //this.nodeData.new = response
                      //this.$emit('reloadTree', this.nodeData )
                      //this.$refs[formName].resetFields();
                      this.modalFormVisible = false;
                      setTimeout(() => {
                        this.submitLoader = false
                        this.$message({
                          type: 'info',
                          duration:3000,
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((errors) => {
                      console.log(errors);
                    });

        //this.submitLoader = false
      
    },
    resetForm() {
      this.submitLoader = false
      this.modalFormVisible = false;
    },
  },
  mounted() {
      
  }
};
</script>
<style scope>

.modal.show .modal-dialog {
    transform: translate(0, 15%) !important;
}

.modal-dialog {
    max-width: 500px !important;
}

.list-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    line-height: 1.25em;
    white-space: nowrap;
    margin-bottom: 14px;
}
  
  .title{
    color:rgb(36, 36, 37);
    margin-bottom: 5px;
    font-weight: 100;
    line-height: 1.0em;
    font-size: 0.85em;
 
  }

  .label{
    
    color:#92989b;
  }
</style>