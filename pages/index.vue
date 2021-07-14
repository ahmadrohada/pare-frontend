<template>
  <div class="row">
   
  </div>
</template>
<script>
 

export default {
  name: "home",
  middleware: 'auth',
  methods: {
    
  },
  mounted() {


    this.$router.push("/home");
  },
};
</script>
<style></style>

