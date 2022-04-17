<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>

    <el-form
        ref="OutcomeForm"
        :model="OutcomeForm"
        :rules="rules"
        size="mini"
      >


        <!-- ================= SASARAN KINERJA DAN IKU PK ============================== -->
        <div v-show="selectVisibleSasaranStrategis == true">
          <el-form-item  
            label="Sasaran Strategis"   
            prop="sasaranStrategisId">
            <el-select 
                v-model="OutcomeForm.sasaranStrategisId" 
                placeholder="Pilih Sasaran Strategis PK"
                style="width:100% !important;"
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

          <el-form-item  
            label="Indikator Kinerja Utama"   
            prop="indikatorKinerjaUtamaId">
            <el-select 
                v-model="OutcomeForm.indikatorKinerjaUtamaId" 
                placeholder="Pilih Indikator Kinerja Utama"
                style="width:100% !important;"
                >
                <el-option
                  v-for="item in indikatorKinerjaUtama"
                  :selected="item.id"
                  :key="item.label"
                  :label="item.label"
                  :value="item.id"
                  >
                </el-option>
            </el-select>
          </el-form-item>
        </div>
       





        <el-form-item  
          label="Outcome Atasan"   
          prop="outcomeAtasanId"
          v-show="selectVisibleOutcomeAtasan == true">
          <el-select 
              v-model="OutcomeForm.outcomeAtasanId" 
              placeholder="Pilih Outcome Atasan"
              style="width:100% !important;"
              >
              <el-option
                v-for="item in outcomeAtasan"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item   label="Label"  prop="outcomeLabel">
          <el-input 
            :rows="2"
            type="textarea" 
            placeholder="Outcome Label" 
            v-model="OutcomeForm.outcomeLabel">
            </el-input>
        </el-form-item>

    
        <input v-model="OutcomeForm.skpdId" hidden></input>
        <input v-model="OutcomeForm.periode" hidden></input>
        <input v-model="OutcomeForm.roleId" hidden></input>
        <input v-model="OutcomeForm.level"  hidden></input>
        <input v-model="OutcomeForm.outcomeId"  hidden></input>


     

        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('OutcomeForm')"
              >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('OutcomeForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('OutcomeForm')">Tutup</el-button>

          <el-button style="float:right;" v-if="formType=='edit'" type="danger"  @click="deleteForm('OutcomeForm')"
            >Delete</el-button
          >

        </el-form-item>

      </el-form>
         
    <template slot="footer"></template>
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
      submitLoader:false,
      headerText:'Tambah Outcome / Hasil',
      modalFormVisible: false,
      selectVisibleOutcomeAtasan:false,
      selectVisibleSasaranStrategis:false,
      params:[],
      outcomeAtasan:[],
      sasaranStrategis:[],
      indikatorKinerjaUtama:[],
      OutcomeForm:{
          skpdId:null,
          periode:null,
          roleId:null,
          level:null,
          outcomeLabel:null,
          outcomeAtasanId:null,
          outcomeId:null,
          sasaranStrategisId:null,
          indikatorKinerjaUtamaId:null
      },
      rules: {
          outcomeLabel: [
            { required: true, message: 'Silakan pilih Label Outcome', trigger: 'blur' }
          ],
      },
      //loading: true
    };
  },
  methods: {
     outcomeAtasanList(skpdId,periode,roleId,selectedId){
       const isSelect = selectedId
       const params = [
          `periode=${periode}`,
          `skpd_id=${skpdId}`,
          `role_id=${roleId}`,
        ].join('&')

          this.$axios
            .get(`/list_outcome_atasan?${params}`)
            .then((data) => {
              this.outcomeAtasan =  data.data.outcomeAtasan;
              if ( isSelect == 0 ){
                this.OutcomeForm.outcomeAtasanId = data.data.outcomeAtasan[0].id // pilih data ke 1
              }else{
                this.OutcomeForm.outcomeAtasanId = isSelect
              }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    showModalAdd(e) {
     
      this.resetForm("OutcomeForm")
      this.submitLoader = false
      this.formType = "create"

      this.OutcomeForm.skpdId = e.skpd_id
      this.OutcomeForm.level = e.level
      this.OutcomeForm.roleId = e.id
      this.OutcomeForm.outcomeLabel = ""
      this.OutcomeForm.outcomeAtasanId = null

      

      if ( e.level != "S2" ){
        this.outcomeAtasanList(e.skpd_id,this.OutcomeForm.periode,e.id,0)
        this.selectVisibleOutcomeAtasan = true
        this.selectVisibleSasaranStrategis = false
        //munculkan list outcome atasan
      }else{
        //ini jika S2 atau koordinator atau kabid
        this.selectVisibleOutcomeAtasan = false
        this.selectVisibleSasaranStrategis = true






      }

      this.$refs.loader.start() 

      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 700);
      this.modalFormVisible = true;
    }, 
    showModalEdit(e) {

      this.submitLoader = false
      this.headerText = 'Edit Outcome / Hasil'
      this.$refs.loader.start() 
      this.formType = "edit"

      const params = [
        `outcome_id=${e.id}`,
      ].join('&')

      this.$axios
        .$get(`/hasil?${params}`)
        .then(({ data }) => {
              
          this.OutcomeForm.skpdId = data.skpd_id
          this.OutcomeForm.periode = data.periode
          this.OutcomeForm.level = data.level
          this.OutcomeForm.roleId = data.role_id
          this.OutcomeForm.outcomeLabel = data.label
          this.OutcomeForm.outcomeId = data.id

          this.OutcomeForm.outcomeAtasanId = null

          

          if ( data.level != "S2" ){
            this.outcomeAtasanList(data.skpd_id,data.periode,data.role_id,data.parent_id)
            this.selectVisibleOutcomeAtasan = true
            this.selectVisibleSasaranStrategis = false
            
          }else{
            this.selectVisibleOutcomeAtasan = false
            this.selectVisibleSasaranStrategis = true
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 300); 
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
            .$post("/hasil", this.OutcomeForm )
            .then((response) => {
              this.$emit('loadAsyncData');
              setTimeout(() => {
                    this.modalFormVisible = false;
                    this.submitLoader = false
                    this.$message({
                      type: 'info',
                      message: 'berhasil menyimpan data'
                    }); 
              }, 200);
                          
                          
            })
            .catch((error) => {
                this.submitLoader = false
                this.$message({
                  type: 'error',
                  duration: 2000,
                  message: "Tidak Berhasil Menyimpan Data"
                });    
            });
        }else{
            console.log('error submit!!');
            return false;
          }
      });
      
    },
    handleSelectionChange(val) {
        this.OutcomeForm.selectedRoles = val;

        if ( this.OutcomeForm.selectedRoles != "" ){
          this.disabled = false
        }else{
          this.disabled = true
        }
        
        //console.log(this.selectedRoles)
    },
    updateForm(formName) {
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true
          this.$axios
            .$put("/hasil", this.OutcomeForm )
            .then((response) => {
              this.$emit('loadAsyncData');
              setTimeout(() => {
                    this.modalFormVisible = false;
                    this.submitLoader = false
                    this.$message({
                      type: 'info',
                      message: 'berhasil mengupdate data'
                    }); 
              }, 200);
                          
                          
            })
            .catch((error) => {
                this.submitLoader = false
                this.$message({
                  type: 'error',
                  duration: 2000,
                  message: "Tidak Berhasil mengupdate Data"
                });    
            });

        }else{
          console.log('error submit!!');
          return false;
        }
      });

    },
    deleteForm(formName) {
      this.$confirm('Ini akan menghapus Outcome, Semua outcome bawahan ikut terhapus !', 'Konfirmasi', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/hasil?id="+this.OutcomeForm.outcomeId)
            .then((resp) => {
                this.modalFormVisible = false;
                this.$emit('loadAsyncData');
                this.$message({
                  type: 'success',
                  message: 'Berhasil dihapus'
                });
            })
            .catch((error) => {
               this.$message({
                  type: 'error',
                  duration: 2000,
                  message: "Tidak Berhasil Menghapus Data"
                });          
            });

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Proses Hapus Dibatalkan'
          });          
        });
       
          /* this.submitLoader = true
          this.$axios
            .$put("/hasil", this.OutcomeForm )
            .then((response) => {
              this.$emit('loadAsyncData');
              setTimeout(() => {
                    this.modalFormVisible = false;
                    this.submitLoader = false
                    this.$message({
                      type: 'info',
                      message: 'berhasil mengupdate data'
                    }); 
              }, 200);
                          
                          
            })
            .catch((error) => {
                this.submitLoader = false
                this.$message({
                  type: 'error',
                  duration: 2000,
                  message: "Tidak Berhasil mengupdate Data"
                });    
            }); */


    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
      this.submitLoader = false
    },
   
  },
  mounted() {
    this.OutcomeForm.periode = this.$route.params.periode
    this.OutcomeForm.roleId = this.$route.params.roleId
      
  }
};
</script>
<style lang="scss" scope>

/*  .el-select {
    width: 100%;
  }

  .el-select-group__title{
      color: rgb(102, 102, 102) !important;
    } */

  .el-select-dropdown__item {
    width: 450px;
    white-space: normal;
    overflow: unset;
    height: auto;
    line-height: 20px;
    margin-bottom:7px;
  }




  .modal .modal-header .close {
      visibility: hidden;
  }

</style>