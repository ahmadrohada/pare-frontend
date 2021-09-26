<template>
    <modal 
    :show.sync="modalFormVisible" >
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{headerText}}</h4>
    </template>
      <el-form
        ref="RencanaKinerjaTimKerjaForm"
        :model="PejabatTimKerjaForm"
        :rules="rules"
        size="mini"
      >
       
        <label>Rencana Kinerja Atasan</label>
        <el-form-item  prop="rencanaKinerja" >
          <el-select 
            v-model="RencanaKinerjaTimKerjaForm.rencanaKinerjaId" 
            @change="onPilihJabatan($event)"  
            placeholder="Pilih Rencana Kinerja Label"
            :disabled="disabledSelect"
            >
            <el-option
              v-for="item in rencanaKinerjaLabelList"
              :selected="item.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>

        <label>Rencana Kinerja Label</label>
        <el-input size="mini" type="textarea" placeholder="Rencana Kinerja Label" v-model="RencanaKinerjaTimKerjaForm.label"></el-input>


        <el-form-item size="mini" style="margin-top:20px;">
          <el-button type="primary"  @click="submitForm('RencanaKinerjaTimKerjaForm')"
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
      headerText:'Rencana Kinerja Form',
      modalFormVisible: false,
      rencanaKinerjaLabelList:[],
      RencanaKinerjaTimKerjaForm: {
       /*  timKerjaLabel: "",
        timKerjaId: "",
        renjaId: "",
        userId: "",
        jabatanId:"", */
      },
      
    };
  },
  methods: {
    showModal(data) {
        console.log(data)
        /* this.$axios
          .$get("/rencana_kinerja_parent?id="+data.id)
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
          

        }) */
     
     

    },
    submitForm(formName) {

        
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


.modal .modal-header .close {
    visibility: hidden;
}
</style>