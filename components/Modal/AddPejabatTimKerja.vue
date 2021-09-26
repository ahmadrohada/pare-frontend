<template>
    <modal :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title" id="exampleModalLabel">Add Pejabat Tim Kerja</h4>
    </template>
      <el-form
        ref="PejabatTimKerjaForm"
        :model="PejabatTimKerjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="PejabatTimKerjaForm.timKerjaId" hidden></input>
        <input v-model="PejabatTimKerjaForm.renjaId" hidden></input>
        <input v-model="PejabatTimKerjaForm.userId" hidden></input>

        

        <label for="tes">Tim Kerja</label>
        <el-form-item>
          <el-input v-model="PejabatTimKerjaForm.timKerjaLabel" readonly></el-input>
        </el-form-item>

        <label>Pejabat</label>
        <el-form-item  prop="namaPejabat" >
          <el-autocomplete
            class="inline-input"
            v-model="PejabatTimKerjaForm.namaPejabat"
            :fetch-suggestions="querySearch"
            placeholder="Input nama pejabat"
            :trigger-on-focus="false"
            @select="handleSelect"
            clearable="true"
            @clear="clearPejabatJabatan"
          ></el-autocomplete>
        </el-form-item>

        <label>Jabatan</label>
        <el-form-item  prop="jabatanId" >
          <el-select 
            v-model="PejabatTimKerjaForm.jabatanId" 
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
       

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm('PejabatTimKerjaForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('PejabatTimKerjaForm')">Tutup</el-button>
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
      PejabatTimKerjaForm: {
        timKerjaLabel: "",
        timKerjaId: "",
        renjaId: "",
        userId: "",
        jabatanId:"",
      },
      jabatans: [],
        value: '',
        rules: {
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
    showModal: function (data) {
      this.clearPejabatJabatan()
      const tim_kerja= data
      this.$refs.loader.start() 
      this.modalFormVisible = true;
      this.PejabatTimKerjaForm.timKerjaLabel = tim_kerja.label;
      this.PejabatTimKerjaForm.timKerjaId = tim_kerja.id;
      this.PejabatTimKerjaForm.renjaId = tim_kerja.renja_id;
      
      

      setTimeout(() => {
        this.$refs.loader.finish() 
      }, 700);


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
        this.PejabatTimKerjaForm.userId = queryString.id
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
              this.$refs.PejabatTimKerjaForm.clearValidate()
              this.disabledSelect = false
              this.jabatans =  resp;
              this.PejabatTimKerjaForm.jabatanId = resp[0].value
            }

           
           setTimeout(() => {
             this.$refs.loader.finish() 
          }, 200);
          

        })


        
    },
    clearPejabatJabatan(){
      this.$refs.PejabatTimKerjaForm.clearValidate()
      this.PejabatTimKerjaForm.jabatanId = null;
      this.jabatans = null;
      this.disabledSelect = true
      
    },
    onPilihJabatan(data){
      console.log(data)

    },
    submitForm(formName) {

        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.loader.start() 
            this.$axios
                    .$post("/add_pejabat_tim_kerja", this.PejabatTimKerjaForm )
                    .then((response) => {
                      this.$emit('getPejabatList', this.PejabatTimKerjaForm.timKerjaId )
                      this.$refs.loader.finish()
                      setTimeout(() => {
                        this.resetForm('PejabatTimKerjaForm')
                      }, 200);
                    })
                    .catch((errors) => {
                      console.log(errors);
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
    },
    
  },
  mounted() {
      
  }
};
</script>
<style>
.el-select .el-input:hover .el-input__icon, .el-select .el-input:hover input {
    color: rgb(90, 99, 100);
}

.modal .modal-header .close {
    visibility: hidden;
}
</style>