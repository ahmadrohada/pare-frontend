<template>
    <modal 
    :show.sync="modalFormVisible" 
   >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="RencanahasilKerjaPimpinanForm"
        :model="RencanahasilKerjaPimpinanForm"
        :rules="rules"
        size="mini"
      >
       
        <input v-model="RencanahasilKerjaPimpinanForm.indikatorId" hidden></input>

          <el-form-item label="Rencana Hasil Kerja" prop="rencanaKinerjaId" >
            <el-select 
              v-model="RencanahasilKerjaPimpinanForm.rencanaKinerjaId" 
              placeholder="Pilih Rencana Hasil Kerja"
              style="width:100%"
              >
              <el-option
                v-for="item in rencanaKinerja"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>

        <el-form-item    label ="Indikator Kinerja Individu" prop="indikatorKinerjaIndividuLabel">
          <el-input size="mini" autosize type="textarea" placeholder="Indikator Kinerja Individu Label" v-model="RencanahasilKerjaPimpinanForm.indikatorKinerjaIndividuLabel"></el-input>
        </el-form-item>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            
            <el-form-item label="Type Target">
              <el-select 
                @change="onChangeTypeTarget($event)"
                v-model="RencanahasilKerjaPimpinanForm.typeTarget" 
                placeholder="pilih Type Target">
                <el-option label="Single Rate" value="1" ></el-option>
                <el-option label="Range" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item   label="Target Min"  prop="targetMin">
              <el-input :disabled="targetMinDisabled" size="mini" type="input" placeholder="Target Min" v-model="RencanahasilKerjaPimpinanForm.targetMin"></el-input>
            </el-form-item>
          </el-col>

           <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item  label="Target Max"   prop="targetMax">
              <el-input :disabled="targetMaxDisabled" size="mini" type="input" placeholder="Target Max" v-model="RencanahasilKerjaPimpinanForm.targetMax"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item  label="Satuan Target"   prop="satuanTarget">
          <el-input size="mini" type="input" placeholder="Satuan Target" v-model="RencanahasilKerjaPimpinanForm.satuanTarget"></el-input>
        </el-form-item>

        <el-form-item  v-if="(this.jenisJabatanSkp == 'JABATAN PIMPINAN TINGGI')" label ="Perspektif" prop="perspektif">
          <el-input size="mini" type="input" placeholder="Perspektif" v-model="RencanahasilKerjaPimpinanForm.perspektif"></el-input>
        </el-form-item>

        <el-form-item  v-if="(this.jenisJabatanSkp != 'JABATAN PIMPINAN TINGGI')" label ="Aspek" prop="aspek">
          <!-- <el-input size="mini" type="input" placeholder="Aspek" v-model="RencanahasilKerjaPimpinanForm.aspek"></el-input> -->
           <el-select 
            v-model="RencanahasilKerjaPimpinanForm.aspek" 
            default-first-option
            placeholder="pilih Aspek Indikator Kinerja Individu">
            <el-option label="Kuantitas" value="kuantitas" ></el-option>
            <el-option label="Kualitas" value="kualitas"></el-option>
            <el-option label="Waktu" value="waktu"></el-option>
            <el-option label="Biaya" value="biaya"></el-option>
          </el-select>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='add'" type="primary"  :loading="submitLoader" @click="saveForm('RencanahasilKerjaPimpinanForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('RencanahasilKerjaPimpinanForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('RencanahasilKerjaPimpinanForm')">Tutup</el-button>
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
      formType: 'add',
      selectVisible:true,
      submitLoader:false,
      jenisJabatanSkp:null,
      headerText:'Indikator Kinerja Individu Form',
      modalFormVisible: false,
      rencanaKinerja:[],
      RencanahasilKerjaPimpinanForm: {
        rencanaKinerjaId:"",
        indikatorId:"",
        indikatorKinerjaIndividuLabel:"",
        targetMin:"",
        targetMax:"",
        satuanTarget:"",
        perspektif:"",
        aspek:""
       
      },
      targetMinDisabled:true,
      targetMaxDisabled:true,
      rules: {
          rencanaKinerjaId: [
            { required: true, message: 'Silakan Pilih Sasaran Strategis', trigger: 'blur' }
          ],
          indikatorKinerjaIndividuLabel: [
            { required: true, message: 'Silakan isi Indikator Sasaran Strategis', trigger: 'blur' }
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
    rencanaKinerjaList(sasaranKinerjaId,selectedId){
       const isSelect = selectedId
          this.$axios
            .$get("/rencana_kinerja_select_list?sasaran_kinerja_id="+sasaranKinerjaId)
            .then((resp) => {
              this.selectVisible = true
              this.rencanaKinerja =  resp.rencana_kinerja;
              if ( isSelect == 0 ){
                this.RencanahasilKerjaPimpinanForm.rencanaKinerjaId = resp.rencana_kinerja[0].id // pilih data ke 1
              }else{
                this.RencanahasilKerjaPimpinanForm.rencanaKinerjaId = isSelect
              }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    showModalAdd(sasaranKinerjaId) {
      this.resetForm("RencanahasilKerjaPimpinanForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "add"
      this.headerText = "Pilih Rencana Hasil Kerja Pimpinan"

      this.$axios
          .$get("/rencana_hasil_kerja_pimpinan?sasaran_kinerja_id="+sasaranKinerjaId )
          .then((resp) => {
            
            
          })
          .catch((error) => {
            this.$message({
              type: 'warning',
              message: error.response.data.message
            }); 
          });       
      //this.modalFormVisible = true;
    },  
    showModalEdit(id) {
      this.resetForm("RencanahasilKerjaPimpinanForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Edit Indikator Kinerja Individu"
      this.$axios
          .$get("/indikator_kinerja_individu?id="+id )
          .then((resp) => {
            
            this.RencanahasilKerjaPimpinanForm.indikatorId = resp.id
            this.rencanaKinerjaList(resp.sasaran_kinerja_id,resp.rencana_kinerja_id)
            this.RencanahasilKerjaPimpinanForm.indikatorKinerjaIndividuLabel = resp.label
            this.RencanahasilKerjaPimpinanForm.typeTarget = resp.type_target
            this.RencanahasilKerjaPimpinanForm.targetMin = resp.target_min
            this.RencanahasilKerjaPimpinanForm.targetMax = resp.target_max
            this.RencanahasilKerjaPimpinanForm.satuanTarget = resp.satuan_target
            this.RencanahasilKerjaPimpinanForm.perspektif = resp.perspektif
            this.RencanahasilKerjaPimpinanForm.aspek = resp.aspek

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
          .catch((error) => {
            this.$message({
              type: 'warning',
              message: error.response.data.message
            }); 
          }); 
    }, 
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/indikator_kinerja_individu", this.RencanahasilKerjaPimpinanForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('RencanahasilKerjaPimpinanForm')
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 100);
                    })
                    .catch((error) => {
                      this.submitLoader = false
                      console.log(errors);
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
                    .$put("/indikator_kinerja_individu", this.RencanahasilKerjaPimpinanForm )
                    .then((response) => {
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.resetForm('RencanahasilKerjaPimpinanForm')
                        this.$message({
                          type: 'info',
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
      this.onChangeTypeTarget(1);
      this.modalFormVisible = false;
      this.submitLoader = false
    },
    onChangeTypeTarget(event) {
      console.log(event)
      if (event == 1){
        this.RencanahasilKerjaPimpinanForm.typeTarget = '1'
        this.targetMinDisabled = true 
        this.targetMaxDisabled = false
        this.RencanahasilKerjaPimpinanForm.targetMin = '-'
      }else if (event == 2 ){
        this.RencanahasilKerjaPimpinanForm.typeTarget = '2'
        this.targetMinDisabled = false 
        this.targetMaxDisabled = false
        this.RencanahasilKerjaPimpinanForm.targetMin = null
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

<style lang="scss">

.modal.show .modal-dialog {
    transform: none !important;
}

.modal .modal-header .close {
    visibility: hidden;
}

</style>