import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { TransportList } from 'src/models/Transport.js'
import { Branche, BrancheList } from 'src/models/Branche.js'

export default class MultiStringAPI extends APIRepository {
  constructor() {
    super('point', appApiInstance)
    this.APIAdresses = {
      branchById: (branchId) => '/branche/' + branchId + '/',
      branches: '/branches/',
      searchbranche: '/searchbranche/',
      transport: '/transport/'
    }
  }

  getBranche(branchId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.branchById(branchId),
      resolveCallback: (response) => {
        return new Branche(response?.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  branches(options) {
    const defaultFilterOptions = {
      branchesCC: null,
      branchesATM: null,
      branchesEC: null,
      branchesSB: null,
      branchesPOS: null,
      branchesCVV2: null,
      branchesCP: null,
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
      request: this.APIAdresses.branches,
      data: mergedFilter,
      config: options.config,
      resolveCallback: (response) => {
        return {
          count: response?.data?.count,
          list: new BrancheList(response?.data?.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  searchbranche(options) {
    const defaultFilterOptions = {
      text: null
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
      request: this.APIAdresses.searchbranche,
      data: mergedFilter,
      config: options.config,
      resolveCallback: (response) => {
        return {
          count: response?.data?.count,
          list: new BrancheList(response?.data?.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  transport(options) {
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
      request: this.APIAdresses.transport,
      data: mergedFilter,
      resolveCallback: (response) => {
        return {
          count: response?.data?.count,
          list: new TransportList(response?.data?.results)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
