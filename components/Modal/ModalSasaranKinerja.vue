<template>
    <modal :show.sync="modalFormVisible">
        <pare-loader ref="loader"></pare-loader>
        <template slot="header">
            <h4 class="modal-title">Sasaran Kinerja Pegawai ( SKP )</h4>
        </template>

        <el-form ref="SasaranKinerjaForm" :model="SasaranKinerjaForm" :rules="rules" size="mini">
            <el-tabs v-model="activeName" style="min-height:260px;">
                <el-tab-pane label="PERIODE PK" name="periode">

                  <el-row v-if="periodeTahunList != '' ">
                    

                    <el-form-item label="Jenis Jabatan" v-if="showSelectJenisJabatan" prop="jenisJabatanSkp">
                      <el-select v-model="SasaranKinerjaForm.jenisJabatanSkp"
                          placeholder="Pilih Jenis Jabatan Sasaran Kinerja">
                          <el-option v-for="item in jenisJabatanSkpList" :selected="item.value" :key="item.value"
                            :label="item.value" :value="item.value">
                          </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item v-if="showSelectPeriode" label="Periode" prop="periodeTahun">
                      <el-select v-model="SasaranKinerjaForm.periodeTahun"
                          placeholder="Pilih Periode Perjanjian Kinerja" v-on:change="pilihPeriode($event)">
                          <el-option v-for="item in periodeTahunList" :selected="item.label" :key="item.periode"
                              :label="item.periode_tahun" :value="item.id">
                          </el-option>
                      </el-select>
                    </el-form-item>

                  </el-row>


                  <el-row v-if="roleList != []">
                    JABATAN PADA MPH
                    <ol style="margin-left: -22px">
                      <li v-for="(data, key) in roleList" :key="key">
                        {{ data.roleName }} -> Jumlah Kegiatan ( Outcome ) : {{ data.outcome }}
                      </li>
                    </ol>
                  </el-row>
                  



                </el-tab-pane>
                <el-tab-pane label="PEGAWAI YANG DINILAI" name="pegawai">
                    <label>Nama Pegawai</label>
                    <el-form-item>
                        <el-input v-model="SasaranKinerjaForm.namaLengkapPegawaiYangDinilai" class="inline-input"
                            readonly></el-input>

                    </el-form-item>

                    <label>NIP Pegawai</label>
                    <el-form-item>
                        <el-input v-model="SasaranKinerjaForm.nipPegawaiYangDinilai" class="inline-input" readonly>
                        </el-input>
                    </el-form-item>

                    <label>Jabatan</label>
                    <el-form-item prop="jabatanAktifPegawaiYangDinilaiId">
                        <el-select v-model="SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId"
                            @change="onPilihJabatanPegawaiYangDinilai($event)" placeholder="Pilih Jabatan"
                            :disabled="disabledSelectJabatanPegawaiYangDinilai">
                            <el-option v-for="item in jabatansPegawaiYangDinilai" :selected="item.id"
                                :key="item.id" :label="item.nama" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <label>Pangkat / Golongan Ruang</label>
                    <el-form-item prop="pangkatGolonganPegawaiYangDinilai">
                        <el-input v-model="SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai" class="inline-input"
                            readonly></el-input>
                    </el-form-item>

                    <label>Instansi</label>
                    <el-form-item prop="instansiPegawaiYangDinilai">
                        <el-input v-model="SasaranKinerjaForm.instansiPegawaiYangDinilai" class="inline-input" readonly>
                        </el-input>
                    </el-form-item>

                    <input v-model="SasaranKinerjaForm.userId" hidden></input>
                    <input v-model="SasaranKinerjaForm.periodeLabel" hidden></input>
                    <input v-model="SasaranKinerjaForm.simpegId" hidden></input>
                    <input v-model="SasaranKinerjaForm.pnsId" hidden></input>


                    <input v-model="SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiId" hidden></input>
                    <input v-model="SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiJenis" hidden></input>
                    <input v-model="SasaranKinerjaForm.jabatanPegawaiYangDinilai" hidden></input>
                    <input v-model="SasaranKinerjaForm.golonganPegawaiYangDinilai" hidden></input>
                    <input v-model="SasaranKinerjaForm.pangkatPegawaiYangDinilai" hidden></input>


                </el-tab-pane>





                <el-tab-pane label="PEJABAT PENILAI " name="pejabat_penilai">
                    <label>Nama Pegawai</label>
                    <el-form-item prop="namaPejabatPenilai">
                        <el-autocomplete class="inline-input" v-model="SasaranKinerjaForm.namaPejabatPenilai"
                            :fetch-suggestions="querySearchPejabatPenilai" placeholder="Nama Pegawai Yang Dinilai"
                            :trigger-on-focus="false" @select="handleSelectPejabatPenilai" :clearable="true"
                            @clear="clearPejabatPenilai"></el-autocomplete>
                    </el-form-item>

                    <label>NIP Pegawai</label>
                    <el-form-item>
                        <el-input v-model="SasaranKinerjaForm.nipPejabatPenilai" class="inline-input" readonly>
                        </el-input>
                    </el-form-item>

                    <label>Jabatan</label>
                    <el-form-item prop="jabatanAktifPejabatPenilaiId">
                        <el-select v-model="SasaranKinerjaForm.jabatanAktifPejabatPenilaiId"
                            @change="onPilihJabatanPejabatPenilai($event)" placeholder="Pilih Jabatan"
                            :disabled="disabledSelectJabatanPejabatPenilai">
                            <el-option v-for="item in jabatansPejabatPenilai" :selected="item.id"
                                :key="item.id" :label="item.nama" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <label>Pangkat / Golongan Ruang</label>
                    <el-form-item prop="pangkatGolonganPejabatPenilai">
                        <el-input v-model="SasaranKinerjaForm.pangkatGolonganPejabatPenilai" class="inline-input"
                            readonly></el-input>
                    </el-form-item>

                    <label>Instansi</label>
                    <el-form-item prop="instansiPejabatPenilai">
                        <el-input v-model="SasaranKinerjaForm.instansiPejabatPenilai" class="inline-input" readonly>
                        </el-input>
                    </el-form-item>


                    <input v-model="SasaranKinerjaForm.skpdId" hidden></input>
                    <input v-model="SasaranKinerjaForm.unitKerjaId" hidden></input>

                    <input v-model="SasaranKinerjaForm.namaLengkapPejabatPenilai" hidden></input>
                    <input v-model="SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiId" hidden></input>
                    <input v-model="SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiJenis" hidden></input>
                    <input v-model="SasaranKinerjaForm.jabatanPejabatPenilai" hidden></input>
                    <input v-model="SasaranKinerjaForm.golonganPejabatPenilai" hidden></input>
                    <input v-model="SasaranKinerjaForm.pangkatPejabatPenilai" hidden></input>

                </el-tab-pane>
            </el-tabs>

        </el-form>




        <template slot="footer">
            <el-button v-if="periodeTahunList != '' " size="mini" type="primary" :loading="submitLoader" @click="submitForm('SasaranKinerjaForm')">
                Create</el-button>
            <el-button size="mini" @click="resetForm('SasaranKinerjaForm')">Tutup</el-button>
        </template>
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
      activeName: "periode",
      submitLoader: false,
      showSelectPeriode: true,
      showSelectJenisJabatan: true,
      periodeTahunList: [],
      jabatansPegawaiYangDinilai: [],
      jabatansPejabatPenilai: [],
      disabledSelectJabatanPegawaiYangDinilai: true,
      disabledSelectJabatanPejabatPenilai: true,
      roleList:[],
      jenisJabatanSkpList: [
        {
          value: "JABATAN PIMPINAN TINGGI",
        },
        {
          value: "PIMPINAN UNIT KERJA MANDIRI",
        },
        {
          value: "JABATAN ADMINISTRASI",
        },
        {
          value: "JABATAN FUNGSIONAL",
        },
      ],
      data: {
        detail: null,
        pegawaiYangDinilai: null,
        pejabatPenilai: null,
      },
      SasaranKinerjaForm: {
        periodeTahun: "",
        periodeLabel: "",
        jenisJabatanSkp: "",
        dateFrom: "",
        dateTo: "",
        userId: "",
        pnsId: "",
        simpegId: "",
        skpdId: "",
        unitKerjaId: "",

        //Pegawai yang dinilai
        namaLengkapPegawaiYangDinilai: "",
        jabatanAktifPegawaiYangDinilaiId: "",
        jabatanSimAsnPegawaiYangDinilaiId: "",
        jabatanSimAsnPegawaiYangDinilaiJenis: "",
        jabatanPegawaiYangDinilai: "",
        nipPegawaiYangDinilai: "",
        pangkatPegawaiYangDinilai: "",
        golonganPegawaiYangDinilai: "",
        instansiPegawaiYangDinilai: "",

        //Pejabat Penilai
        namaLengkapPejabatPenilai: "",
        jabatanAktifPejabatPenilaiId: "",
        jabatanSimAsnPejabatPenilaiId: "",
        jabatanSimAsnPejabatPenilaiJenis: "",
        jabatanPejabatPenilai: "",
        nipPejabatPenilai: "",
        pangkatPejabatPenilai: "",
        golonganPejabatPenilai: "",
        instansiPejabatPenilai: "",
      },
      rules: {
        periodeTahun: [
          {
            required: true,
            message: "Silakan pilih Periode PK",
            trigger: "blur",
          },
        ],
        jenisJabatanSkp: [
          {
            required: true,
            message: "Silakan pilih Jenis Jabatan",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    showModal() {
      this.listPeriodePK();
      this.handleSelectPegawaiYangDinilai(this.user_id);
      this.submitLoader = false;
      this.modalFormVisible = true;
    },
    listPeriodePK() {
      this.roleList = ""
      this.SasaranKinerjaForm.periodeTahun = ""
      this.$refs.loader.start();
      const params = [`skpd_id=${this.skpd_id}`, `status=close`].join("&");
      //get data periode PK List from this SKPD
      this.$axios
        .$get(`/perjanjian_kinerja?${params}`)
        .then((data) => {
          this.periodeTahunList = data.data;

          if (data.data == ''){
            this.$message({
            type: "error",
            message: "Perjanjian Kinerja Tidak ditemukan",
          });
          }
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.response.data.message,
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoader = true;
          this.$axios
            .$post("/sasaran_kinerja", this.SasaranKinerjaForm)
            .then((response) => {
              this.modalFormVisible = false;
              setTimeout(() => {
                this.$emit("loadAsyncData");
                this.submitLoader = false;
                this.$message({
                  type: "info",
                  message: "berhasil menyimpan data",
                });
              }, 500);
            })
            .catch((error) => {
              this.submitLoader = false;
              this.$message({
                type: "error",
                duration: 1800,
                message: error.response.data.message,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.submitLoader = false;
      this.$refs[formName].resetFields();
      this.modalFormVisible = false;
    },
    pilihPeriode(pk_id) {

      const params = [
                  `perjanjian_kinerja_id=${pk_id}`,
                  `nip_pegawai_yang_dinilai=${this.SasaranKinerjaForm.nipPegawaiYangDinilai}`,
                ].join('&')

      this.$refs.loader.start()    
      this.$axios
                  .get(`/pk_mph_skp?${params}`)
                  .then(({data}) => {
                    
                    this.SasaranKinerjaForm.periodeLabel = data.pk.periodePk;
                    const start = getStartDate(data.pk.periodePk);
                    const end = getEndDate(data.pk.periodePk);

                    this.SasaranKinerjaForm.dateFrom = start;
                    this.SasaranKinerjaForm.dateTo = end;

                    this.roleList = data.role
                   
                    
                    setTimeout(() => {
                      this.$refs.loader.finish() 
                    }, 700);

                  })
                  .catch((error) => {
                    this.$message({
                      type: 'error',
                      message: error.response.data.message
                    });    
                    this.SasaranKinerjaForm.dateFrom = "";
                    this.SasaranKinerjaForm.dateTo = "";
                    setTimeout(() => {
                      this.$refs.loader.finish() 
                    }, 700);
              });        
    },
    handleSelectPegawaiYangDinilai(queryString) {
      this.$refs.loader.start();

      //mengisi  detail Pegawai
      const params = [`user_id=${queryString}`].join("&");
      this.$axios
        .get(`/pegawai_detail?${params}`)
        .then((resp) => {
          console.log(resp.data.golongan.referensi.pangkat);

          this.SasaranKinerjaForm.nipPegawaiYangDinilai = resp.data.nip;
          this.SasaranKinerjaForm.namaLengkapPegawaiYangDinilai =
            resp.data.nama_lengkap;
          this.SasaranKinerjaForm.userId = queryString;
          this.SasaranKinerjaForm.simpegId = resp.data.id;
          this.SasaranKinerjaForm.pnsId = resp.data.pns_id;
          this.SasaranKinerjaForm.skpdId = resp.data.skpd.id;
          this.SasaranKinerjaForm.unitKerjaId = resp.data.unit_kerja
            ? resp.data.unit_kerja.id
            : null;

          //first get data, ambil jabatan yang pertama
          if (resp.data.jabatan.length == 0) {
            this.$message({
              type: "warning",
              message: "Pegawai Tidak Memiliki Jabatan ( SIM ASN )",
              duration: 800,
            });
          } else {
            this.$refs.SasaranKinerjaForm.clearValidate();
            this.disabledSelectJabatanPegawaiYangDinilai = false;
            this.jabatansPegawaiYangDinilai = resp.data.jabatan;

            //coba lakukan perulangan pada jabatan,untuk memilih jabatan yang sama dengan jabatan aktif nya
            this.jabatansPegawaiYangDinilai.forEach((data, index) => {
              //console.log(index);
              console.log(data.skpd.id);

              if (resp.data.jabatan[index].is_primary == true) {
                this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId =
                  resp.data.jabatan[index].id;
                this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiId =
                  resp.data.jabatan[index].referensi.id;
                this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiJenis =
                  resp.data.jabatan[index].referensi.jenis;
                this.SasaranKinerjaForm.jabatanPegawaiYangDinilai =
                  resp.data.jabatan[index].nama;
                this.SasaranKinerjaForm.instansiPegawaiYangDinilai =
                  resp.data.jabatan[index].skpd.nama;
              }
            });
            this.SasaranKinerjaForm.pangkatPegawaiYangDinilai =
              resp.data.golongan.referensi.pangkat;
            this.SasaranKinerjaForm.golonganPegawaiYangDinilai =
              resp.data.golongan.referensi.golongan;
            this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai =
              resp.data.golongan.referensi.pangkat +
              " / " +
              resp.data.golongan.referensi.golongan;
          }
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            duration: 1800,
            message: error.response.data.message,
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        });
    },
    onPilihJabatanPegawaiYangDinilai(selectedId) {
      this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.instansiPegawaiYangDinilai = null;

      const isSelect = selectedId;
      this.$axios
        .$get(
          "/user_jabatan_detail?jabatan_aktif_id=" +
            selectedId +
            "&nip_pegawai=" +
            this.SasaranKinerjaForm.nipPegawaiYangDinilai
        )
        .then((resp) => {
          console.log(resp);
          this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId = selectedId;
          this.SasaranKinerjaForm.instansiPegawaiYangDinilai = resp.skpd;
          this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiId = resp.jenis_jabatan.id
          this.SasaranKinerjaForm.jabatanSimAsnPegawaiYangDinilaiJenis = resp.jenis_jabatan.jenis
          this.SasaranKinerjaForm.jabatanPegawaiYangDinilai = resp.jenis_jabatan.nama_lengkap
          //ini yang baru ternyata panggol harus ada
          this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = resp.pangkat + " / " + resp.golongan;
          //26/01 id skpd berubah saat pilih jabatan
          this.SasaranKinerjaForm.skpdId = resp.skpd_id;
        });
    },
    clearPegawaiYangDinilai() {
      this.SasaranKinerjaForm.nipPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.jabatanAktifPegawaiYangDinilaiId = null;
      this.SasaranKinerjaForm.pangkatGolonganPegawaiYangDinilai = null;
      this.SasaranKinerjaForm.instansiPegawaiYangDinilai = null;
      this.jabatansPegawaiYangDinilai = null;
      this.disabledSelectJabatanPejabatPenilai = true;
    },

    //====== PEJABAT PENILAI  ===============================//
    querySearchPejabatPenilai(queryString, cb) {
      //console.log(queryString)
      this.$axios.$get("/select_user?search=" + queryString).then((resp) => {
        //console.log(resp)
        cb(resp);
      });
    },
    handleSelectPejabatPenilai(queryString) {
      this.$refs.loader.start();

      //mengisi  detail Pegawai
      const params = [`user_id=${queryString.id}`].join("&");
      this.$axios
        .get(`/pegawai_detail?${params}`)
        .then((resp) => {
          console.log(resp);
          this.SasaranKinerjaForm.nipPejabatPenilai = resp.data.nip;
          this.SasaranKinerjaForm.namaLengkapPejabatPenilai =
            resp.data.nama_lengkap;

          //first get data, ambil jabatan yang pertama
          if (resp.data.jabatan.length == 0) {
            this.$message({
              type: "warning",
              message: "Pegawai Tidak Memiliki Jabatan ( SIM ASN )",
              duration: 1800,
            });
          } else {
            this.$refs.SasaranKinerjaForm.clearValidate();
            this.disabledSelectJabatanPejabatPenilai = false;
            this.jabatansPejabatPenilai = resp.data.jabatan;

            //coba lakukan perulangan pada jabatan,untuk memilih jabatan yang sama dengan jabatan aktif nya
            this.jabatansPejabatPenilai.forEach((data, index) => {
              //console.log(index);
              console.log(data.skpd.id);
              if (resp.data.jabatan[index].is_primary == true) {
                this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiId =
                  resp.data.jabatan[index].id;
                this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiDinilaiId =
                  resp.data.jabatan[index].referensi.id;
                this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiJenis =
                  resp.data.jabatan[index].referensi.jenis;
                this.SasaranKinerjaForm.jabatanPejabatPenilai =
                  resp.data.jabatan[index].nama;

                this.SasaranKinerjaForm.instansiPejabatPenilai =
                  resp.data.jabatan[index].skpd.nama;
              }
            });
            this.SasaranKinerjaForm.pangkatPejabatPenilai =
              resp.data.golongan.referensi.pangkat;
            this.SasaranKinerjaForm.golonganPejabatPenilai =
              resp.data.golongan.referensi.golongan;
            this.SasaranKinerjaForm.pangkatGolonganPejabatPenilai =
              resp.data.golongan.referensi.pangkat +
              " / " +
              resp.data.golongan.referensi.golongan;

            
          }
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.response.data.message,
          });
          setTimeout(() => {
            this.$refs.loader.finish();
          }, 700);
        });
    },
    onPilihJabatanPejabatPenilai(selectedId) {
      //this.SasaranKinerjaForm.pangkatGolonganPejabatPenilai = null;
      this.SasaranKinerjaForm.instansiPejabatPenilai = null;

      const isSelect = selectedId;
      this.$axios
        .$get(
          "/user_jabatan_detail?jabatan_aktif_id=" +
            selectedId +
            "&nip_pegawai=" +
            this.SasaranKinerjaForm.nipPejabatPenilai
        )
        .then((resp) => {
          console.log(resp);
          this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiId = selectedId;
          this.SasaranKinerjaForm.instansiPejabatPenilai = resp.skpd;
          this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiId = resp.jenis_jabatan.id
          this.SasaranKinerjaForm.jabatanSimAsnPejabatPenilaiJenis = resp.jenis_jabatan.jenis
          this.SasaranKinerjaForm.jabatanPejabatPenilai = resp.jenis_jabatan.nama_lengkap
          this.SasaranKinerjaForm.pangkatGolonganPejabatPenilai = resp.pangkat + " / " + resp.golongan;
        });
    },
    clearPejabatPenilai() {
      this.SasaranKinerjaForm.nipPejabatPenilai = null;
      this.SasaranKinerjaForm.jabatanAktifPejabatPenilaiId = null;
      this.SasaranKinerjaForm.pangkatGolonganPejabatPenilai = null;
      this.SasaranKinerjaForm.instansiPejabatPenilai = null;
      this.jabatansPejabatPenilai = null;
      this.disabledSelectJabatanPejabatPenilai = true;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scope>
.modal.show .modal-dialog {
  transform: translate(0, 10%) !important;
}

.modal-body {
  //min-height: 430px !important;
}

.modal-dialog {
  max-width: 520px !important;
  margin-bottom: 13px !important;
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

/*   .title{
    color:rgb(36, 36, 37);
    margin-bottom: 5px;
    font-weight: 100;
    line-height: 1.0em;
    font-size: 0.85em;
 
  } */

.el-select {
  width: 100%;
}

label {
  margin-bottom: 0rem !important;
  color: #92989b;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 13px !important;
}
</style>
