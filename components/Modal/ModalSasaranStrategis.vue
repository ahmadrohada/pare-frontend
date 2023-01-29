<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="SasaranStrategisForm"
        :model="SasaranStrategisForm"
        :rules="rules"
        size="mini"
      >
        
        <input v-model="SasaranStrategisForm.perjanjianKinerjaId" hidden></input>
        <input v-model="SasaranStrategisForm.sasaranStrategisId" hidden></input>
      
        <el-form-item   label="Sasaran Strategis"  prop="sasaranStrategisLabel">
          <el-input size="mini" autosize type="textarea" placeholder="Sasaran Strategis Label" v-model="SasaranStrategisForm.sasaranStrategisLabel"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('SasaranStrategisForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('SasaranStrategisForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('SasaranStrategisForm')">Tutup</el-button>
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
      selectVisible:true,
      submitLoader:false,
      headerText:'Sasaran Startegis Form',
      modalFormVisible: false,
      SasaranStrategisForm: {
        perjanjianKinerjaId:"",
        sasaranStrategisLabel:"",
        sasaranStrategisId:""
       
      },
      rules: {
          sasaranStrategisLabel: [
            { required: true, message: 'Silakan isi Sasaran Strategis', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    
    showModalAdd(perjanjianKinerjaId) {
      this.resetForm("SasaranStrategisForm")
      this.submitLoader = false
      this.formType = "create"
      this.headerText = "Add Sasaran Strategis"
      this.SasaranStrategisForm.perjanjianKinerjaId = perjanjianKinerjaId
      this.modalFormVisible = true;
    },  
    showModalEdit(id) {
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Edit Sasaran Startegis"
      this.$axios
          .$get("/sasaran_strategis?id="+id )
          .then((resp) => {
            
            this.SasaranStrategisForm.sasaranStrategisId = resp.id
            this.SasaranStrategisForm.sasaranStrategisLabel = resp.label
            this.modalFormVisible = true;
            this.$refs.loader.finish()
            
          })
          .catch((errors) => {
            this.$message({
              type: 'warning',
              message: 'terjadi kesalahan'
            }); 
          }); 
    }, 
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/sasaran_strategis", this.SasaranStrategisForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('SasaranStrategisForm')
                        this.$message({
                          type: 'success',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((error) => {
                      this.submitLoader = false
                      console.log(error);
                      this.$message({
                        type: 'warning',
                        message: error.response.data.message
                      }); 
                    });


          } else {
            console.log('error submit!!');
            return false;
          }
      });
        
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$put("/sasaran_strategis", this.SasaranStrategisForm )
                    .then((response) => {
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.resetForm('SasaranStrategisForm')
                        this.$message({
                          type: 'success',
                          message: 'Update Berhasil'
                        }); 
                      }, 200);
                    })
                    .catch((error) => {
                      this.submitLoader = false
                      console.log(error);
                      this.$message({
                        type: 'warning',
                        message: error.response.data.message
                      }); 
                    }); 


          } else {
            console.log('error submit!!');
            return false;
          }
      });
        
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
      this.submitLoader = false
    },
   
  },
  mounted() {
      
  }
};
</script>
<style>


.modal .modal-header .close {
    visibility: hidden;
}
</style>