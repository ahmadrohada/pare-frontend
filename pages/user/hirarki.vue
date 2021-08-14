<template>
  <div class="row">
    <div class="col-md-5 content">
      <card class="font-weight-300">
        <md-card
          class="md-primary md_user"
          v-if="atasan_pejabat_penilai !== null"
        >
          <md-card-header>
            <md-card-media>
              <img
                :src="atasan_pejabat_penilai.profile.photo"
                class="user_img"
              />
            </md-card-media>
            <md-card-header-text>
              <div class="md-title">
                {{ atasan_pejabat_penilai.profile.nama_lengkap }}
              </div>
              <div class="md-subhead">
                NIP. {{ atasan_pejabat_penilai.profile.nip }}
              </div>
              <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
            </md-card-header-text>

            <md-button
              class="md-icon-button"
              @click="showDetailAtasanPejabatPenilai"
              v-bind:class="{ active_btn_detail: btnA }"
            >
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
          </md-card-header>
        </md-card>

        <md-card
          class="md-primary red_card"
          md-with-hover
          v-if="atasan_pejabat_penilai == null"
        >
          <md-card-header>
            <md-card-media>
              <img src="~/static/img/not_user.png" class="user_img" />
            </md-card-media>
            <md-card-header-text style="text-align: center; margin-top: 15px">
              <div class="md-title">Atasan Pejabat Penilai tidak ditemukan</div>
              <div class="md-subhead">Sinkronisasi dengan SIMPEG</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>

        <center style="margin-bottom: 10px">
          <md-icon>keyboard_arrow_up</md-icon>
        </center>

        <md-card class="md-primary md_user" v-if="pejabat_penilai !== null">
          <md-card-header>
            <md-card-media>
              <img :src="pejabat_penilai.profile.photo" class="user_img" />
            </md-card-media>
            <md-card-header-text>
              <div class="md-title">
                {{ pejabat_penilai.profile.nama_lengkap }}
              </div>
              <div class="md-subhead">NIP. {{ pejabat_penilai.profile.nip }}</div>
              <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
            </md-card-header-text>
            <md-button
              class="md-icon-button pejabat_penilai_btn"
              @click="showDetailPejabatPenilai"
              v-bind:class="{ active_btn_detail: btnB }"
            >
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
            
          </md-card-header>
        </md-card>

        <md-card
          class="md-primary red_card"
          md-with-hover
          v-if="pejabat_penilai == null"
        >
          <md-card-header>
            <md-card-media>
              <img src="~/static/img/not_user.png" class="user_img" />
            </md-card-media>
            <md-card-header-text style="text-align: center; margin-top: 15px">
              <div class="md-title">Pejabat Penilai tidak ditemukan</div>
              <div class="md-subhead">Sinkronisasi dengan SIMPEG</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>

        <center style="margin-bottom: 10px">
          <md-icon>keyboard_arrow_up</md-icon>
        </center>

        <md-card class="md-primary md_user">
          <md-card-header>
            <md-card-media>
              <img :src="pegawai.profile.photo" class="user_img" />
            </md-card-media>
            <md-card-header-text>
              <div class="md-title">{{ pegawai.profile.nama_lengkap }}</div>
              <div class="md-subhead">NIP. {{ pegawai.profile.nip }}</div>
              <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
            </md-card-header-text>

            <md-button
              class="md-icon-button pegawai_btn"
              @click="showDetailPegawai"
              v-bind:class="{ active_btn_detail: btnC }"
            >
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
          </md-card-header>
        </md-card>
      </card>
    </div>
    <div class="col-md-7 content"><profil-pegawai ref="child"> </profil-pegawai></div>
  </div>
</template>


<script>
import ProfilPegawai from "../../components/Profile/ProfilUserHirarki.vue";

export default {
  name: "hirarki",
  middleware: "auth",
  layout: "userLayout",
  head() {
    return {
      title: "hirarki",
    };
  },
  components: {
    ProfilPegawai,
  },
  data() {
    return {
      pegawai: {
        profile: "",
      },
      pejabat_penilai: [],
      pejabat_penilai: {
        profile: "",
      },
      atasan_pejabat_penilai: [],
      atasan_pejabat_penilai: {
        profile: "",
      },
      btnA:false,
      btnB:false,
      btnC:false,
    };
  },
  methods: {
    clearBtnState(){
      this.btnA =false
      this.btnB =false
      this.btnC =false
    },
    showDetailPegawai: function () {
      this.$refs.child.start();
      this.clearBtnState()
      this.btnC = true
      this.$refs.child.detail_pegawai();
      setTimeout(() => this.$refs.child.finish(), 800)
    },
    showDetailPejabatPenilai: function () {
      this.$refs.child.start();
      this.clearBtnState()
      this.btnB  = true
      this.$refs.child.detail_pejabat_penilai();
      setTimeout(() => this.$refs.child.finish(), 800)
    },
    showDetailAtasanPejabatPenilai: function () {
      this.$refs.child.start();
      this.clearBtnState()
      this.btnA = true
      this.$refs.child.detail_atasan_pejabat_penilai();
      setTimeout(() => this.$refs.child.finish(), 800)
    },
  },
  mounted() {
    this.btnC =true
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });

    this.$axios
      .$get("/me/hirarki")
      .then((response) => {
        this.pegawai = response["pegawai"];
        this.pejabat_penilai = response["pejabat_penilai"];
        this.atasan_pejabat_penilai = response["atasan_pejabat_penilai"];

        setTimeout(() => this.$nuxt.$loading.finish(), 800);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => this.$nuxt.$loading.finish(), 800);
      });
  },
};
</script>
<style>
.md-card-header {
  height:98px;
}

.user_img {
  border-radius: 2.3rem !important;
  border: 2px solid rgba(218, 218, 218, 0.603);
}

.md_user {
  background: #00bf8f; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #014d3b,
    #00bf8f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #014d3b,
    #00bf8f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.red_card {
  background: rgb(211, 43, 43) !important;
  opacity: 0.64 !important;
}
.md-card-header-text{
  margin-left:-5px;
}
.md-card .md-title {
  font-size: 14px !important;
  margin-top: -4px !important;
  line-height: 25px;
}
.md-card .md-subhead {
  font-size: 11px !important;
  opacity: 0.74 !important;
}
.md-card-media img {
  width: 80% !important;
}
.md-card-header .md-card-media {
  margin-left: 0px !important;
}
.md-icon-button {
  margin-top: 10px !important;
  margin-right: -8px !important;
}

.btn-sim-asn {
  background: rgb(133, 3, 3) !important;
  color: rgb(236, 236, 236) !important;
}

.active_btn_detail {
  background: rgba(247, 247, 247, 0.521);
}
</style>
