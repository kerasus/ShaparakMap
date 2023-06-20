<template>
  <div class="row q-col-gutter-lg state-overview">
    <template v-if="data">
      <div class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="info-box card-3">
          <div class="info-box-content custom-height">
            <div>
              تعداد کل شعب:
              {{ data.BRANCH_NUMBER }}
            </div>
            <div>
              مجموع مسافت:
              {{ data.SUM_DIS }}
            </div>
            <div>
              میانگین مسافت:
              {{ data.AVG_DIS }}
            </div>
          </div>
        </div>
      </div>
      <div v-for="(staticalDataKey, staticalDataIndex) in staticalDataKeys"
           :key="staticalDataIndex"
           class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="info-box"
             :class="'card-' + ((staticalDataIndex%4) + 1)">
          <div class="info-box-content">
            <span class="info-box-text">{{ staticalDataKey.key }}</span>
            <span class="info-box-number">
              {{ data[staticalDataKey.pKey] }}
              شعبه
              {{ staticalDataKey.key }}
              دارند
            </span>
            <div class="progress">
              <q-linear-progress :value="data[staticalDataKey.pKey] / data.BRANCH_NUMBER"
                                 color="warning"
                                 class="q-mt-md" />
            </div>
            <span class="progress-description">
              {{ data[staticalDataKey.nKey] }}
              از
              {{ data.BRANCH_NUMBER }}
              شعبه
              {{ staticalDataKey.key }}
              ندارند
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
        {
          key: 'ATM',
          pKey: 'ATM_NUMBER',
          nKey: 'N_ATM_NUMBER'
        },
        {
          key: 'POS',
          pKey: 'POS_NUMBER',
          nKey: 'N_POS_NUMBER'
        },
        {
          key: 'CVV2',
          pKey: 'CVV2_NUMBER',
          nKey: 'N_CVV2_NUMBER'
        },
        {
          key: 'EC',
          pKey: 'EC_NUMBER',
          nKey: 'N_EC_NUMBER'
        },
        {
          key: 'SB',
          pKey: 'SB_NUMBER',
          nKey: 'N_SB_NUMBER'
        },
        {
          key: 'CP',
          pKey: 'CP_NUMBER',
          nKey: 'N_CP_NUMBER'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.info-box {
  height: 165px;
  .info-box-content {
    margin: 0;
  }
}
</style>
