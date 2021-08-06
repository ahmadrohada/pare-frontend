<template>
  <card class="font-weight-300">
    

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-media>
          <img src="~/static/img/emilyz.jpg" alt="Avatar">
        </md-card-media>
        <md-card-header-text>
          <div class="md-title">Asep Aang Rahmatullah, STTP,SNI</div>
          <div class="md-subhead">NIP. 1960275532768325</div>
          <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
        </md-card-header-text>

        <md-button class="md-icon-button">
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
          
       
      </md-card-header>
    </md-card>

    <center style="margin-bottom:10px;">
      <md-icon>keyboard_arrow_up</md-icon>
    </center>

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-media>
          <img src="~/static/img/emilyz.jpg" alt="Avatar">
        </md-card-media>
        <md-card-header-text>
          <div class="md-title">Asep Aang Rahmatullah, STTP,SNI</div>
          <div class="md-subhead">NIP. 1960275532768325</div>
          <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
        </md-card-header-text>

        <md-button class="md-icon-button">
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
          
       
      </md-card-header>
    </md-card>

    <center style="margin-bottom:10px;">
      <md-icon>keyboard_arrow_up</md-icon>
    </center>

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-media>
          <img src="~/static/img/emilyz.jpg" alt="Avatar">
        </md-card-media>
        <md-card-header-text>
          <div class="md-title">Asep Aang Rahmatullah, STTP,SNI</div>
          <div class="md-subhead">NIP. 1960275532768325</div>
          <!-- <div class="md-subhead">Kepala Badan kepegawaian dan pengembangan sukmber data manusia</div> -->
        </md-card-header-text>

        <md-button class="md-icon-button">
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
          
       
      </md-card-header>
    </md-card>


  </card>
</template>
<script>


export default {
  components: {
   
  },
  data() {
    return {
      user: [],
      user:{
        pegawai : [],
        skpd : [],
        jabatan : [],
        unit_kerja : []
      },
      nama_lengkap : null ,
    };
  },
  async beforeMount()  {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      }) 

      await this.$axios
        .$get("/me/hirarki")
        .then((response) => {
          this.user = response['data'];
          setTimeout(() => this.$nuxt.$loading.finish(), 800)
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => this.$nuxt.$loading.finish(), 800)
        });
  },
   mounted() {

  }
  
};
</script>
<style>

.md-card-header{
  height: 98px;
}
.md-card .md-title{
  font-size: 15px !important;
  margin-top: -4px !important;
  line-height: 25px;
}
.md-card .md-subhead{
  opacity: .74 !important;
}
.md-card-media img {
    width: 80% !important;
}
.md-card-header .md-card-media{
  margin-left: 0px !important;
}
.md-icon-button{
  margin-top: 10px !important;

}
</style>
