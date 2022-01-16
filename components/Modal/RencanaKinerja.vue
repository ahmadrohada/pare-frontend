<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="RencanaKinerjaForm"
        :model="RencanaKinerjaForm"
        :rules="rules"
        size="mini"
      >
        
        <input v-model="RencanaKinerjaForm.sasaranKinerjaId" hidden></input>
        <input v-model="RencanaKinerjaForm.rencanaKinerjaId" hidden></input>
       
        <el-form-item label="Jenis Rencana Kinerja" prop="jenisRencanaKinerja">
          <el-select 
            @change="onChangeJenisRencanaKinerja($event)"
            v-model="RencanaKinerjaForm.jenisRencanaKinerja" 
            placeholder="pilih Jenis Rencana Kinerja">
            <el-option label="Kinerja Utama" value="kinerja_utama" ></el-option>
            <el-option label="Kinerja Tambahan" value="kinerja_tambahan"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-show="isVisibleTypeKinerjaUtama" label="Type Kinerja Utama" prop="typeKinerjaUtama">
          <el-select 
            v-model="RencanaKinerjaForm.typeKinerjaUtama" 
            default-first-option
            placeholder="pilih Type Kinerja Utama">
            <el-option label="Perjanjian Kinerja" value="perjanjian_kinerja" ></el-option>
            <el-option label="Direktif" value="direktif"></el-option>
            <el-option label="Inisiatif Strategis" value="inisiatif_strategis"></el-option>
            <el-option label="Rencana Aksi" value="rencana_aksi"></el-option>
          </el-select>
        </el-form-item>

        
        
        
        <el-form-item v-show="isVisibleTypeKinerjaTambahan" label="Lingkup Penugasan" prop="lingkupPenugasan">
          <el-select v-model="RencanaKinerjaForm.lingkupPenugasan" placeholder="pilih Lingkup Penugasan">
            <el-option-group
              v-for="group in optionsLingkupPenugasan"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

       
        <el-form-item   label="Rencana Kinerja"  prop="rencanaKinerjaLabel">
          <el-input size="mini" autosize type="textarea" placeholder="Rencana Kinerja Label" v-model="RencanaKinerjaForm.rencanaKinerjaLabel"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('RencanaKinerjaForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('RencanaKinerjaForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('RencanaKinerjaForm')">Tutup</el-button>
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
      submitLoader:false,
      headerText:'Rencana Kinerja Form',
      modalFormVisible: false,
      isVisibleTypeKinerjaUtama:true,
      isVisibleTypeKinerjaTambahan:false,
      RencanaKinerjaForm: {
        sasaranKinerjaId:"",
        rencanaKinerjaLabel:"",
        rencanaKinerjaId:"",
        jenisRencanaKinerja:"",
        typeKinerjaUtama:"",
        lingkupPenugasan:""
       
      },
      rules: {
          rencanaKinerjaLabel: [
            { required: true, message: 'Silakan isi Rencana Kinerja', trigger: 'blur' }
          ],
          jenisRencanaKinerja: [
            { required: true, message: 'Silakan pilih jenis Rencana Kinerja', trigger: 'blur' }
          ],
      },
      optionsLingkupPenugasan: [{
          label: 'Instansi Pusat',
          options: [{
            value: 'Dalam satu unit kerja',
            label: 'Dalam satu unit kerja'
          }, {
            value: 'Antar unit kerja dalam satu Instansi',
            label: 'Antar unit kerja dalam satu Instansi'
          }, {
            value: 'Antar Instansi (Pusat-Pusat/Pusat-Daerah)',
            label: 'Antar Instansi (Pusat-Pusat/Pusat-Daerah)'
          }]
        }, {
          label: 'Instansi Daerah',
          options: [{
            value: 'Dalam satu perangkat daerah',
            label: 'Dalam satu perangkat daerah'
          }, {
            value: 'Antar perangkat daerah dalam satu daerah',
            label: 'Antar perangkat daerah dalam satu daerah'
          }, {
            value: 'Antar daerah (Daerah-Daerah/Daerah-Pusat)',
            label: 'Antar daerah (Daerah-Daerah/Daerah-Pusat)'
          }]
        }],
      
    };
  },
  methods: {
    
    showModalAdd(sasaranKinerjaId) {
      this.resetForm("RencanaKinerjaForm")
      this.submitLoader = false
      this.formType = "create"
      this.headerText = "Add Rencana Kinerja"
      this.RencanaKinerjaForm.jenisRencanaKinerja = "kinerja_utama"
      this.isVisibleTypeKinerjaUtama  = true
      this.RencanaKinerjaForm.sasaranKinerjaId = sasaranKinerjaId
      this.modalFormVisible = true;
    },  
    showModalEdit(id) {
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Edit Rencana Kinerja"
      this.$axios
          .$get("/rencana_kinerja?id="+id )
          .then((resp) => {
            
            this.RencanaKinerjaForm.rencanaKinerjaId = resp.id
            this.RencanaKinerjaForm.rencanaKinerjaLabel = resp.label
            this.RencanaKinerjaForm.jenisRencanaKinerja = resp.jenis_rencana_kinerja
            this.RencanaKinerjaForm.typeKinerjaUtama = resp.type_kinerja_utama
            this.RencanaKinerjaForm.lingkupPenugasan = resp.lingkup_penugasan_kinerja_tambahan

            if (resp.jenis_rencana_kinerja === 'kinerja_utama'){
              this.isVisibleTypeKinerjaUtama = true
              this.isVisibleTypeKinerjaTambahan = false
            }else if ( resp.jenis_rencana_kinerja === 'kinerja_tambahan'){
              this.isVisibleTypeKinerjaTambahan = true
              this.isVisibleTypeKinerjaUtama = false
            }

            this.modalFormVisible = true;

            setTimeout(() => {
              this.$refs.loader.finish()
            }, 700);
            
            
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
                    .$post("/rencana_kinerja", this.RencanaKinerjaForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('RencanaKinerjaForm')
                        this.$message({
                          type: 'info',
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
                    .$put("/rencana_kinerja", this.RencanaKinerjaForm )
                    .then((response) => {
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.resetForm('RencanaKinerjaForm')
                        this.$message({
                          type: 'info',
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
    onChangeJenisRencanaKinerja(event) {
      console.log(event)
      if (event === 'kinerja_utama'){
        this.isVisibleTypeKinerjaUtama = true
        this.isVisibleTypeKinerjaTambahan = false
      }else if ( event === 'kinerja_tambahan'){
        this.isVisibleTypeKinerjaTambahan = true
        this.isVisibleTypeKinerjaUtama = false
      }
    }
   
  },
  mounted() {
      
  }
};
</script>
<style lang="scss" scope>

 .el-select {
    width: 100%;
  }

  .el-select-group__title{
      color: rgb(102, 102, 102) !important;
    }


.modal .modal-header .close {
    visibility: hidden;
}
</style>