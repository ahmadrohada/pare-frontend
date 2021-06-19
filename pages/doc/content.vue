<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="">
        <base-button type="primary" @click="modals.modal0 = true">
          Launch demo modal
        </base-button>
        <modal :show.sync="modals.modal0">
          <template slot="header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          </template>
          <div>
            <div class="d-flex justify-content-start mb-3">
              <h4 slot="header" class="card-title">Daily Report</h4>
            </div>

            <base-button type="default">Default</base-button>
            <base-button type="primary">Primary</base-button>
            <base-button type="info">Info</base-button>
            <base-button type="success">Success</base-button>
            <base-button type="danger">Danger</base-button>
            <base-button type="warning">Warning</base-button>
            <base-input type="text"></base-input>

            <base-alert type="primary" dismissable>
              <strong>Primary!</strong> This is a primary alert—check it out!
            </base-alert>
          </div>
          <template slot="footer">
            <base-button type="secondary" @click="modals.modal0 = false"
              >Close</base-button
            >
            <base-button type="primary">Save changes</base-button>
          </template>
        </modal>
      </card>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      modals: {
        modal0: true,
      },
    };
  },
};
</script>