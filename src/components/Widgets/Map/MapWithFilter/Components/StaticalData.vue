<template>
  <div class="row q-col-gutter-lg state-overview">
    <template v-if="data">
      <div class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="info-box card-3">
          <div class="info-box-content">
            <span class="info-box-text">SUM_DIS</span>
            <span class="info-box-number">{{ data.SUM_DIS }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="info-box card-4">
          <div class="info-box-content">
            <span class="info-box-text">AVG_DIS</span>
            <span class="info-box-number">{{ data.AVG_DIS }}</span>
          </div>
        </div>
      </div>
      <div v-for="(staticalDataKey, staticalDataIndex) in staticalDataKeys"
           :key="staticalDataKey"
           class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="info-box"
             :class="'card-' + ((staticalDataIndex%4) + 1)">
          <div class="info-box-content">
            <span class="info-box-text">{{ staticalDataKey }}</span>
            <span class="info-box-number">{{ data[staticalDataKey] }}</span>
            <div class="progress">
              <q-linear-progress :value="data[staticalDataKey] / data.BRANCH_NUMBER"
                                 color="warning"
                                 class="q-mt-md" />
            </div>
            <span class="progress-description">
              {{ data[staticalDataKey] }} of {{ data.BRANCH_NUMBER }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'StaticalData',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      staticalDataKeys: [
        // 'SUM_DIS',
        // 'AVG_DIS',
        'BRANCH_NUMBER',
        'ATM_NUMBER',
        'N_ATM_NUMBER',
        'POS_NUMBER',
        'N_POS_NUMBER',
        'CVV2_NUMBER',
        'N_CVV2_NUMBER',
        'EC_NUMBER',
        'N_EC_NUMBER',
        'SB_NUMBER',
        'N_SB_NUMBER',
        'CP_NUMBER',
        'N_CP_NUMBER'
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.info-box-content {
  margin: 0;
}
</style>
