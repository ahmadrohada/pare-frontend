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
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="saveForm('RencanahasilKerjaPimpinanForm')"
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
    showModalAdd(sasaranKinerjaId,RencanaKinerjaId) {
      this.sasaranKinerjaId = sasaranKinerjaId
      this.RencanahasilKerjaPimpinanForm.rencanaKinerjaId = RencanaKinerjaId
      this.resetForm("RencanahasilKerjaPimpinanForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "add"
      this.headerText = "Pilih Rencana Hasil Kerja Pimpinan"

      const params = [
                  `sasaran_kinerja_id=${sasaranKinerjaId}`,
                  `rencana_kinerja_id=${RencanaKinerjaId}`
                  
                  ].join('&')

      this.$axios
          .$get(`/rencana_hasil_kerja_pimpinan?${params}` )
          .then((resp) => {
              
              this.rencanaKinerja =  resp.rencana_hasil_kerja_pimpinan;
              this.RencanahasilKerjaPimpinanForm.rencanaKinerjaPimpinanId = resp.rencana_hasil_kerja_pimpinan[0].id // pilih data ke 1
             
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
    showModalEdit(sasaranKinerjaId,RencanaKinerjaId) {

      this.sasaranKinerjaId = sasaranKinerjaId
      this.RencanahasilKerjaPimpinanForm.rencanaKinerjaId = RencanaKinerjaId
      this.resetForm("RencanahasilKerjaPimpinanForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Pilih Rencana Hasil Kerja Pimpinan"


      const params = [
                  `sasaran_kinerja_id=${sasaranKinerjaId}`,
                  `rencana_kinerja_id=${RencanaKinerjaId}`
                  
                  ].join('&')

      this.$axios
          .$get(`/rencana_hasil_kerja_pimpinan?${params}` )
          .then((resp) => {
              const isSelect = resp.rencana_kinerja_detail.parent_id;
              //console.log(resp.rencana_kinerja_detail.parent_id)
              
              this.rencanaKinerja =  resp.rencana_hasil_kerja_pimpinan;

              
              if ( isSelect == null ){
                this.RencanahasilKerjaPimpinanForm.rencanaKinerjaPimpinanId = resp.rencana_hasil_kerja_pimpinan[0].id  // pilih data ke 1
              }else{
                this.RencanahasilKerjaPimpinanForm.rencanaKinerjaPimpinanId = isSelect
              } 
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