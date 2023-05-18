<template>
    <modal :show.sync="modalFormVisible">
        <pare-loader ref="loader"></pare-loader>
        <template slot="header">
            <h4 class="modal-title">Rencana Aksi</h4>
        </template>

 
        <el-form
        ref="RencanaAksiForm"
        :model="RencanaAksiForm"
        :rules="rules"
        size="mini"
      >
       
        <input v-model="RencanaAksiForm.indikatorId" hidden></input>

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

        
        <el-form-item  label ="Bulan Pelaksanaan" prop="bulan_pelaksanaan">
          <!-- <el-select 
            v-model="RencanaAksiForm.bulan_pelaksanaan" 
            multiple 
            style="width:100%"
            placeholder="Pilih Bulan">
            <el-option
              v-for="item in bulanList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <el-select 
              v-model="RencanaAksiForm.bulanPelaksanaanId" 
              placeholder="Pilih Rencana Hasil Kerja"
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
      
      RencanaAksiForm: {
        rencanaKinerjaId:"",
        rencanaAksiLabel:"",
        bulanPelaksanaanId:[]
      },
      rules: {
  
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
      this.resetForm("RencanaAksiForm")
      this.submitLoader = false
      this.$refs.loader.start() 
      this.formType = "create"
      this.headerText = "Add Rencana Aksi"
      this.rencanaKinerjaList(sasaranKinerjaId,0)
      this.modalFormVisible = true;
    },
    saveForm(formName) {
      /* this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoader = true
            this.$axios
                    .$post("/indikator_kinerja_individu", this.IndikatorKinerjaIndividuForm )
                    .then((response) => {
                      setTimeout(() => {
                        this.$emit('loadAsyncData')
                        this.resetForm('IndikatorKinerjaIndividuForm')
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
      }); */
        
    },
    
  },
  mounted() {},
};
</script>