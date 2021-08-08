<template>
  <div>
      <sidebar-item 
          :link="{
            name: $t('sidebar.user'),
            icon: 'fa fa-user-circle',
            path: '/home'
          }"
        >
      </sidebar-item>
      <div class="dropdown-divider"></div>
      <sidebar-item 
          :link="{
            name: $t('sidebar.profile'),
            icon: 'fa fa-user-circle',
            path: '/user/profile'
          }"
        >
      </sidebar-item>

     <sidebar-item 
          :link="{
            name: $t('sidebar.hirarki'),
            icon: 'fa fa-sitemap',
            path: '/user/hirarki'
          }"
        >
      </sidebar-item>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
};
</script>

<style lang="scss">
</style>
