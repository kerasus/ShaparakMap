import { appApiInstance } from 'src/boot/axios.js'
import { BrancheList } from 'src/models/Branche.js'
import { TransportList } from 'src/models/Transport.js'
import APIRepository from '../classes/APIRepository.js'

export default class MultiStringAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      branches: '/branches/',
      transport: '/transport/'
    }
  }

  branches() {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.branches,
      resolveCallback: (response) => {
        return new BrancheList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  transport() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.transport,
      resolveCallback: (response) => {
        return new TransportList(response.data.results)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
