<template>
  <modal :show.sync="modalFormVisible">
    <pare-loader ref="loader"></pare-loader>
    <template slot="header">
      <h4 class="modal-title">{{ headerText }}</h4>
    </template>

    <el-form
      ref="KoordinatorForm"
      :rules="rules"
      :model="KoordinatorForm"
      size="mini"
    >
      <el-form-item label="Periode MPH" prop="KoordinatorFormPeriodeLabel">
        <el-input
          size="mini"
          readonly
          type="input"
          v-model="KoordinatorForm.periode"
        ></el-input>
      </el-form-item>
      <el-form-item label="Peran / Role" prop="KoordinatorFormRole">
        <el-input
          size="mini"
          readonly
          type="input"
          v-model="KoordinatorForm.role"
        ></el-input>
      </el-form-item>
      <el-form-item label="Label" prop="label">
        <el-select
          v-model="KoordinatorForm.label"
          placeholder="Pilih Jenis Label"
        >
          <el-option
            v-for="item in labelList"
            :selected="item.val"
            :key="item.val"
            :label="item.val"
            :value="item.val"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template slot="footer">
      <el-button
        v-if="formType == 'create'"
        :disabled="disabled"
        size="mini"
        type="primary"
        :loading="submitLoader"
        @click="submitDataPeran('KoordinatorForm')"
        >Submit
      </el-button>
      <el-button
        v-if="formType == 'edit'"
        type="primary"
        :loading="submitLoader"
        @click="updateDataPeran('KoordinatorForm')"
        >Update</el-button
      >
    </template>
  </modal>
</template>

<script>
import PareLoader from "~/components/Loader/PareLoader.vue";

export default {
  components: {
    PareLoader,
  },
  data() {
    return {
      formType: "create",
      submitLoader: false,
      headerText: "Add Koordinator MPH",
      modalFormVisible: false,
      disabled: false,
      jabatanAtasanId: null,

      KoordinatorForm: {
        skpdId: null,
        periode: null,
        label: null,
        role: "koordinator",
        level: "S2",
        roleId:null
      },
      labelList: [
        { val: "1", label: "I" },
        { val: "2", label: "II" },
        { val: "3", label: "III" },
        { val: "4", label: "IV" },
        { val: "5", label: "V" },
        { val: "6", label: "VI" },
        { val: "7", label: "VII" },
        { val: "8", label: "VIII" },
        { val: "9", label: "IX" },
      ],
      rules: {
        label: [
          { required: true, message: "Silakan pilih Label", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showModalAdd(skpd_id, periode) {
      this.KoordinatorForm.skpdId = skpd_id;
      this.KoordinatorForm.periode = periode;
      this.submitLoader = false;
      this.formType = "create";
      this.headerText = "Add Koordinator";
      this.modalFormVisible = true;
    },
    showModalEdit(data) {
      this.submitLoader = false;
      this.headerText = "Edit Label Koordinator";

      this.formType = "edit";
      this.$axios
        .$get("/peran?role_id=" + data.id)
        .then((resp) => {

          
          this.KoordinatorForm.periode = resp.data.periode;
          this.KoordinatorForm.roleId = resp.data.id;
          this.KoordinatorForm.label = resp.data.label;

          this.modalFormVisible = true;
          this.$refs.loader.finish();
        })
        .catch((errors) => {
          this.$message({
            type: "warning",
            message: "terjadi kesalahan",
          });
        });
    },
    submitDataPeran(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true;
          this.$axios
            .$post("/peran", this.KoordinatorForm)
            .then((response) => {
              this.$emit("loadAsyncData");
              setTimeout(() => {
                this.modalFormVisible = false;
                this.submitLoader = false;
                this.$message({
                  type: "success",
                  message: "Data Berhasil Disimpan",
                });
              }, 200);
            })
            .catch((error) => {
              this.submitLoader = false;
              this.$message({
                type: "error",
                duration: 2000,
                message: "Tidak Berhasil Menyimpan Data",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateDataPeran(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true;
          this.$axios
            .$put("/peran", this.KoordinatorForm)
            .then((response) => {
              this.$emit("loadAsyncData");
              setTimeout(() => {
                this.modalFormVisible = false;
                this.submitLoader = false;
                this.$message({
                  type: "success",
                  message: "Data Berhasil Diupdate",
                });
              }, 200);
            })
            .catch((error) => {
              this.submitLoader = false;
              this.$message({
                type: "error",
                duration: 2000,
                message: "Tidak Berhasil Update Data",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scope>
</style>
