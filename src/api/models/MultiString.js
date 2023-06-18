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

  railway(options) {
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
      request: this.APIAdresses.railway,
      data: mergedFilter,
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

  roads(options) {
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
      request: this.APIAdresses.roads,
      data: mergedFilter,
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

  waterWay(options) {
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
      request: this.APIAdresses.waterWay,
      data: mergedFilter,
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
