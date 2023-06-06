import { Collection, Model } from 'js-abstract-model'

class Branche extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'closest_branch' },
      { key: 'number' },
      { key: 'code' },
      { key: 'name' },
      { key: 'address' },
      { key: 'beforeـnumber' },
      { key: 'farsighted' },
      { key: 'phone_1' },
      { key: 'phone_2' },
      { key: 'currencyـcircle' },
      { key: 'atm' },
      { key: 'eveningـcounter' },
      { key: 'Safeـbox' },
      { key: 'pos' },
      { key: 'cvv2' },
      { key: 'cellularـphone' },
      { key: 'done' },
      { key: 'city' },
      { key: 'geom' } // POINT
    ])

    if (typeof this.closest_branch === 'string') {
      const arr = this.closest_branch.split(',')
      const id = arr[0].trim().replace('\'id\':', '')
      const geom = arr[1].trim().replace('\'geom\':', '')
      const distance = arr[2].trim().replace('\'distance\':', '')
      const geomPointLatlng = geom.split(';')[1].replace('POINT (', '').replace(')', '').trim().split(' ').map(item => parseFloat(item))
      const geomPoint = {
        lat: geomPointLatlng[1],
        lng: geomPointLatlng[0]
      }
      this.closest_branch_info = { id, geom, distance, geomPoint }
      if (!isNaN(this.closest_branch_info.geomPoint.lat) && !isNaN(this.closest_branch_info.geomPoint.lng)) {
        this.closest_branch_point = this.closest_branch_info.geomPoint
      } else {
        this.closest_branch_point = {}
      }
    } else {
      this.closest_branch_info = {}
      this.closest_branch_point = {}
    }

    if (typeof this.geom === 'string') {
      const latlng = this.geom.split(';')[1].replace('POINT (', '').replace(')', '').trim().split(' ').map(item => parseFloat(item))
      this.point = {
        lat: latlng[1],
        lng: latlng[0]
      }
    } else {
      this.point = null
    }
  }
}

class BrancheList extends Collection {
  model () {
    return Branche
  }
}

export { Branche, BrancheList }
