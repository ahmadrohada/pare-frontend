<template>
    <modal 
    :show.sync="modalFormVisible" 
   >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="IndikatorSasaranStrategisForm"
        :model="IndikatorSasaranStrategisForm"
        :rules="rules"
        size="mini"
      >
       

        <label>Sasaran Strategis</label>
          <el-form-item  prop="sasaranStrategisId" >
            <el-select 
              v-model="IndikatorSasaranStrategisForm.sasaranStrategisId" 
              placeholder="Pilih Sasaran Strategis"
              style="width:100%"
              >
              <el-option
                v-for="item in sasaranStrategis"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>

        <label>Indikator Sasaran Strategis</label>
        <el-form-item     prop="indikatorSasaranStrategisLabel">
          <el-input size="mini" type="textarea" placeholder="Indikator Sasaran Strategis Label" v-model="IndikatorSasaranStrategisForm.indikatorSasaranStrategisLabel"></el-input>
        </el-form-item>

        <label>Target</label>
        <el-form-item     prop="target">
          <el-input size="mini" type="input" placeholder="Target" v-model="IndikatorSasaranStrategisForm.target"></el-input>
        </el-form-item>

        <label>Satuan Target</label>
        <el-form-item     prop="satuanTarget">
          <el-input size="mini" type="input" placeholder="Satuan Target" v-model="IndikatorSasaranStrategisForm.satuanTarget"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('IndikatorSasaranStrategisForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('IndikatorSasaranStrategisForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('IndikatorSasaranStrategisForm')">Tutup</el-button>
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
      headerText:'Indikator Sasaran Startegis Form',
      modalFormVisible: false,
      sasaranStrategis:[],
      IndikatorSasaranStrategisForm: {
        sasaranStrategisId:"",
        indikatorSasaranStrategisLabel:"",
        target:"",
        satuanTarget:""
       
      },
      rules: {
          sasaranStrategisId: [
            { required: true, message: 'Silakan Pilih Sasaran Strategis', trigger: 'blur' }
          ],
          indikatorSasaranStrategisLabel: [
            { required: true, message: 'Silakan isi Indikator Sasaran Strategis', trigger: 'blur' }
          ],
          target: [
            { required: true, message: 'Silakan isi Target', trigger: 'blur' }
          ],
          satuanTarget: [
            { required: true, message: 'Silakan isi Satuan Target', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    sasaranStrategisList(renjaId,selectedId){
       const isSelect = selectedId
          this.$axios
            .$get("/sasaran_strategis_select_list?renja_id="+renjaId)
            .then((resp) => {
              this.selectVisible = true
              this.sasaranStrategis =  resp.sasaran_strategis;
              if ( isSelect == 0 ){
                this.IndikatorSasaranStrategisForm.sasaranStrategisId = resp.sasaran_strategis[0].id // pilih data ke 1
              }else{
                this.IndikatorSasaranStrategisForm.sasaranStrategisId = isSelect
              }
              
              
              
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    
    showModalAdd(renjaId) {
      this.headerText = "Add Indikator Sasaran Startegis"
      this.sasaranStrategisList(renjaId,0)
      this.modalFormVisible = true;
    },  
    showModalEdit() {
      this.headerText = "Edit Indikator Sasaran Startegis"
      this.modalFormVisible = true;
    }, 
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/indikator_sasaran_strategis", this.IndikatorSasaranStrategisForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('IndikatorSasaranStrategisForm')
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

<style lang="scss">

.modal.show .modal-dialog {
    transform: none !important;
}

.modal .modal-header .close {
    visibility: hidden;
}
</style>