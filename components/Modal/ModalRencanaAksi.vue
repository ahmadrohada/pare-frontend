<template>
    <modal :show.sync="modalFormVisible">
        <pare-loader ref="loader"></pare-loader>
        <template slot="header">
            <h4 class="modal-title ">{{ headerText }}</h4>
        </template>

 
        <el-form
        ref="RencanaAksiForm"
        :model="RencanaAksiForm"
        :rules="rules"
        size="mini"
      >
       
       
          <el-form-item label="Rencana Hasil Kerja" prop="rencanaKinerjaId" >
            <el-select 
              v-model="RencanaAksiForm.rencanaKinerjaId" 
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

        <el-form-item    label ="Rencana Aksi" prop="rencanaAksiLabel">
          <el-input size="mini" autosize type="textarea" placeholder="Rencana Aksi Label" v-model="RencanaAksiForm.rencanaAksiLabel"></el-input>
        </el-form-item>

        
        <el-form-item  v-if="formType=='create'" label ="Bulan Pelaksanaan" prop="bulanPelaksanaanId">
          <el-select 
              v-model="RencanaAksiForm.bulanPelaksanaanId" 
              placeholder="Pilih Bulan Pelaksanaan"
              style="width:100%"
              multiple
              >
              <el-option
              v-for="item in bulanList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader" @click="saveForm('RencanaAksiForm')"
            >Save</el-button
          >
          <el-button v-if="formType=='edit'" type="primary"  :loading="submitLoader" @click="updateForm('RencanaAksiForm')"
            >Update</el-button
          >

          <el-button style="float:right;" v-if="formType=='edit'" type="danger"  @click="deleteForm('RencanaAksiForm')"
            >Delete</el-button
          >
          <el-button @click="resetForm('RencanaAksiForm')">Tutup</el-button>
        </el-form-item>
      </el-form>
    </modal>
</template>

<script>
var getStartDate = function (year) {
  var date = new Date(year, 0, 1);
  var theFirst = new Date(date.getFullYear(), 0, 1);
  return theFirst;
};
var getEndDate = function (year) {
  var date = new Date(year, 0, 1);
  var theLast = new Date(date.getFullYear(), 11, 31);
  return theLast;
};

import PareLoader from "~/components/Loader/PareLoader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PareLoader,
  },
  computed: {
    ...mapGetters({
      user_id: "user_id",
      skpd_id: "id_skpd",
    }),
  },
  data() {
    return {
      modalFormVisible: false,
      
      bulanList: [{
          value: '1',
          label: 'Januari'
        }, {
          value: '2',
          label: 'Februari'
        }, {
          value: '3',
          label: 'Maret'
        }, {
          value: '4',
          label: 'April'
        }, {
          value: '5',
          label: 'Mei'
        },{
          value: '6',
          label: 'Juni'
        }, {
          value: '7',
          label: 'Juli'
        }, {
          value: '8',
          label: 'Agustus'
        }, {
          value: '9',
          label: 'September'
        }, {
          value: '10',
          label: 'Oktober'
        },{
          value: '11',
          label: 'November'
        },{
          value: '12',
          label: 'Desember'
        }],
      submitLoader: false,
      formType: "create",
      rencanaKinerja:[],
      RencanaAksiForm: {
        sasaranKinerjaId:"",
        rencanaKinerjaId:"",
        rencanaAksiLabel:"",
        rencanaAksiId:"",
        bulanPelaksanaanId:[],
        
      },
      rules: {
        rencanaKinerjaId: [
            { required: true, message: 'Silakan Pilih Rencana Hasil Kerja', trigger: 'blur' }
          ],
          rencanaAksiLabel: [
            { required: true, message: 'Silakan isi Label Rencana Aksi', trigger: 'blur' }
          ],
          bulanPelaksanaanId: [
            { required: true, message: 'Silakan pilih bulan pelaksanaan', trigger: 'blur' }
          ]
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
                this.RencanaAksiForm.rencanaKinerjaId = resp.rencana_kinerja[0].id // pilih data ke 1
              }else{
                this.RencanaAksiForm.rencanaKinerjaId = isSelect
              }
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 200);
          }) 
        
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
      this.submitLoader = false
    },
    showModalAdd(sasaranKinerjaId) {
      this.RencanaAksiForm.sasaranKinerjaId = sasaranKinerjaId
      this.resetForm("RencanaAksiForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "create"
      this.headerText = "Add Rencana Aksi"
      this.rencanaKinerjaList(sasaranKinerjaId,0)
      this.modalFormVisible = true;
    },
    showModalUpdate(rencanaAksiId) {
      this.resetForm("RencanaAksiForm")
      this.formType = "edit"
      this.headerText = "Edit Rencana Aksi"
      this.submitLoader = false
      this.RencanaAksiForm.rencanaAksiId = rencanaAksiId
      this.$refs.loader.start() 
      const params = [
        `id=${this.RencanaAksiForm.rencanaAksiId}`,
      ].join('&')
      this.$axios
        .$get(`/rencana_aksi_detail?${params}`)
        .then(({ data }) => {
          console.log(data.bulan_pelaksanaan);
          this.rencanaKinerjaList(data.sasaran_kinerja_id,data.rencana_kinerja_id)

          this.RencanaAksiForm.rencanaAksiLabel = data.label
          this.RencanaAksiForm.bulanPelaksanaanId = [ data.bulan_pelaksanaan ]
          this.RencanaAksiForm.sasaranKinerjaId = data.sasaran_kinerja_id


          setTimeout(() => {
            this.$refs.loader.finish() 
          }, 200);
          
        });
      //this.rencanaKinerjaList(sasaranKinerjaId,0)
      this.modalFormVisible = true;
    },
    saveForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/rencana_aksi", this.RencanaAksiForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('RencanaAksiForm')
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
            .$put("/rencana_aksi", this.RencanaAksiForm )
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
      this.$confirm('Ini akan menghapus Rencana Aksi !', 'Konfirmasi', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$axios
            .$delete("/rencana_aksi?id="+this.RencanaAksiForm.rencanaAksiId)
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
    
  },
  mounted() {},
};
</script>