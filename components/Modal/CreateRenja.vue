<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">Create Renja</h4>
    </template>


      <div v-for="item in detailRenja" class="list-item">
        <span class="title">{{item.title}}</span>
        <span class="label">{{item.label}}</span>
      </div>
        

      <el-form
        ref="RenjaForm"
        :model="RenjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="RenjaForm.skpdId" hidden></input>
        <input v-model="RenjaForm.userId" hidden></input>
       
        <div>
          <label>Periode Renja</label>
          <el-form-item  prop="periodeId" >
            <el-select 
              v-model="RenjaForm.periodeId" 
              placeholder="Pilih Periode Renja"
              >
              <el-option
                v-for="item in periodeList"
                :selected="item.id"
                :key="item.label"
                :label="item.label"
                :value="item.id"
                
              
                >
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <label>Kepala SKPD</label>
        <el-form-item  prop="namaPejabat" >
          <el-autocomplete
            class="inline-input"
            v-model="RenjaForm.namaPejabat"
            :fetch-suggestions="querySearch"
            placeholder="Input nama pejabat"
            :trigger-on-focus="false"
            @select="handleSelect"
            :clearable="true"
            @clear="clearPejabatJabatan"
          ></el-autocomplete>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanId" >
          <el-select 
          
            v-model="RenjaForm.jabatanId" 
            @change="onPilihJabatan($event)"  
            placeholder="Pilih Jabatan"
            :disabled="disabledSelect"
            >
            <el-option
              v-for="item in jabatans"
              :selected="item.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>
        



        <el-form-item size="mini" style="margin-top:20px;">
          <el-button v-if="formType=='create'" type="primary"  :loading="submitLoader"  @click="saveForm('RenjaForm')"
            >Save</el-button
          >
          <el-button @click="resetForm('RenjaForm')">Tutup</el-button>
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
      modalFormVisible: false,
      activeName: 'detail',
      submitLoader:false,
      periodeList:[],
      detailRenja:[],
      RenjaForm: {
        skpdId: "",
        periodeId:"",
        userId:"",
        jabatanId:"",
      },
      jabatans: [],
      rules: {
          periodeId: [
            { required: true, message: 'Silakan pilih Periode', trigger: 'blur' }
          ],
          namaPejabat: [
            { required: true, message: 'Silakan pilih pejabat', trigger: 'blur' }
          ],
          jabatanId: [
            { required: true, message: 'Silakan pilih jabatan', trigger: 'blur' }
          ]
      },
      disabledSelect:true,
    };
  },
  methods: {
    showModal(skpd_id) {
      this.submitLoader = false
      this.$refs.loader.start() 
      this.modalFormVisible = true; 

      this.$axios
        .$get("/create_renja?skpd_id="+skpd_id)
        .then((data) => {
            
            this.periodeList = data.periodeList
            this.RenjaForm.periodeId = data.periodeAktifId
            this.RenjaForm.skpdId = data.skpdId
            this.RenjaForm.userId = data.userId
            this.detailRenja = data.detailRenja
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
    querySearch(queryString, cb) {
        //console.log(queryString)
        this.$axios
          .$get("/select_user?search="+queryString)
          .then((resp) => {
            //console.log(resp)
            cb(resp);
          })
    },
    handleSelect(queryString) {
        this.$refs.loader.start() 
        this.RenjaForm.userId = queryString.id
        this.$axios
          .$get("/user_jabatan_list?id="+queryString.id)
          .then((resp) => {
           
            if ( resp.length == 0 ){
              this.$message({
                type: 'warning',
                message: 'Data Jabatan tidak ditemukan',
                duration:2300,
              });   
            }else{
              this.$refs.RenjaForm.clearValidate()
              this.disabledSelect = false
              this.jabatans =  resp;
              this.RenjaForm.jabatanId = resp[0].value
            }

           
           setTimeout(() => {
             this.$refs.loader.finish() 
          }, 200);
          

        })


        
    },
    clearPejabatJabatan(){
      this.$refs.RenjaForm.clearValidate()
      this.RenjaForm.jabatanId = null;
      this.jabatans = null;
      this.disabledSelect = true
      
    },
    onPilihJabatan(data){
      console.log(data)

    },
    addKetua(renjaId){
      this.$axios
        .$post("/add_tim_kerja", { 
          renjaId : renjaId,
          label : 'KETUA',
          parentId : 0
        } )
        .then((response) => {
            refreshTree()
            setTimeout(() => {
              this.$message({
                type: 'info',
                message: 'berhasil menambahkan data'
              }); 
            }, 200);
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            duration: 3000,
            message: error.response.data.message
          });    
        });
    },
    saveForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/renja", this.RenjaForm )
                    .then((response) => {
                      this.addKetua(response)
                      //console.log(response);
                      //this.nodeData.new = response
                      this.$emit('reloadTable')
                      //this.$refs[formName].resetFields();
                      this.modalFormVisible = false;
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
    resetForm() {
      this.submitLoader = false
      this.modalFormVisible = false;
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
    max-width: 500px !important;
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

  .label{
    
    color:#92989b;
  }
  .modal .modal-header .close {
    visibility: hidden;
  }
</style>