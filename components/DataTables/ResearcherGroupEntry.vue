<template>
<md-table-row>
    <md-table-cell>
      <md-button class="md-icon-button md-primary" @click="toggleExpansion">
        <md-icon v-if="expanded">keyboard_arrow_down</md-icon>
        <md-icon v-else>keyboard_arrow_right</md-icon>
      </md-button>
      <md-button @click="toggleExpansion" class="index-icon md-icon-button md-raised md-primary">{{indexValue + 1}}</md-button>
    </md-table-cell>
    <md-table-cell>{{groupData.label}}</md-table-cell>
    <md-table-cell>Group</md-table-cell>
    <md-table-cell>
      <md-button @click="openTab" class="md-primary">
        <md-icon>add_box</md-icon>
        Add Client / Client Type
      </md-button>
    </md-table-cell>
    <md-table-cell>
      <md-button class="md-primary">
        <md-icon>settings</md-icon>
        Settings
      </md-button>
    </md-table-cell>
  <app-add-client-to-group-tab :indexValue="indexValue" :groupData="groupData" :closeTab="closeTab" :addClientToGroupTab="addClientToGroupTab"></app-add-client-to-group-tab>
  </md-table-row>

</template>