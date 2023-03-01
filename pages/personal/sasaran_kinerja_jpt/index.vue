<template>
</template>
<script>

export default {
  middleware: ['auth'],
  layout: 'personalLayout',
  mounted() {
    this.$router.push(`./sasaran_kinerja`);
  },
};
</script>

