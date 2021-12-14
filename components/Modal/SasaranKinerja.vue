<template>
    <modal 
    :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Create Sasaran Kinerja Pegawai</h4>
    </template>

    <el-form
        ref="SasaranKinerjaForm"
        :model="SasaranKinerjaForm"
        :rules="rules"
        size="mini"
      >

      

    <el-tabs v-model="activeName" @tab-click="handleClick" style="min-height:260px;">
      <el-tab-pane label="DETAIL" name="detail">
        <label>Periode PK</label>
          <el-form-item  prop="periodePkId" >
            <el-select 
              v-model="SasaranKinerjaForm.periodePkId" 
              placeholder="Pilih Periode Perjanjian Kinerja"
              >
              <el-option
                v-for="item in periodePkList"
                :selected="item.id"
                :key="item.id"
                :label="item.periode"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>

          <label>Periode Penilaian SKP</label>
          <el-form-item prop="dateFrom">
            <el-col :span="10">
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Mulai" 
                v-model="SasaranKinerjaForm.dateFrom" 
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line text-center" :span="4">s.d</el-col>
            <el-col :span="10" >
              <el-date-picker 
                type="date" 
                placeholder="Tanggal Selesai" 
                v-model="SasaranKinerjaForm.dateTo" 
                style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>

          <label>Jenis Jabatan</label>
          <el-form-item  prop="jenisJabatanSkp" >
            <el-select 
              v-model="SasaranKinerjaForm.jenisJabatanSkp" 
              placeholder="Pilih Jenis Jabatan Sasaran Kinerja"
              >
              <el-option
                v-for="item in jenisJabatanSkpList"
                :selected="item.value"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>
        










      </el-tab-pane>








      <el-tab-pane label="PEGAWAI YANG DINILAI" name="pegawai">
        <label>Nama Pegawai</label>
        <el-form-item  prop="namaPegawaiYangDinilai" >
          <el-autocomplete
            class="inline-input"
            v-model="SasaranKinerjaForm.namaPegawaiYangDinilai"
            :fetch-suggestions="querySearchPegawaiYangDinilai"
            placeholder="Nama Pegawai Yang Dinilai"
            :trigger-on-focus="false"
            @select="handleSelect"
            :clearable="true"
            @clear="clearPegawaiYangDinilaiJabatan"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pegawai</label>
        <el-form-item>
          <el-input
            v-model="nipPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanPegawaiYangDinilaiId" >
          <el-select 
          
            v-model="SasaranKinerjaForm.jabatanPegawaiYangDinilaiId" 
            @change="onPilihJabatanPegawaiYangDinilai($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanPegawaiYangDinilai"
            >
            <el-option
              v-for="item in jabatansPegawaiYangDinilai"
              :selected="item.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>

        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganPegawaiYangDinilai" >
          <el-input
            v-model="pangkatGolonganPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

         <label>Instansi</label>
        <el-form-item  prop="instansiPegawaiYangDinilai" >
          <el-input
            v-model="instansiPegawaiYangDinilai"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>
       
      </el-tab-pane>





      <el-tab-pane label="PEJABAT PENILAI KINERJA" name="pejabat_penilai_kinerja">
        <label>Nama Pejabat Penilai Kinerja</label>
        <el-form-item  prop="namaPejabatYangDinilai" >
          <el-autocomplete
            class="inline-input"
            v-model="SasaranKinerjaForm.namaPejabatPenilaiKinerja"
            :fetch-suggestions="querySearchPejabatPenilaiKinerja"
            placeholder="Nama Pejabat Penilai Kinerja"
            :trigger-on-focus="false"
            @select="handleSelect"
            :clearable="true"
            @clear="clearPejabatPenilaiKinerjaJabatan"
          ></el-autocomplete>
        </el-form-item>

        <label>NIP Pejabat Penilai Kinerja</label>
        <el-form-item  prop="nipPejabatPenilaiKinerja" >
          <el-input
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanPejabatPenilaiKinerjaId" >
          <el-select 
          
            v-model="SasaranKinerjaForm.jabatanPejabatPenilaiKinerjaId" 
            @change="onPilihPejabatPenilaiKinerja($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelectJabatanPejabatPenilaiKinerja"
            >
            <el-option
              v-for="item in jabatansPejabatPenilaiKinerja"
              :selected="item.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>

        <label>Pangkat / Golongan Ruang</label>
        <el-form-item  prop="pangkatGolonganPejabatPenilaiKinerja" >
          <el-input
            v-model="pangkatGolonganPejabatPenilaiKinerja"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>

         <label>Instansi</label>
        <el-form-item  prop="instansiPejabatPenilaiKinerja" >
          <el-input
            v-model="instansiPejabatPenilaiKinerja"
            class="inline-input"
            readonly
          ></el-input>
        </el-form-item>
        
      </el-tab-pane>
    </el-tabs> 
    
   
       
       
        <el-form-item size="mini" style="margin-top:20px;">
          <el-button  type="primary"  :loading="submitLoader" @click="submitForm('SasaranKinerjaForm')"
            >Create</el-button
          >
          <el-button @click="resetForm('SasaranKinerjaForm')">Tutup</el-button>
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
      modalFormVisible: false,
      activeName: 'detail',
      submitLoader:false,
      periodePkList:[],
      jenisJabatanSkpList: [{
          value: 'PEJABAT PIMPINAN TINGGI',
        }, {
          value: 'PIMPINAN UNIT KERJA MANDIRI',
        }, {
          value: 'PEJABAT ADMINISTRASI',
        }, {
          value: 'PEJABAT FUNGSIONAL',
        }],


      data:{
          detail:null,
          pegawaiYangDinilai:null,
          pejabatPenilaiKinerja:null
      },
      SasaranKinerjaForm: {
        periodePkId: "",
        jenisJabatanSkp:"",
        dateFrom:"",
        dateTo:""
      },
      rules: {
          periodePkId: [
            { required: true, message: 'Silakan pilih Periode PK', trigger: 'blur' }
          ],
          jenisJabatanSkp: [
            { required: true, message: 'Silakan jenis Jabatan SKP', trigger: 'blur' }
          ],
          dateFrom: [
            { required: true, message: '', trigger: 'blur' }
          ],
          dateTo: [
            { required: true, message: '', trigger: 'blur' }
          ],
         
      },
   
    };
  },
  methods: {
    showModal(skpdId) {

      this.submitLoader = false
      this.$refs.loader.start() 
      this.modalFormVisible = true; 


      //get data periode PK List from this SKPD
      this.$axios
        .$get("/perjanjian_kinerja?skpd_id="+skpdId)
        .then((data) => {
            this.periodePkList = data.data
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 700);
            
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error.response.data.message
          });    
          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 700);
        }); 

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/sasaran_kinerja", this.SasaranKinerjaForm )
                    .then((response) => {
                      
                      //this.modalFormVisible = false;
                      setTimeout(() => {
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
                          duration: 3000,
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
      this.submitLoader = false
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
    },
    querySearchPegawaiYangDinilai(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    querySearchPejabatPenilaiKinerja(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
  },
  mounted() {
      
  }
};
</script>
<style scope>

.modal.show .modal-dialog {
    transform: translate(0, 15%) !important;
}

.modal-dialog {
    max-width: 480px !important;
}

.list-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    line-height: 1.25em;
    white-space: nowrap;
    margin-bottom: 14px;
}
  
  .title{
    color:rgb(36, 36, 37);
    margin-bottom: 5px;
    font-weight: 100;
    line-height: 1.0em;
    font-size: 0.85em;
 
  }

  .el-select {
    width: 100%;
  }

  label{
    margin-bottom: 0rem !important;
    color:#92989b;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 13px !important;
  }
</style>