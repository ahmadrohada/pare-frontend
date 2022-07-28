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
        size="mini"
      >
       
        
          <el-form-item label="Rencana Hasil Kerja Pimpinan" prop="rencanaKinerjaPimpinanId" >
            <el-select 
              v-model="RencanahasilKerjaPimpinanForm.rencanaKinerjaPimpinanId" 
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
      submitLoader:false,
      sasaranKinerjaId:"",
      headerText:'Indikator Kinerja Individu Form',
      modalFormVisible: false,
      rencanaKinerja:[],
      RencanahasilKerjaPimpinanForm: {
        rencanaKinerjaPimpinanId:"",
       
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
    showModalAdd(sasaranKinerjaId,RencanaKinerjaId) {
      this.sasaranKinerjaId = sasaranKinerjaId
      this.RencanahasilKerjaPimpinanForm.rencanaKinerjaId = RencanaKinerjaId
      this.resetForm("RencanahasilKerjaPimpinanForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "add"
      this.headerText = "Pilih Rencana Hasil Kerja Pimpinan"

      this.$axios
          .$get("/rencana_hasil_kerja_pimpinan?sasaran_kinerja_id="+sasaranKinerjaId )
          .then((resp) => {
              //this.rencanaKinerjaList(resp.sasaran_kinerja_id,resp.rencana_kinerja_id)
              this.rencanaKinerja =  resp.rencana_kinerja;
              setTimeout(() => {
                  this.$refs.loader.finish() 
                  this.modalFormVisible = true;
              }, 800);
              
          })
          .catch((error) => {
            this.$message({
              type: 'warning',
              message: error.response.data.message
            }); 
          });       
      
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
                    .$post("/rencana_hasil_kerja_pimpinan", this.RencanahasilKerjaPimpinanForm )
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