<template>
  <div>
    <h3>最近の結果</h3>
    <section v-if="errored">
      <p>バックエンドサーバとの通信でエラーが発生しました</p>
    </section>

    <div v-if="showMenu">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="from"
            label="From"
            prepend-icon="mdi-calendar-month"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="from"
          locale="ja"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="to"
            label="To"
            prepend-icon="mdi-calendar-month"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="to"
          locale="jp"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>

      <v-btn color="primary" @click="getNumbersData">再取得</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="records"
      :items-per-page="5"
      :loading="loading"
      loading-text="データを読込中・・・"
      no-data-text="データがありません"
      locale="ja-jp"
      class="elevation-1 mt-5"
      fixed-header
    ></v-data-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecentlyResults',
  props: {
    kind: {
      type: Number,
      required: true
    },
    showMenu: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    errored: false,

    // Date picker
    menu: false,
    modal: false,
    menu2: false,

    // データ取得期間
    from: new Date().getFullYear() + '-01-01',
    to: new Date().getFullYear() + '-12-31',

    // テーブル用
    loading: true,
    headers: [
      {
        text: '回',
        value: 'event.times'
      },
      {
        text: '抽選日',
        value: 'event.date'
      },
      {
        text: '抽選数字',
        value: 'number',
        sortable: false
      }
    ],
    records: []
  }),
  async mounted() {
    await this.getNumbersData();
  },
  methods: {
    async getNumbersData() {
      const url =
        'https://be.yutwatan.work/number?from=' +
        this.from +
        '&to=' +
        this.to +
        '&type=' +
        this.kind;

      try {
        const response = await axios.get(url);
        this.records = response.data;
      } catch (e) {
        console.error(e);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped></style>
