<template>
  <v-container>
    <h1>カレンダー</h1>

    <v-alert v-if="errored" type="error" text outlined>
      バックエンドサーバとの通信でエラーが発生しました
    </v-alert>

    <v-sheet tile color="grey lighten-3" class="mt-5">
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          今日
        </v-btn>
        <v-btn icon class="ma-2" @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="ma-2" @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>日毎</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>週毎</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>月毎</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4日毎</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet color="secondary" height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        locale="ja"
        :type="type"
        :events="events"
        :weekdays="weekDays"
        :event-color="getEventColor"
        @click:event="showEvent"
        @click:date="viewDay"
        @change="getEvents"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-text="selectedEvent.start"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span>{{ selectedEvent.name }}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="selectedOpen = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Calendar',
  data() {
    return {
      errored: false,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: '月毎',
        week: '週毎',
        day: '日毎',
        '4day': '4日毎'
      },
      // today: this.getToday(),
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: []
    };
  },
  mounted() {
    this.$refs.calendar.checkChange();
    console.log(this.$refs.calendar.title);
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    async getEvents({ start, end }) {
      const events = [];

      const num3data = await this.getNumbersData(start.date, end.date, 3);
      const num4data = await this.getNumbersData(start.date, end.date, 4);

      for (const numbers of num3data) {
        events.push({
          name: numbers.number,
          start: numbers.event.date,
          end: numbers.event.date,
          color: 'secondary',
          timed: false
        });
      }
      for (const numbers of num4data) {
        events.push({
          name: numbers.number,
          start: numbers.event.date,
          end: numbers.event.date,
          color: 'accent',
          timed: false
        });
      }

      this.events = events;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getToday() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return year + '-' + month + '-' + day;
    },
    async getNumbersData(from, to, kind) {
      const url =
        'https://be.yutwatan.work/number?from=' +
        from +
        '&to=' +
        to +
        '&type=' +
        kind;

      try {
        const response = await axios.get(url);
        return response.data;
      } catch (e) {
        console.error(e);
        this.errored = true;
      }
    }
  }
};
</script>

<style scoped></style>
