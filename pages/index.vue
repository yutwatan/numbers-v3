<template>
  <v-layout>
    <v-container>
      <h1>ダッシュボード</h1>

      <v-row class="text-center">
        <v-col cols="12" sm="6" md="6">
          <v-card>
            <v-card-title>Numbers 3</v-card-title>
            <v-card-text>
              <div class="my-4 mb-10">
                <RecentlyResults :kind="3" :show-menu="false"></RecentlyResults>
              </div>
              <div class="my-4 mb-10">
                <StatisticsMode :kind="3" :items-per-page="3"></StatisticsMode>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-card>
            <v-card-title>Numbers 4</v-card-title>
            <v-card-text>
              <div class="my-4 mb-10">
                <RecentlyResults :kind="4" :show-menu="false"></RecentlyResults>
              </div>
              <div class="my-4 mb-10">
                <StatisticsMode :kind="4" :items-per-page="3"></StatisticsMode>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
  }
};
</script>
