<template>
  <card style="min-height:500px;">
    <template slot="header" class="d-inline">
      <h4 class="title d-inline">Dashboard</h4>
      <p class="card-category d-inline">RENJA SKPD</p>
    </template>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </card>
</div>

</template>


<script>
export default {
  middleware: ['auth'],
  layout: "renjaLayout",
  data() {
      return {
        activities: [{
          content: 'Perjanjian Kinerja JPT',
          timestamp: '-',
          color: '#d38a70'
        }, {
          content: 'SKP JPT',
          timestamp: '-',
          color: '#d38a70'
        }, {
          content: 'Custom size',
          timestamp: '2018-04-03 20:46',
          color: '#d38a70'
        }, {
          content: 'Default node',
          timestamp: '2018-04-03 20:46',
          color: '#d38a70'
        }]
      };
  },
  methods: {
    
  },
  mounted() {
   
  },
};
</script>
<style></style>

