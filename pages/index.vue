<template>
  <v-layout>
    <v-container>
      <h1>ダッシュボード</h1>

      <v-card>
        <v-tabs v-model="tab" grow icons-and-text>
          <v-tab>
            Numbers 3
            <v-icon>mdi-numeric-3-box-multiple</v-icon>
          </v-tab>
          <v-tab>
            Numbers 4
            <v-icon>mdi-numeric-4-box-multiple</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <RecentlyResults
                      :kind="3"
                      :show-menu="false"
                    ></RecentlyResults>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <StatisticsMode
                      :kind="3"
                      :items-per-page="3"
                    ></StatisticsMode>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <RecentlyResults
                      :kind="4"
                      :show-menu="false"
                    ></RecentlyResults>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <StatisticsMode
                      :kind="4"
                      :items-per-page="3"
                    ></StatisticsMode>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import RecentlyResults from '~/components/RecentlyResults';
import StatisticsMode from '~/components/StatisticsMode';

export default {
  components: {
    RecentlyResults,
    StatisticsMode
  },
  data() {
    return {
      tab: null
    };
  }
};
</script>
