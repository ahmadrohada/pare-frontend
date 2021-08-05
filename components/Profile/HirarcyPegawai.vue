<template>
  <card class="font-weight-300">
    

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Green custom theme</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>

        <md-card-media>
          <img src="~/static/img/emilyz.jpg" alt="Avatar">
        </md-card-media>
      </md-card-header>
    </md-card>

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Green custom theme</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>

        <md-card-media>
          <img src="~/static/img/jana.jpg" alt="Avatar">
        </md-card-media>
      </md-card-header>
    </md-card>

    <md-card class="md-primary" md-theme="green-card">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Green custom theme</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header-text>

        <md-card-media>
          <img src="~/static/img/lora.jpg" alt="Avatar">
        </md-card-media>
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
        .$get("/me/profile")
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
   /*   
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 800)
    })  */
  }
  
};
</script>
<style></style>
