<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Create Renja</h4>
    </template>


      <div v-for="item in detailRenja" class="list-item">
        <span class="title">{{item.title}}</span>
        <span class="label">{{item.label}}</span>
      </div>
        

      <el-form
        ref="RenjaForm"
        :model="RenjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="RenjaForm.skpdId" hidden></input>
        <input v-model="RenjaForm.userId" hidden></input>
       
        <div>
          <label>Periode Renja</label>
          <el-form-item  prop="renjaId" >
            <el-select 
              v-model="RenjaForm.periodeId" 
              placeholder="Pilih Periode Renja"
              >
              <el-option
                v-for="item in periodeList"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        



        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader"  @click="saveForm('RenjaForm')"
            >Save</el-button
          >
          <el-button @click="resetForm('RenjaForm')">Tutup</el-button>
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
      formType: 'create',
      modalFormVisible: false,
      activeName: 'detail',
      submitLoader:false,
      periodeList:[],
      detailRenja:[],
      RenjaForm: {
        skpdId: "",
        periodeId:"",
        userId:""
      },
       rules: {
          periodeId: [
            { required: true, message: 'Silakan pilih Periode', trigger: 'blur' }
          ],
      },
   
    };
  },
  methods: {
    showModal(data) {
        this.submitLoader = false
        this.periodeList = data.periodeList
        this.RenjaForm.periodeId = data.periodeAktifId
        this.RenjaForm.skpdId = data.skpdId
        this.RenjaForm.userId = data.userId
        this.detailRenja = data.detailRenja
        this.modalFormVisible = true;
    },
    saveForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/renja", this.RenjaForm )
                    .then((response) => {
                      //console.log(response);
                      //this.nodeData.new = response
                      this.$emit('reloadTable')
                      //this.$refs[formName].resetFields();
                      this.modalFormVisible = false;
                      setTimeout(() => {
                        this.submitLoader = false
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((errors) => {
                      console.log(errors);
                    });

        } else {
            console.log('error submit!!');
            return false;
          }
      });
      
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
  .modal .modal-header .close {
    visibility: hidden;
  }
</style>