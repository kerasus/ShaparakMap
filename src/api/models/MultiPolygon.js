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
      natrual: '/natrual/',
      landuse: '/landuse/',
      buildings: '/buildings/'
    }
  }

  water(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.water,
      data: { page },
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

  pofw(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.pofw,
      data: { page },
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

  places(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.places,
      data: { page },
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

  natrual(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.natrual,
      data: { page },
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

  landuse(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.landuse,
      data: { page },
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

  buildings(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.buildings,
      data: { page },
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
