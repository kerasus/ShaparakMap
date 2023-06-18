import { PofwList } from 'src/models/Pofw.js'
import { PlaceList } from 'src/models/Place.js'
import { WaterList } from 'src/models/Water.js'
import { appApiInstance } from 'src/boot/axios.js'
import { NatrualList } from 'src/models/Natrual.js'
import { LanduseList } from 'src/models/Landuse.js'
import { BuildingList } from 'src/models/Building.js'
import APIRepository from '../classes/APIRepository.js'

export default class MultiPolygonAPI extends APIRepository {
  constructor() {
    super('multiPolygon', appApiInstance)
    this.APIAdresses = {
      water: '/water/',
      pofw: '/pofw/',
      places: '/places/',
      searchplace: '/searchplace/',
      natrual: '/natrual/',
      landuse: '/landuse/',
      buildings: '/buildings/'
    }
  }

  water(options) {
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
      request: this.APIAdresses.water,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new WaterList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  pofw(options) {
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
      request: this.APIAdresses.pofw,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new PofwList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  // places(options) {
  //   const defaultFilterOptions = {
  //     bbox: null,
  //     payload: null
  //   }
  //   const mergedFilter = Object.assign(defaultFilterOptions, options)
  //   Object.keys(mergedFilter).forEach(key => {
  //     if (mergedFilter[key] === null) {
  //       delete mergedFilter[key]
  //     }
  //   })
  //   return this.sendRequest({
  //     apiMethod: 'post',
  //     api: this.api,
  //     config: options.config,
  //     request: this.APIAdresses.places,
  //     data: mergedFilter,
  //     resolveCallback: (response) => {
  //       return {
  //         count: response.data.count,
  //         list: new PlaceList(response.data.results)
  //       }
  //     },
  //     rejectCallback: (error) => {
  //       return error
  //     }
  //   })
  // }

  places(options) {
    const defaultFilterOptions = {
      place: null
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
      request: this.APIAdresses.searchplace,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new PlaceList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  natrual(options) {
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
      request: this.APIAdresses.natrual,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new NatrualList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  landuse(options) {
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
      request: this.APIAdresses.landuse,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new LanduseList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  buildings(options) {
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
      request: this.APIAdresses.buildings,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new BuildingList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
