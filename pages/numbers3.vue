<template>
  <v-container>
    <h1>Numbers 3</h1>

    <v-row class="text-center">
      <v-col cols="12" sm="6" md="4">
        <RecentlyResults :kind="3" :show-menu="true"></RecentlyResults>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <SearchNumber :kind="3" :number="123"></SearchNumber>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <StatisticsMode :kind="3" :items-per-page="9"></StatisticsMode>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12" sm="6" md="4">
        <StatisticsModeAll :kind="3" :show-menu="true"></StatisticsModeAll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecentlyResults from '@/components/RecentlyResults';
import SearchNumber from '@/components/SearchNumber';
import StatisticsMode from '@/components/StatisticsMode';
import StatisticsModeAll from '@/components/StatisticsModeAll';
export default {
  name: 'Numbers3',
  components: {
    RecentlyResults,
    SearchNumber,
    StatisticsMode,
    StatisticsModeAll
  }
};
</script>

<style lang="scss" scoped></style>
