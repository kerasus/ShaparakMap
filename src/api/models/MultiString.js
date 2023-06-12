import { RoadList } from 'src/models/Road.js'
import { appApiInstance } from 'src/boot/axios.js'
import { RailwayList } from 'src/models/Railway.js'
import { WaterwayList } from 'src/models/Waterway.js'
import APIRepository from '../classes/APIRepository.js'

export default class MultiStringAPI extends APIRepository {
  constructor() {
    super('multiString', appApiInstance)
    this.APIAdresses = {
      railway: '/railway/',
      roads: '/roads/',
      waterWay: '/Waterway/'
    }
  }

  railway(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.railway,
      data: { page },
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new RailwayList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  roads(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.roads,
      data: { page },
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new RoadList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  waterWay(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.waterWay,
      data: { page },
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new WaterwayList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
