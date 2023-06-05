import { appApiInstance } from 'src/boot/axios.js'
import { TransportList } from 'src/models/Transport.js'
import APIRepository from '../classes/APIRepository.js'

export default class MultiStringAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      transport: '/transport/'
    }
  }

  transport(data) {
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
