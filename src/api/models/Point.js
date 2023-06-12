import { appApiInstance } from 'src/boot/axios.js'
import { BrancheList } from 'src/models/Branche.js'
import APIRepository from '../classes/APIRepository.js'
import { TransportList } from 'src/models/Transport.js'

export default class MultiStringAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      branches: (page = 1) => '/branches/?page=' + page,
      transport: '/transport/'
    }
  }

  branches(page, options) {
    const defaultFilterOptions = {
      branchesCC: null,
      branchesATM: null,
      branchesEC: null,
      branchesSB: null,
      branchesPOS: null,
      branchesCVV2: null,
      branchesCP: null
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
      request: this.APIAdresses.branches(page),
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new BrancheList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  transport(page) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.transport,
      data: { page },
      resolveCallback: (response) => {
        return {
          count: response.data.count,
          list: new TransportList(response.data.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
