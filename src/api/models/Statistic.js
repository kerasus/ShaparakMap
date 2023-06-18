import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class StatisticAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      statical: '/statical/',
      information: '/information/'
    }
  }

  information() {
    return new Promise((resolve, reject) => {
      appApiInstance.post(this.APIAdresses.information, { trunc: 'daily' }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .then((response) => {
          const series = [
            {
              yAxis: 0,
              name: 'total_nop',
              max: 'max_nop',
              min: 'min_nop',
              data: []
            },
            {
              yAxis: 1,
              name: 'total_amount',
              max: 'max_amount',
              min: 'min_amount',
              data: []
            }
            // {
            //   name: 'min_nop',
            //   data: []
            // },
            // {
            //   name: 'min_amount',
            //   data: []
            // },
            // {
            //   name: 'max_nop',
            //   data: []
            // },
            // {
            //   name: 'max_amount',
            //   data: []
            // }
          ]
          const results = response.data.results
          series.forEach(sery => {
            sery.data = results.map(item => {
              return {
                name: item.datetime,
                y: item[sery.name],
                maxLabel: sery.max,
                minLabel: sery.min,
                max: item[sery.max],
                min: item[sery.min]
              }
            })
          })
          resolve(series)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  statical(options) {
    const defaultFilterOptions = {
      bbox: null,
      payload: null
    }
    const mergedFilter = Object.assign(defaultFilterOptions, options)
    Object.keys(mergedFilter).forEach(key => {
      if (mergedFilter[key] === null) {
        delete mergedFilter[key]
      }
    })
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      config: options.config,
      request: this.APIAdresses.statical,
      data: mergedFilter,
      resolveCallback: (response) => {
        return Object.assign({
          SUM_DIS: null,
          AVG_DIS: null,
          BRANCH_NUMBER: null,
          ATM_NUMBER: null,
          N_ATM_NUMBER: null,
          POS_NUMBER: null,
          N_POS_NUMBER: null,
          CVV2_NUMBER: null,
          N_CVV2_NUMBER: null,
          EC_NUMBER: null,
          N_EC_NUMBER: null,
          SB_NUMBER: null,
          N_SB_NUMBER: null,
          CP_NUMBER: null,
          N_CP_NUMBER: null
        }, response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
