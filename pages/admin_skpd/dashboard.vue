<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card>
        ADMIN SKPD DASHBOARD


        {{nama_skpd}}
      </card>
    </div>
  </div>
</template>
<script>

export default {
  name: "dashoard",
  layout: "dashboard",
  middleware: 'auth',
  data() {
    return {
      nama_skpd: '',
    };
  },
  methods: {
    getData($id_skpd) {
      this.$axios
        .$get("/pegawai", {
          params: {
            id_skpd: $id_skpd,
          },
        })
        .then((response) => {
          this.user = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
  mounted() {
    this.getData(this.$auth.user.profile.skpd.id)
    this.nama_skpd = this.$auth.user.profile.skpd.nama
  }
};
</script>
<style></style>

