<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="">
        <h4 slot="header" class="card-title">Daily Report</h4>
        <calendar
          ref="tuiCalendar"
          :calendars="calendarList"
          :schedules="scheduleList"
          :view="view"
          :taskView="taskView"
          :scheduleView="scheduleView"
          :theme="theme"
          :week="week"
          :month="month"
          :disableDblClick="disableDblClick"
          :isReadOnly="isReadOnly"
          :template="template"
          :useCreationPopup="useCreationPopup"
          :useDetailPopup="useDetailPopup"
          :usageStatistics="usageStatistics"
          @clickSchedule="onClickSchedule"
          @clickDayname="onClickDayname"
          @beforeCreateSchedule="beforeCreateSchedule"
          @beforeUpdateSchedule="beforeUpdateSchedule"
          @beforeDeleteSchedule="beforeDeleteSchedule"
          @createSchedules="createSchedules"
        />
      </card>

      <modal :show.sync="modals.modal" @close="modalClose">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Kegiatan Harian</h5>
        </template>
        <div>
          <form @submit.prevent v-on:submit.prevent="submitForm">
            <base-input
              label="Daily Report ID"
              v-model="form.daily_report_id"
              type="input"
            >
            </base-input>

            <base-input
              label="Kegiatan"
              v-model="form.kegiatan"
              type="input"
              placeholder="Kegiatan"
            >
            </base-input>

            <base-input
              label="Hasil"
              type="input"
              v-model="form.hasil"
              placeholder="hasil , satuan"
            >
            </base-input>

            <div class="form-row">
              <base-input
                class="col-md-6"
                v-model="form.work_date"
                label="Work Date"
                type="input"
              >
              </base-input>
              <base-input 
                class="col-md-3" 
                v-model="form.start_time" 
                label="Waktu Mulai" 
                type="input">
              
              </base-input>
              <base-input 
                class="col-md-3" 
                v-model="form.end_time" 
                label="Waktu Selesai" 
                type="input">
              </base-input>
            </div>
            <button class="btn btn-block btn-primary">Simpan</button>
          </form>
        </div>
        <template slot="footer"> </template>
      </modal>
    </div>
  </div>
</template>


<script>
import { Calendar } from "@toast-ui/vue-calendar";
import moment from "moment";

import { mapGetters } from 'vuex'

import { Modal } from "@/components";

