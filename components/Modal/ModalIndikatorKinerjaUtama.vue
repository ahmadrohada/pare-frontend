<template>
    <modal 
    :show.sync="modalFormVisible" 
   >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="IndikatorKinerjaUtamaForm"
        :model="IndikatorKinerjaUtamaForm"
        :rules="rules"
        size="mini"
      >
       
        <input v-model="IndikatorKinerjaUtamaForm.indikatorId" hidden></input>

          <el-form-item label="Sasaran Strategis" prop="sasaranStrategisId" >
            <el-select 
              v-model="IndikatorKinerjaUtamaForm.sasaranStrategisId" 
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

        <el-form-item    label ="Indikator Kinerja Utama" prop="indikatorSasaranStrategisLabel">
          <el-input size="mini" autosize type="textarea" placeholder="Indikator Kinerja Utama Label" v-model="IndikatorKinerjaUtamaForm.indikatorSasaranStrategisLabel"></el-input>
        </el-form-item>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            
            <el-form-item label="Type Target">
              <el-select 
                @change="onChangeTypeTarget($event)"
                v-model="IndikatorKinerjaUtamaForm.typeTarget" 
                clearable
                placeholder="pilih Type Target">
                <el-option label="Single Rate" value="1" ></el-option>
                <el-option label="Range" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item   label="Target Min"  prop="targetMin">
              <el-input :disabled="targetMinDisabled" size="mini" type="input" placeholder="Target Min" v-model="IndikatorKinerjaUtamaForm.targetMin"></el-input>
            </el-form-item>
          </el-col>

           <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  label="Target Max"   prop="targetMax">
              <el-input :disabled="targetMaxDisabled" size="mini" type="input" placeholder="Target Max" v-model="IndikatorKinerjaUtamaForm.targetMax"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item  label="Satuan Target"   prop="satuanTarget">
          <el-input size="mini" type="input" placeholder="Satuan Target" v-model="IndikatorKinerjaUtamaForm.satuanTarget"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('IndikatorKinerjaUtamaForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('IndikatorKinerjaUtamaForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('IndikatorKinerjaUtamaForm')">Tutup</el-button>
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
      headerText:'Indikator Sasaran Utama Form',
      modalFormVisible: false,
      sasaranStrategis:[],
      IndikatorKinerjaUtamaForm: {
        sasaranStrategisId:"",
        indikatorId:"",
        indikatorSasaranStrategisLabel:"",
        typeTarget:"",
        targetMin:"",
        targetMax:"",
        satuanTarget:""
       
      },
      targetMinDisabled:true,
      targetMaxDisabled:true,
      rules: {
          sasaranStrategisId: [
            { required: true, message: 'Silakan Pilih Sasaran Strategis', trigger: 'blur' }
          ],
          indikatorSasaranStrategisLabel: [
            { required: true, message: 'Silakan isi Indikator Kinerja Utama', trigger: 'blur' }
          ],
          targetMax: [
            { required: true, message: 'Silakan isi Target Max', trigger: 'blur' }
          ],
          targetMin: [
            { required: true, message: 'Silakan isi Target Min', trigger: 'blur' }
          ],
          typeTarget: [
            { required: true, message: 'Silakan isi Type Target', trigger: 'blur' }
          ],
          satuanTarget: [
            { required: true, message: 'Silakan isi Satuan Target', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    sasaranStrategisList(perjanjianKinerjaId,selectedId){
       const isSelect = selectedId
          this.$axios
            .$get("/sasaran_strategis_select_list?perjanjian_kinerja_id="+perjanjianKinerjaId)
            .then((resp) => {
              this.selectVisible = true
              this.sasaranStrategis =  resp.sasaran_strategis;
              if ( isSelect == 0 ){
                this.IndikatorKinerjaUtamaForm.sasaranStrategisId = resp.sasaran_strategis[0].id // pilih data ke 1
              }else{
                this.IndikatorKinerjaUtamaForm.sasaranStrategisId = isSelect
              }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    
    showModalAdd(perjanjianKinerjaId,sasaranStrategisId) {
      this.resetForm("IndikatorKinerjaUtamaForm")
      this.IndikatorKinerjaUtamaForm.typeTarget = ""
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "create"
      this.headerText = "Add Indikator Kinerja Utama"
      this.sasaranStrategisList(perjanjianKinerjaId,sasaranStrategisId)
      this.modalFormVisible = true;
    },  
    showModalEdit(id) {
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Edit Indikator Kinerja Utama"
      this.$axios
          .$get("/indikator_sasaran_strategis?id="+id )
          .then((resp) => {
            
            this.IndikatorKinerjaUtamaForm.indikatorId = resp.id
            this.sasaranStrategisList(resp.perjanjian_kinerja_id,resp.sasaran_strategis_id)
            this.IndikatorKinerjaUtamaForm.indikatorSasaranStrategisLabel = resp.label
            this.IndikatorKinerjaUtamaForm.typeTarget = resp.type_target
            this.IndikatorKinerjaUtamaForm.targetMin = resp.target_min
            this.IndikatorKinerjaUtamaForm.targetMax = resp.target_max
            this.IndikatorKinerjaUtamaForm.satuanTarget = resp.satuan_target

            //persiapkan type target
            if (resp.type_target == 1){
              this.targetMinDisabled = true 
              this.targetMaxDisabled = false
            }else if (resp.type_target == 2 ){
              this.targetMinDisabled = false 
              this.targetMaxDisabled = false
            }else{
              this.targetMinDisabled = true 
              this.targetMaxDisabled = true
            }

            this.modalFormVisible = true;
            
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
                    .$post("/indikator_sasaran_strategis", this.IndikatorKinerjaUtamaForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('IndikatorKinerjaUtamaForm')
                        this.$message({
                          type: 'success',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 100);
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
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$put("/indikator_sasaran_strategis", this.IndikatorKinerjaUtamaForm )
                    .then((response) => {
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.resetForm('IndikatorKinerjaUtamaForm')
                        this.$message({
                          type: 'success',
                          message: 'Update Berhasil'
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
      this.type_target=''
      this.modalFormVisible = false;
      this.submitLoader = false
    },
    onChangeTypeTarget(event) {
      console.log(event)
      if (event == 1){
        this.targetMinDisabled = true 
        this.targetMaxDisabled = false
        this.IndikatorKinerjaUtamaForm.targetMin = '-'
      }else if (event == 2 ){
        this.targetMinDisabled = false 
        this.targetMaxDisabled = false
        this.IndikatorKinerjaUtamaForm.targetMin = null
      }else{
        this.targetMinDisabled = true 
        this.targetMaxDisabled = true
      }
    }
   
   
  },
  mounted() {
      
  }
};
</script>

<style lang="scss" scope>

  .el-select-dropdown__item {
    width: 450px;
    white-space: normal;
    overflow: unset;
    height: auto;
    line-height: 20px;
    margin-bottom:7px;
  }

/* .modal.show .modal-dialog {
    transform: none !important;
}
 */
.modal .modal-header .close {
    visibility: hidden;
}

</style>