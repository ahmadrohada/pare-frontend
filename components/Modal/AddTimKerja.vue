<template>
    <modal :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title" id="exampleModalLabel">Tambah Tim Kerja ( Child )</h4>
    </template>
      <el-form
        ref="TimKerjaForm"
        :model="TimKerjaForm"
        :rules="rules"
        size="mini"
      >
        <input v-model="TimKerjaForm.parentId" hidden></input>
        <input v-model="TimKerjaForm.renjaId" hidden></input>

        

        <label for="tes">Parent Label</label>
        <el-form-item>
          <el-input v-model="TimKerjaForm.parentLabel" readonly></el-input>
        </el-form-item>
        <label for="tes">Child Label</label>
        <el-form-item  prop="label" >
          <el-select v-model="TimKerjaForm.label" v-on:change="onSelect($event)"  placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
             
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm('TimKerjaForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('TimKerjaForm')">Tutup</el-button>
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
      nodeData:{
        old:null,
        new:null
      },
      modalFormVisible: false,
      TimKerjaForm: {
        parentLabel: "",
        parentId: "",
        renjaId: "",
      },
      options: [],
      value: '',
      rules: {
          label: [
            { required: true, message: 'Please input Label name', trigger: 'blur' }
          ]
      },
    };
  },
  methods: {
    showModal: function (data) {
      this.nodeData.old = data
      const tim_kerja_id = data.id
      this.$refs.loader.start() 
      this.modalFormVisible = true;

      //console.log(data);
      this.$axios
          .$get("/add_tim_kerja_referensi?id="+tim_kerja_id)
          .then((resp) => {
            console.log(resp)
            this.TimKerjaForm.parentLabel = resp.tim_kerja.label;
            this.TimKerjaForm.parentId = resp.tim_kerja.id;
            this.TimKerjaForm.renjaId = resp.tim_kerja.renja_id;
            this.options =  resp.child_ref;
            setTimeout(() => {
              this.$refs.loader.finish() 
            }, 500);
          })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                    .$post("/add_tim_kerja", this.TimKerjaForm )
                    .then((response) => {
                      //console.log(response);
                      this.nodeData.new = response
                      this.$emit('reloadTree', this.nodeData )
                      this.$refs[formName].resetFields();
                      this.modalFormVisible = false;
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
    onSelect($event){
      console.log($event)
      this.$refs.TimKerjaForm.clearValidate()
    }
  },
};
</script>
<style>
.el-select {
    width: 100%;
}
</style>