import { User } from 'src/models/User.js'
import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository'

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', appApiInstance, '/user', new User())
    this.APIAdresses = {
      base: '/user'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data.data) },
      post: (response) => { return new User(response.data.data) },
      put: (response) => { return new User(response.data.data) },
      delete: (response) => { return new User(response.data.data) }
    })
  }

  nationalCard(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.nationalCard,
      cacheKey: this.CacheList.nationalCard,
      data,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
