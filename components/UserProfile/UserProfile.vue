<template>
  <card class="font-weight-300">
    <h4 class="card-title">User Profile</h4>
        <p class="card-text"><i class="fa fa-university"></i> SKPD</p>
        <p class="text-muted">{{ user.skpd }}</p>


        <hr>
        <p class="card-text"><i class="fa fa-tags"></i> Unit Kerja</p>
        <p class="text-muted">{{ user.unit_kerja }}</p>
        <hr />

        <!-- <p class="card-text"><i class="fa fa-sitemap"></i> Jabatan</p>
        <p class="text-muted">
          {{ $jabatan }}
        </p>

        <hr />
        <p class="card-text"><i class="fa fa-bar-chart"></i> Eselon</p>
        <p class="text-muted">
          {{ $jenis_jabatan }} /
          {{ $eselon }}
        </p>

        <hr />
        <p class="card-text"><i class="fa fa-users"></i> Golongan Terakhir</p
        >
        <p class="text-muted">
          {{ $golongan }} /
          {{ $tmt_golongan }}
        </p>

        <hr />
        <p class="card-text"><i class="fa fa-phone"></i> No. Handphone</p>
        <p class="text-muted">
          {{ $no_hp }}
        </p>

        <hr />
        <p class="card-text"><i class="fa fa-envelope-o"></i> Email</p>
        <p class="text-muted">
          {{ $email }}
        </p>

        <hr />
        <p class="card-text"><i class="fa fa-map"></i> Alamat</p>
        <p class="text-muted">
          {{ $alamat }}
        </p> -->

  </card>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    getData($user_id) {
      this.$axios
        .$get("/profile", {
          params: {
            user_id: $user_id,
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
    this.getData(this.$auth.profile)
  }
};
</script>
<style></style>
