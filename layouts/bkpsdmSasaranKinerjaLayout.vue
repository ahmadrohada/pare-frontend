<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
    <skp-skpd-menu 
          :skpdLogo="dataUser.skpd.logo"
          :skpdSingkatan="dataUser.skpd.singkatan"
          ></skp-skpd-menu>
    </side-bar>
    
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>
      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        
        <zoom-center-transition :duration="300" mode="out-in">
          <nuxt></nuxt>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */

  
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue';
  import ContentFooter from '@/components/Layout/ContentFooter.vue';
  import DashboardContent from '@/components/Layout/Content.vue';
  import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';
  import SkpSkpdMenu from '~/components/Menu/SasaranKinerjaBkpsdmMenu.vue';

  import { mapGetters } from 'vuex'

  export default {
    
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      SlideYDownTransition,
      ZoomCenterTransition,
      SkpSkpdMenu,
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
      };
    },
    computed: {
      isFullScreenRoute() {
        return this.$route.path === '/maps/full-screen'
      },
      ...mapGetters({
        dataUser:'user',
      })
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      initScrollbar() {
        let docClasses = document.body.classList;
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('sidebar');
          initScrollbar('main-panel');
          initScrollbar('sidebar-wrapper');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      }
    },
    watch: {
      '$route.path': function() {
        console.log(this.$route); 
      }
    },
    mounted() {
      this.initScrollbar();
    }
  };
</script>
<style lang="scss">
  $scaleSize: 0.95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }

  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }

  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }
  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }
</style>
