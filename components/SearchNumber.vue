<template>
  <div>
    <h3>番号検索</h3>
    <section v-if="errored">
      <p>バックエンドサーバとの通信でエラーが発生しました</p>
    </section>

    <v-text-field
      v-model.number="inputNumber"
      label="Number"
      prepend-icon="mdi-magnify"
      :rules="[checkLength, checkType]"
    ></v-text-field>

    <v-btn color="primary" :disabled="disabledBtn" @click="getNumbersData"
      >検索</v-btn
    >

    <v-data-table
      :headers="headers"
      :items="records"
      :items-per-page="10"
      :loading="loading"
      loading-text="データを読込中・・・"
      no-data-text="データがありません"
      locale="ja"
      class="elevation-1 mt-5"
      fixed-header
    ></v-data-table>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'SearchNumber',
  props: {
    kind: {
      type: Number,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      errored: false,
      inputNumber: this.number,
      disabledBtn: false,

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
    };
  },
  async mounted() {
    await this.getNumbersData();
  },
  methods: {
    checkLength(value) {
      if (value.toString().length === this.kind) {
        this.disabledBtn = false;
        return true;
      } else {
        this.disabledBtn = true;
        return this.kind + ' digit';
      }
    },
    checkType(value) {
      if (typeof value === 'number') {
        this.disabledBtn = false;
        return true;
      } else {
        this.disabledBtn = true;
        return 'number only';
      }
    },
    async getNumbersData() {
      const url =
        'https://be.yutwatan.work/number/' +
        this.inputNumber +
        '?type=' +
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
