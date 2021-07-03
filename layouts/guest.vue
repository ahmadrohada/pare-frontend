<template>
  <div class="main-panel login-page">
    <nuxt></nuxt>
    <content-footer v-if="!isFullScreenRoute"></content-footer>
  </div>
</template>
<script>
</script>
<style lang="scss">
.login-page {
  //background-image: url(~/static/img/pare_bg.jpg) !important;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
