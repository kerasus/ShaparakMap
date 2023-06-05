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

  railway() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.railway,
      resolveCallback: (response) => {
        return new RailwayList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  roads() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.roads,
      resolveCallback: (response) => {
        return new RoadList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  waterWay() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.waterWay,
      resolveCallback: (response) => {
        return new WaterwayList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
