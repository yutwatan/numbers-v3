<template>
  <div>
    <h3>最頻値 Top3（桁毎）</h3>
    <section v-if="errored">
      <p>バックエンドサーバとの通信でエラーが発生しました</p>
    </section>

    <v-data-table
      :headers="headers"
      :items="records"
      :items-per-page="itemsPerPage"
      :loading="loading"
      loading-text="データを読込中・・・"
      no-data-text="データがありません"
      locale="ja"
      class="elevation-1 mt-5"
    ></v-data-table>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'StatisticsMode',
  props: {
    kind: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    errored: false,

    // テーブル用
    loading: true,
    headers: [
      {
        text: '年',
        value: 'year'
      },
      {
        text: 'Rank',
        value: 'rank'
      },
      {
        text: '1桁',
        value: 'first_num'
      },
      {
        text: '2桁',
        value: 'second_num'
      },
      {
        text: '3桁',
        value: 'third_num'
      }
    ],
    records: []
  }),
  async mounted() {
    if (this.kind === 4) {
      this.headers.push({
        text: '4桁',
        value: 'fourth_num'
      });
    }
    await this.getModeData();
  },
  methods: {
    async getModeData() {
      const url = 'https://be.yutwatan.work/number/top3/' + this.kind;

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

function getTableData(top3data, kind) {
  const tableData = [];

  for (const yearData of top3data) {
    for (let i = 0; i < 3; i++) {
      const year = Object.keys(yearData)[0];
      const record = {
        year,
        rank: i + 1,
        first_num: yearData[year].first_num[i].number,
        second_num: yearData[year].second_num[i].number,
        third_num: yearData[year].third_num[i].number
      };
      if (kind === 4) {
        record.fourth_num = yearData[year].fourth_num[i].number;
      }
      tableData.push(record);
    }
  }

  return tableData;
}
</script>

<style scoped></style>
