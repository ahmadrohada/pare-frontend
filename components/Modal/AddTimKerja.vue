<template>
  <modal :show.sync="modalFormVisible">
    <template slot="header">
      <h4 class="modal-title" id="exampleModalLabel">Tambah Tim Kerja</h4>
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
          <el-select v-model="TimKerjaForm.label" v-on:change="resetSelect()"  placeholder="Select">
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
export default {
  data() {
    return {
      modalFormVisible: false,
      TimKerjaForm: {
        label: "",
        parentLabel: "",
        parentId: "",
        renjaId: "",
      },
      options: [{
          value: 'KOORDINATOR',
          label: 'KOORDINATOR'
        }, {
          value: 'SUB KOORDINATOR',
          label: 'SUB KOORDINATOR'
        }, {
          value: 'ANGGOTA',
          label: 'ANGGOTA'
        }],
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
      console.log(data);
      this.TimKerjaForm.parentLabel = data.label;
      this.TimKerjaForm.parentId = data.id;
      this.TimKerjaForm.renjaId = data.renja_id;
      this.modalFormVisible = true;
    },
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
                    .$post("/add_tim_kerja", {
                      data: this.TimKerjaForm
                    })
                    .then((response) => {
                      console.log(response);
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
    resetSelect(){
      this.$refs.TimKerjaForm.clearValidate()
    }
  },
};
</script>
<style>
</style>