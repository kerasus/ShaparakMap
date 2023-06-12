import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class StatisticAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      information: '/information/'
    }
  }

  information() {
    return new Promise((resolve, reject) => {
      appApiInstance.post(this.APIAdresses.information, { trunc: 'daily' }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .then((response) => {
          const series = [
            {
              name: 'total_nop',
              data: []
            },
            {
              name: 'total_amount',
              data: []
            },
            {
              name: 'min_nop',
              data: []
            },
            {
              name: 'min_amount',
              data: []
            },
            {
              name: 'max_nop',
              data: []
            },
            {
              name: 'max_amount',
              data: []
            }
          ]
          const results = response.data.results
          series.forEach(sery => {
            sery.data = results.map(item => {
              return {
                name: item.datetime,
                y: item[sery.name]
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
}
