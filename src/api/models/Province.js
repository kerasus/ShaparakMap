import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ProvinceList } from 'src/models/Province.js'

export default class ProvinceAPI extends APIRepository {
  constructor() {
    super('province', appApiInstance)
    this.APIAdresses = {
      base: '/province/'
    }
  }

  index() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return new ProvinceList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
