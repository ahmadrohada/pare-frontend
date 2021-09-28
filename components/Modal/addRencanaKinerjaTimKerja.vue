<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="RencanaKinerjaTimKerjaForm"
        :model="RencanaKinerjaTimKerjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="RencanaKinerjaTimKerjaForm.timKerjaId" hidden></input>
       
        <label>Rencana Kinerja Atasan</label>
        <el-form-item  prop="rencanaKinerjaAtasanId" >
          <el-select 
            v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId" 
            placeholder="Pilih Rencana Kinerja Atasan"
            >
            <el-option
              v-for="item in rencanaKinerjaAtasan"
              :selected="item.id"
              :key="item.value"
              :label="item.label"
              :value="item.id"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>

        <label>Rencana Kinerja -  {{timKerjaLabel}}</label>
        <el-form-item     prop="rencanaKinerjaLabel">
          <el-input size="mini" type="textarea" placeholder="Rencana Kinerja Label" v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaLabel"></el-input>
        </el-form-item>
        


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button type="primary"  :loading="submitLoader" @click="submitForm('RencanaKinerjaTimKerjaForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('RencanaKinerjaTimKerjaForm')">Tutup</el-button>
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
      submitLoader:false,
      headerText:'Rencana Kinerja Form',
      timKerjaLabel:'',
      modalFormVisible: false,
      rencanaKinerjaAtasan:[],
      RencanaKinerjaTimKerjaForm: {
        rencanaKinerjaAtasanId: "",
        rencanaKinerjaLabel:"",
        timKerjaId: ""
      },
      rules: {
          rencanaKinerjaAtasanId: [
            { required: true, message: 'Silakan pilih Rencana Kinerja Atasan', trigger: 'blur' }
          ],
          rencanaKinerjaLabel: [
            { required: true, message: 'Silakan isi Rencana Kinerja', trigger: 'blur' }
          ],
      },
      
    };
  },
  methods: {
    showModal(data) {
        this.$axios
          .$get("/tim_kerja_rencana_kinerja_parent?parent_id="+data.parent_id)
          .then((resp) => {
            this.rencanaKinerjaAtasan =  resp.rencana_kinerja;
            this.RencanaKinerjaTimKerjaForm.rencanaKinerjaAtasanId = resp.rencana_kinerja[0].id // pilih data ke 1
            this.RencanaKinerjaTimKerjaForm.timKerjaId = data.id;
            this.modalFormVisible = true;
           setTimeout(() => {
             this.$refs.loader.finish() 
          }, 200);
        }) 
    
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/create_rencana_kinerja", this.RencanaKinerjaTimKerjaForm )
                    .then((response) => {
                      this.$emit('getPejabatList', this.RencanaKinerjaTimKerjaForm.timKerjaId )
                      setTimeout(() => {
                        this.resetForm('RencanaKinerjaTimKerjaForm')
                        this.$message({
                          type: 'info',
                          message: 'berhasil menyimpan data'
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
<style>


.modal .modal-header .close {
    visibility: hidden;
}
</style>