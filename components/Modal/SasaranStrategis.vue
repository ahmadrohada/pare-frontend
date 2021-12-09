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
        
         <input v-model="SasaranStrategisForm.renjaId" hidden></input>
        <label>Sasaran Strategis</label>
        <el-form-item     prop="sasaranStrategisLabel">
          <el-input size="mini" type="textarea" placeholder="Sasaran Strategis Label" v-model="SasaranStrategisForm.sasaranStrategisLabel"></el-input>
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
        renjaId:"",
        sasaranStrategisLabel:""
       
      },
      rules: {
          sasaranStrategisLabel: [
            { required: true, message: 'Silakan isi Sasaran Strategis', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    
    showModalAdd(renjaId) {
      this.headerText = "Add Sasaran Strategis"
      this.SasaranStrategisForm.renjaId = renjaId
      this.modalFormVisible = true;
    },  
    showModalEdit() {
      this.headerText = "Edit Sasaran Strategis"
      this.modalFormVisible = true;
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
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 200);
                    })
                    .catch((errors) => {
                      this.submitLoader = false
                      console.log(errors);
                      this.$message({
                        type: 'warning',
                        message: 'terjadi kesalahan'
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