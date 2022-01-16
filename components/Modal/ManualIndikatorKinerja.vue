<template>
    <modal 
    :show.sync="modalFormVisible" 
   >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="ManualIndikatorKinerjaForm"
        :model="ManualIndikatorKinerjaForm"
        :rules="rules"
        size="mini"
        
      >
       
        <input v-model="ManualIndikatorKinerjaForm.skpId" hidden></input>
        <input v-model="ManualIndikatorKinerjaForm.rencanaKinerjaId" hidden></input>
        <input v-model="ManualIndikatorKinerjaForm.indikatorKinerjaId" hidden></input>

        <el-form-item   label="Rencana Kinerja"  prop="rencanaKinerjaLabel" >
          <el-input size="mini" autosize type="textarea" placeholder="Rencana Kinerja Label" v-model="ManualIndikatorKinerjaForm.rencanaKinerjaLabel" readonly></el-input>
        </el-form-item>

        <el-form-item   label="Deskripsi Rencana Kinerja"  prop="deskripsiRencanaKinerja" >
          <el-input size="mini" autosize type="textarea" placeholder="Isi dengan Deskripsi Rencana Kinerja" v-model="ManualIndikatorKinerjaForm.deskripsiRencanaKinerja"></el-input>
        </el-form-item>
        <el-divider ></el-divider>

        <el-form-item   label="Indikator Kinerja Utama"  prop="indikatorKinerjaUtamaLabel" >
          <el-input size="mini" autosize type="textarea" placeholder="Indikator Kinerja Utama Label" v-model="ManualIndikatorKinerjaForm.indikatorKinerjaUtamaLabel" readonly></el-input>
        </el-form-item>
        
        
        <el-form-item   label="Definisi"  prop="deskipsiDefinisi" >
          <el-input size="mini" autosize type="textarea" placeholder="Deskripsi Definisi" v-model="ManualIndikatorKinerjaForm.deskripsiDefinisi"></el-input>
        </el-form-item>
        <el-form-item   label="Formula"  prop="deskripsiFormula" >
          <el-input size="mini" autosize type="textarea" placeholder="Deskripsi Formula" v-model="ManualIndikatorKinerjaForm.deskripsiFormula"></el-input>
        </el-form-item>
        <el-form-item   label="Tujuan"  prop="deskripsiTujuan" >
          <el-input size="mini" autosize type="textarea" placeholder="Deskripsi Tujuan" v-model="ManualIndikatorKinerjaForm.deskripsiTujuan"></el-input>
        </el-form-item>

        <el-form-item   label="Satuan Pengukuran"  prop="satuanPengukuran" >
          <el-input size="mini" autosize type="textarea" placeholder="Satuan Pengukuran" v-model="ManualIndikatorKinerjaForm.satuanPengukuran"></el-input>
        </el-form-item>

        <el-form-item label="Jenis Indikator Kinerja Utama" prop="jenisIndikatorKinerjaUtama">
              <el-select 
                v-model="ManualIndikatorKinerjaForm.jenisIndikatorKinerjaUtama" 
                placeholder="pilih jenis IKU">
                <el-option label="Outcome" value="outcome" ></el-option>
                <el-option label="Output Kendali Rendah" value="output_kendali_rendah"></el-option>
                <el-option label="Output Kendali Redang" value="output_kendali_sedang"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item   label="Penanggung Jawab IKU"  prop="penanggungJawab" >
          <el-input size="mini" autosize type="textarea" placeholder="Penanggung Jawab IKU" v-model="ManualIndikatorKinerjaForm.penanggungJawab"></el-input>
        </el-form-item>
        <el-form-item   label="Pihak Penyedia Data"  prop="pihakPenyediaData" >
          <el-input size="mini" autosize type="textarea" placeholder="Pihak Penyedia Data" v-model="ManualIndikatorKinerjaForm.pihakPenyediaData"></el-input>
        </el-form-item>
        <el-form-item   label="Sumber Data"  prop="sumberData" >
          <el-input size="mini" autosize type="textarea" placeholder="Sumber Data" v-model="ManualIndikatorKinerjaForm.sumberData"></el-input>
        </el-form-item>
        <el-form-item label="Periode Pelaporan" prop="periodePelaporan">
              <el-select 
                v-model="ManualIndikatorKinerjaForm.periodePelaporan" 
                placeholder="pilih Periode Pelaporan">
                <el-option label="Bulanan" value="bulanan" ></el-option>
                <el-option label="Triwulanan" value="triwulanan"></el-option>
                <el-option label="Semesteran" value="semesteran"></el-option>
                <el-option label="Tahunan" value="tahunan"></el-option>
              </el-select>
        </el-form-item>
        <el-divider ></el-divider>


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('ManualIndikatorKinerjaForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('ManualIndikatorKinerjaForm')"
            >Update</el-button
          >
          <el-button @click="resetForm('ManualIndikatorKinerjaForm')">Tutup</el-button>
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
      headerText:'Manual Indikator Kinerja Form',
      modalFormVisible: false,
      ManualIndikatorKinerjaForm: {

        skpId:"",
        rencanaKinerjaId:"",
        indikatorKinerjaId:"",

        rencanaKinerjaLabel:"",
        deskripsiRencanaKinerja:"",
        indikatorKinerjaUtamaLabel:"",
        deskripsiDefinisi:"",
        deskripsiFormula:"",
        deskripsiTujuan:"",
        satuanPengukuran:"",
        jenisIndikatorKinerjaUtama:"",
        penanggungJawab:"",
        pihakPenyediaData:"",
        sumberData:"",
        periodePelaporan:""
       
      },      
      rules: {
          deskripsiRencanaKinerja: [
            { required: true, message: 'isi deskripsi Rencana Kinerja', trigger: 'blur' }
          ],
          deskripsiDefinisi: [
            { required: true, message: '', trigger: 'blur' }
          ],
          deskripsiFormula: [
            { required: true, message: '', trigger: 'blur' }
          ],
          deskripsiTujuan: [
            { required: true, message: '', trigger: 'blur' }
          ],
          satuanPengukuran: [
            { required: true, message: '', trigger: 'blur' }
          ],
          jenisIndikatorKinerjaUtama: [
            { required: true, message: '', trigger: 'blur' }
          ],
          periodePelaporan: [
            { required: true, message: '', trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
   
    showModalAdd(indikatorKinerjaId) {
      this.resetForm("ManualIndikatorKinerjaForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "create"
      this.headerText = "Add Manual Indikator Kinerja"

      //Ambil data
      const params = [
          `id=${indikatorKinerjaId}`,
      ].join('&')
      this.$axios
          .get(`/indikator_kinerja_individu?${params}`)
          .then(response => {

              //console.log(response.data.rencana_kinerja.label)
              this.ManualIndikatorKinerjaForm.skpId = response.data.rencana_kinerja.skp_id
              this.ManualIndikatorKinerjaForm.rencanaKinerjaId = response.data.rencana_kinerja_id
              this.ManualIndikatorKinerjaForm.indikatorKinerjaId = response.data.id
              this.ManualIndikatorKinerjaForm.rencanaKinerjaLabel = response.data.rencana_kinerja.label
              this.ManualIndikatorKinerjaForm.indikatorKinerjaUtamaLabel = response.data.label


              this.modalFormVisible = true;
              setTimeout(() => {
                this.$refs.loader.finish() 
              }, 800);

            }).catch(error => {
                this.$message({
                  type: 'warning',
                  message: 'terjadi kesalahan'
                  //message: error.response.data.message
                }); 
            })
    },  
    showModalEdit(id) {
      this.resetForm("ManualIndikatorKinerjaForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "edit"
      this.headerText = "Edit Manual Indikator Kinerja"
      this.$axios
          .$get("/manual_indikator_kinerja?id="+id )
          .then((resp) => {
            this.ManualIndikatorKinerjaForm.rencanaKinerjaLabel = resp.rencana_kinerja_label
            /* this.ManualIndikatorKinerjaForm.indikatorId = resp.id
            this.ManualIndikatorKinerjaForm.indikatorKinerjaIndividuLabel = resp.label
            this.ManualIndikatorKinerjaForm.typeTarget = resp.type_target
            this.ManualIndikatorKinerjaForm.targetMin = resp.target_min
            this.ManualIndikatorKinerjaForm.targetMax = resp.target_max
            this.ManualIndikatorKinerjaForm.satuanTarget = resp.satuan_target */

            this.modalFormVisible = true;

            setTimeout(() => {
              this.$refs.loader.finish() 
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
                    .$post("/manual_indikator_kinerja", this.ManualIndikatorKinerjaForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('ManualIndikatorKinerjaForm')
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
                        }); 
                      }, 100);
                    })
                    .catch((error) => {
                      this.submitLoader = false
                      console.log(error);
                      this.$message({
                        type: 'warning',
                        message: error
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
                    .$put("/manual_indikator_kinerja", this.ManualIndikatorKinerjaForm )
                    .then((response) => {
                      this.$emit('loadAsyncData')
                      setTimeout(() => {
                        this.resetForm('ManualIndikatorKinerjaForm')
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