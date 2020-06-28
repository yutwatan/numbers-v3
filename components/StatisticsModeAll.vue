<template>
  <div>
    <h3>最頻値 Top5（全桁）</h3>
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
      :loading="loading"
      hide-default-footer
      loading-text="データを読込中・・・"
      no-data-text="データがありません"
      locale="ja-jp"
      class="elevation-1 mt-5"
      fixed-header
    ></v-data-table>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'StatisticsModeAll',
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
        text: 'Rank',
        value: 'rank',
        sortable: false
      },
      {
        text: '数字',
        value: 'number'
      },
      {
        text: '回数',
        value: 'count'
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
        'https://be.yutwatan.work/number/all_mean?from=' +
        this.from +
        '&to=' +
        this.to +
        '&type=' +
        this.kind;

      try {
        const response = await axios.get(url);
        this.records = getTableData(response.data, this.kind);
      } catch (e) {
        console.error(e);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    }
  }
};

function getTableData(data) {
  const tableData = [];

  for (let i = 0; i < data.length; i++) {
    tableData.push({
      rank: i + 1,
      number: data[i].num,
      count: data[i].count
    });
  }
  return tableData;
}
</script>

<style scoped></style>
