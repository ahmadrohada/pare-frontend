<template>
  <div>
      <sidebar-item 
          :link="{
            name: $t('sidebar.home'),
            icon: 'tim-icons icon-app',
            path: '/home'
          }"
        >
        </sidebar-item>

        <sidebar-item 
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/personal/dashboard'
          }"
        >
        </sidebar-item>
  </div>
</template>

<script>
export default {
  name: "DefaultMenu",
};
</script>

<style lang="scss">
</style>