export default {
  middleware: 'auth',
  components: {
    calendar: Calendar,
    modal: Modal,
  },
  computed: { 
    ...mapGetters([
        'nip'
    ])
  },
  data() {
    return {
      form: {
        daily_report_id: "",
        kegiatan: "",
        work_date: "",
        hasil: "",
        start_time: "",
        end_time: "",
        

      },
      
      usageStatistics: false,
      calendarList: [
        {
          id: "0",
          name: "home",
        },
        {
          id: "1",
          name: "office",
        },
      ],
      scheduleList: [],
      view: "day",
      taskView: [],
      scheduleView: ["time"],
      theme: {
        "month.dayname.height": "30px",
        "month.dayname.borderLeft": "1px solid #ff0000",
        "month.dayname.textAlign": "center",

        "week.today.color": "#333",
        "week.daygridLeft.width": "40px",
        "week.timegridLeft.width": "40px",
        "common.border": "1px solid #ffbb3b",

        "day.holiday.color": "#f54f3d",
        "day.saturday.color": "#3162ea",
        "day.dayname.color": "#708090",
      },

      week: {
        narrowWeekend: true,
        daynames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        //hourStart: 7,
        //hourEnd: 16
      },
      month: {
        daynames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        visibleWeeksCount: 6,
        startDayOfWeek: 1,
      },
      disableDblClick: false,
      isReadOnly: false,
      template: {
        timegridDisplayPrimaryTime: function(time) {

            return moment(time).format("HH:mm");
        },
        timegridDisplayTime: function(time) {
            return moment(time).format("HH:mm");
        },
        schedule: function(schedule) {
      /*
       * use another functions instead of 'schedule'
       * milestone: function() {...}
       * task: function() {...}
       * allday: function() {...}
      */

      return "getGridCategoryTemplate(schedule.category, schedule);"
    }
      },
      useCreationPopup: false, //gunakan modal nuxt
      useDetailPopup: false,

      //init modal
      modals: {
        modal: false,
      },
    };
  },
  methods: {
    getData(d1) {
      this.$axios
        .$get("/daily_activity", {
          params: {
            work_date: d1,
            nip: this.nip,
          },
        })
        .then((response) => {
          this.scheduleList = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onClickSchedule(e) {
      console.log("tes");
    },
    onClickDayname(e) {
      console.log("tes");
    },
    createSchedules(e) {
      console.log("tes");
    },

    //fungsi klik pada daily
    beforeCreateSchedule(e) {
      //cari dulu apakah di tanggal ini sudah ada daily report atau belum
      console.log("cari data daily report");
      this.$axios
        .$post("/daily_report", {
          work_date: moment(new Date(e.start._date)).format("YYYY-MM-DD"),
          nip: this.nip,
        })
        .then((response) => {
          //add variable to form modal
          this.form.daily_report_id = response.data.id;
          this.form.kegiatan = null;
          this.form.hasil = null;
          this.form.work_date = moment(new Date(e.start._date)).format(
            "DD-MM-YYYY"
          );
          this.form.start_time = moment(new Date(e.start._date)).format("HH:mm");
          this.form.end_time = moment(new Date(e.end._date)).format("HH:mm");

          this.modals.modal = true;
          console.log(response.data.id);
        })
        .catch((errors) => {
          console.log(errors);
          this.showAlert();
        });

      /* //var startTime = e.start;
      //var endTime = e.end;
      */
    },
    //fungsi update
    beforeUpdateSchedule(e) {
      //var schedule = e.schedule;
      //var changes = e.changes;
      console.log(e);
      if (e.changes == null) {
        this.modals.modal = true;
      } else {
        var daily_activity_id = e.schedule.id;
        var start_time = moment(e.start._date).format("HH:mm");
        var end_time = moment(e.end._date).format("HH:mm");

        this.$axios
          .put("/daily_activity", {
            daily_activity_id: daily_activity_id,
            start_time: start_time,
            end_time: end_time,
          })
          .then((res) => {
            this.getData(
              moment(this.$refs.tuiCalendar.invoke("getDate")).format(
                "YYYY-MM-DD"
              )
            );
            this.modals.modal = false;
          })
          .catch((error) => {
            // error.response.status Check status code
           
            console.log(error.response.status);
          })
          .finally(() => {
            //Perform action in always
          });
      }
    },
    beforeDeleteSchedule(e) {
      var schedule = e.schedule;

      //this.$refs.tuiCalendar.invoke('changeView','month'); //change to week
      //this.$refs.tuiCalendar.invoke('prev'); //go to kemarin
      //this.$refs.tuiCalendar.invoke('today'); //go to todaY
      //this.$refs.tuiCalendar.invoke('next'); //go to kemarin
      //var tes = this.$refs.tuiCalendar.invoke('getViewName'); //get view name
      //this.$refs.tuiCalendar.invoke('setDate','2021-05-29'); //go to spesific date
      //this.$refs.tuiCalendar.invoke('clear');
      var tes = this.$refs.tuiCalendar.invoke("getDate");

      console.log(tes);
    },

    modalClose(e) {
      console.log("modal close");
    },
    submitForm() {
      //console.log(moment(this.form.start_time).format("HH:mm"));
      this.$axios
        .post("/daily_activity", this.form)
        .then((res) => {
          this.getData(
            moment(this.$refs.tuiCalendar.invoke("getDate")).format(
              "YYYY-MM-DD"
            )
          );
          this.modals.modal = false;
        })
        .catch((error) => {
          
          console.log(error.response.status);
        })
        .finally(() => {
          //Perform action in always
        });
    },

   showAlert() {
      // Use sweetalert2
      this.$swal('Error');
    },
  },
  mounted() {
   
    var tgl = moment(this.$refs.tuiCalendar.invoke("getDate")).format("YYYY-MM-DD");
    //this.$refs.tuiCalendar.invoke('setDate','2021-06-15');
    this.getData(tgl);
  },
};
</script>