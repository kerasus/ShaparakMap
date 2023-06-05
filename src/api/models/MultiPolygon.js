import { appApiInstance } from 'src/boot/axios.js'
import { WaterList } from 'src/models/Water.js'
import { PofwList } from 'src/models/Pofw.js'
import { PlaceList } from 'src/models/Place.js'
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

  water() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.water,
      resolveCallback: (response) => {
        return new WaterList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  pofw() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.pofw,
      resolveCallback: (response) => {
        return new PofwList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  places() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.places,
      resolveCallback: (response) => {
        return new PlaceList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  natrual() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.natrual,
      resolveCallback: (response) => {
        return new NatrualList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  landuse() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.landuse,
      resolveCallback: (response) => {
        return new LanduseList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  buildings() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.buildings,
      resolveCallback: (response) => {
        return new BuildingList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
