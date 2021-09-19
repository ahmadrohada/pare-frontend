<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline"></h4>
      <p class="card-category d-inline"></p>
    </template>

    
  </card>
</template>


<script>

export default {
  asyncData ({ redirect,params }) {
    return redirect(`/skpd/user/${params.nip}/detail`)
  },
  mounted() {
    //console.log(this.$route.params.nip)
    //this.$router.push(`/skpd/user/${this.$route.params.nip}/detail`); 
  },
};
</script>
<style></style>

