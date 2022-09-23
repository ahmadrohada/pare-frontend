<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>

    <el-form
        ref="EkspektasiForm"
        :model="EkspektasiForm"
        :rules="rules"
        size="mini"
      >

      
        <el-form-item   label="Ekspektasi Khusus Pimpinan"  prop="ekspektasiLabel">
          <el-input 
            :rows="3"
            type="textarea" 
            placeholder="Ekspektasi Khusus Pimpinan" 
            v-model="EkspektasiForm.perilakuKerjaLabel">
            </el-input>
        </el-form-item>


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('EkspektasiForm')"
              >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('EkspektasiForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('EkspektasiForm')">Tutup</el-button>

          <el-button style="float:right;" v-if="formType=='edit'" type="danger"  @click="deleteForm('EkspektasiForm')"
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
      headerText:'Tambah Ekspektasi Khusus Pimpinan',
      modalFormVisible: false,
      EkspektasiForm:{
          sasaranKinerjaId:null,
          coreValueId:null,
          perilakuKerjaId:null,
          perilakuKerjaLabel:""
      },
      rules: {
          perilakuKerjaLabel: [
            { required: true, message: 'Harus diisi', trigger: 'blur' }
          ],
      },
      //loading: true
    };
  },
  methods: {
     
    showModalAdd(e) {
     
      this.resetForm("EkspektasiForm")
      this.submitLoader = false
      this.formType = "create"
      this.EkspektasiForm.perilakuKerjaLabel = "",

      this.EkspektasiForm.sasaranKinerjaId = e.skp_id
      this.EkspektasiForm.coreValueId = e.id

      this.$refs.loader.start() 

      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 700);
      this.modalFormVisible = true;
    }, 
    showModalEdit(e) {

      this.submitLoader = false
      this.headerText = 'Edit Ekspektasi Khusus Pimpinan'
      this.$refs.loader.start() 
      this.formType = "edit"
      this.EkspektasiForm.perilakuKerjaLabel = e.label
      this.EkspektasiForm.perilakuKerjaId = e.id
      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 700);
      this.modalFormVisible = true;
          
    
      
    }, 
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true
          this.$axios
            .$post("/sasaran_kinerja_perilaku_kerja", this.EkspektasiForm )
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
    updateForm(formName) {
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true
          this.$axios
            .$put("/sasaran_kinerja_perilaku_kerja", this.EkspektasiForm )
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
      this.$confirm('Hapus Data ?', 'Konfirmasi', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/sasaran_kinerja_perilaku_kerja?id="+this.EkspektasiForm.perilakuKerjaId)
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
            .$put("/hasil", this.EkspektasiForm )
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
    this.EkspektasiForm.periode = this.$route.params.periode
    this.EkspektasiForm.roleId = this.$route.params.roleId
      
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