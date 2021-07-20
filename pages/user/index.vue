<template>
  <div class="row">
   
  </div>
</template>
<script>
 

export default {
  name: "userIndex",
  middleware: 'auth',
  layout: 'user',
  methods: {
    
  },
  mounted() {
    this.$router.push("/user/profile");
  },
};
</script>
<style></style>

