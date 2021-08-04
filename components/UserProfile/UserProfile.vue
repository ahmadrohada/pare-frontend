<template>
  <card class="font-weight-300">
    <h4 class="card-title">User Profile</h4>
    {{ someData }}
        <p class="card-text"><i class="fa fa-user"></i> NAMA LENGKAP</p>
        <p class="text-muted">{{ user.pegawai.nama_lengkap }}</p>
        <hr>
        <p class="card-text"><i class="fa fa-id-badge"></i> NIP</p>
        <p class="text-muted">{{ user.pegawai.nip }}</p>
        <hr>

        <p class="card-text"><i class="fa fa-id-card"></i> JABATAN ( {{ user.jabatan.jenis}} )</p>
        <p class="text-muted">{{ user.jabatan.nama}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-university"></i> SKPD</p>
        <p class="text-muted">{{ user.skpd.nama}}</p>
        <hr>

        <p class="card-text"><i class="fa fa-tags"></i> Unit Kerja</p>
        <p class="text-muted">{{ user.unit_kerja.nama }}</p>
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
      await this.$axios
        .$get("/me/profile")
        .then((response) => {
          this.user = response['data'];
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>
<style></style>
