<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Tambah Pegawai</h4>
    </template>

      <el-form
        ref="PegawaiForm"
        :model="PegawaiForm"
        :rules="rules"
        size="mini"
      >
        <input type="text" v-model="PegawaiForm.matriksPeranId" hidden>
        
        <el-form-item  prop="namaPegawai" label="Nama Pegawai" >
          <el-autocomplete
            class="inline-input"
            v-model="PegawaiForm.namaPegawai"
            :fetch-suggestions="querySearch"
            placeholder="Nama Pejabat"
            :trigger-on-focus="false"
            @select="handleSelect"
            :clearable="true"
            @clear="clearPegawai"
          ></el-autocomplete>
        </el-form-item>
       
        <el-form-item  prop="jabatanAktifId" label="Jabatan">
          <el-select 
            v-model="PegawaiForm.jabatanAktifId" 
            @change="onPilihJabatan($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatan"
            >
            <el-option
              v-for="item in jabatans"
              :selected="item.id"
              :key="item.id"
              :label="item.nama"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini" style="margin-top:20px;">
          <el-button :disabled = "saveDisabled" v-if="formType=='add'" type="primary"  :loading="submitLoader"  @click="saveForm('PegawaiForm')"
            >Save</el-button
          >
          <el-button @click="closeForm()" >Tutup</el-button>
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
      modalFormVisible: false,
      disabledSelectJabatan:true,
      submitLoader:false,
      saveDisabled:true,
      PegawaiForm: {
        namaPegawai:null,
        jabatanAktifId:null,
        matriksPeranId:null,
        userId:null,
        simpegId:null,
        nipPegawai:null,
        namaLengkapPegawai:null,
        jabatanPegawai:null,
        jabatanSimAsnPegawaiId:null,
        jabatanSimAsnPegawaiJenis:null,
        pangkatPegawai:null,
        golonganPegawai:null,
        pnsId:null,
        unitKerjaId:null,
        instansiPegawai:null,
        pangkatGolonganPegawai:null,
      },
      jabatans:[],
      rules: {
          namaPegawai: [
            { required: true, message: 'Silakan pilih pejabat', trigger: 'blur' }
          ],
          jabatanAktifId: [
            { required: true, message: 'Silakan pilih jabatan', trigger: 'blur' }
          ],
      },
      disabledSelect:true,
    };
  },
  methods: {
    showModalAdd(data) {
      this.clearPegawai()
      this.submitLoader = false
      this.$refs.loader.start() 
    
      this.PegawaiForm.matriksPeranId = data.id
      this.modalFormVisible = true; 
      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 800);

    },
    querySearch(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            console.log(resp)
            cb(resp);
          })
    },
    handleSelect(queryString) {
        this.$refs.loader.start() 
        this.PegawaiForm.userId = queryString.id
       
        const params = [`user_id=${queryString.id}`].join('&')
        this.$axios
          .get(`/pegawai_detail?${params}`)
          .then((resp) => {
            console.log(resp)
            this.PegawaiForm.nipPegawai = resp.data.nip;
            this.PegawaiForm.namaLengkapPegawai = resp.data.nama_lengkap;
            this.PegawaiForm.userId = queryString.id
            this.PegawaiForm.simpegId = resp.data.id
            this.PegawaiForm.pnsId = resp.data.pns_id
            this.PegawaiForm.skpdId = resp.data.skpd.id
            this.PegawaiForm.unitKerjaId = resp.data.unit_kerja?resp.data.unit_kerja.id : null 

            

            //first get data, ambil jabatan yang pertama
            if ( resp.data.jabatan.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Pegawai Tidak Memiliki Jabatan ( SIM ASN )',
                duration:800,
              });   
              this.$refs.loader.finish() 
            }else{
              this.$refs.PegawaiForm.clearValidate()
              this.disabledSelectJabatan = false
              this.saveDisabled = false
              this.showSelectJenisJabatan = true
              this.jabatans =  resp.data.jabatan;
              this.PegawaiForm.jabatanAktifId = resp.data.jabatan[0].id
              this.PegawaiForm.jabatanSimAsnPegawaiId = resp.data.jabatan[0].referensi.id
              this.PegawaiForm.jabatanSimAsnPegawaiJenis = resp.data.jabatan[0].referensi.jenis
              this.PegawaiForm.jabatanPegawai = resp.data.jabatan[0].nama
              //08062023 ..sim asn nya berubah, pang gol gk dari jabatan
              this.PegawaiForm.pangkatPegawai = resp.data.golongan.referensi.pangkat
              this.PegawaiForm.golonganPegawai = resp.data.golongan.referensi.golongan
              this.PegawaiForm.pangkatGolonganPegawai = resp.data.golongan.referensi.pangkat+" / "+resp.data.golongan.referensi.golongan
              this.PegawaiForm.instansiPegawai = resp.data.jabatan[0].referensi.skpd.nama
              setTimeout(() => {
                this.$refs.loader.finish() 
              }, 700);

            }
            
          })
          .catch((error) => {
          this.$message({
            type: 'error',
            duration:1800,
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 

        
    },
    clearPegawai(){
      this.$refs.PegawaiForm.clearValidate()
      this.PegawaiForm.jabatanAktifId = null
      this.PegawaiForm.namaPegawai = null
      this.PegawaiForm.userId = null
      this.PegawaiForm.simpegId = null
      this.PegawaiForm.unitKerjaId = null
      this.PegawaiForm.instansiPegawai = null
      this.PegawaiForm.pangkatGolonganPegawai = null
      this.jabatans = null
      this.disabledSelectJabatan = true
      this.saveDisabled = true
      this.showSelectJenisJabatan = false
      //this.PegawaiForm.skppejabatPenilaiId = null
      
    },
    closeForm(){
      this.$refs.PegawaiForm.clearValidate()
      this.clearPegawai()
      this.modalFormVisible = false; 
    },

    onPilihJabatan(selectedId){
      //this.PegawaiForm.pangkatGolonganPegawai = null;
      //this.PegawaiForm.instansiPegawai = null;
      this.$refs.loader.start() 
      this.$axios
        .$get("/user_jabatan_detail?jabatan_aktif_id="+selectedId+"&nip_pegawai="+this.PegawaiForm.nipPegawai)
        .then((resp) => {
          console.log(resp)
          //08062023, bingung jabatan nya gk bisa piih,mnambahin ini aja ah
          this.PegawaiForm.jabatanPegawai = resp.jabatan
          this.PegawaiForm.jabatanAktifId = selectedId
          this.PegawaiForm.pangkatGolonganPegawai = resp.pangkat+" / "+resp.golongan
          this.PegawaiForm.instansiPegawai = resp.skpd      
          this.saveDisabled = false  
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }) 
        .catch((error) => {
          this.$message({
            type: 'error',
            duration:1800,
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 
    },
    saveForm(formName) {
        this.submitLoader = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.loader.start() 
            this.$axios
                    .$post("/peran_pegawai", this.PegawaiForm )
                    .then((response) => {
                      //this.addKetua(response)
                      this.$emit('loadAsyncData')
                      this.$emit('reloadChild')
                      setTimeout(() => {
                        this.modalFormVisible = false;
                        this.submitLoader = false
                        this.$refs.loader.finish() 
                        this.$message({
                          type: 'success',
                          message: 'berhasil menyimpan data Pegawai'
                        }); 
                      }, 500);
                    })
                    .catch((error) => {
                        this.submitLoader = false
                        this.$refs.loader.finish() 
                        this.$message({
                          type: 'error',
                          duration: 3000,
                          message: error.response.data.message
                        });    
                    });

        } else {
            console.log('error submit!!');
            setTimeout(() => {
              this.submitLoader = false
            }, 500);
            return false;
          }
      });
      
    }
  },
  mounted() {
      
  }
};
</script>
<style scope>

</style>