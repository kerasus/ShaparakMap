import { Collection, Model } from 'js-abstract-model'

class Branche extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'closest_branch' },
      { key: 'closest_distance' },
      { key: 'closest_geom' }, // "SRID=4326;POINT (51.444508 35.651476)"
      { key: 'closest_name' },
      { key: 'get_closest_point' },
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

    if (!this.closest_branch) {
      this.closest_branch = this.get_closest_point
    }

    const getKey = function (arr, key) {
      const target = arr.findIndex(item => item.includes("'" + key + "':"))
      if (target === -1) {
        return null
      }
      const item = arr[target].trim().replace('\'' + key + '\':', '').trim()

      return item
    }
    if (typeof this.closest_branch === 'string') {
      const arr = this.closest_branch.split(',')
      const id = getKey(arr, 'id')
      const geom = getKey(arr, 'geom')
      const distance = getKey(arr, 'distance')
      // const id = arr[0].trim().replace('\'id\':', '')
      // const geom = arr[1].trim().replace('\'geom\':', '')
      // const distance = arr[2].trim().replace('\'distance\':', '')
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
    } else if (typeof this.closest_geom === 'string') {
      const latlng = this.closest_geom.split(';')[1].replace('POINT (', '').replace(')', '').trim().split(' ').map(item => parseFloat(item))
      const id = parseInt(this.closest_geom.split(';')[0].replace('SRID=', '').trim())
      const distance = this.closest_distance
      const geom = this.closest_geom
      const name = this.closest_name
      const geomPoint = {
        lat: latlng[1],
        lng: latlng[0]
      }
      this.closest_branch_info = { id, geom, distance, geomPoint, name }
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

  inBounds (bounds) {
    return this.list.filter(item =>
      (item.point.lat > bounds._southWest.lat && item.point.lat < bounds._northEast.lat) &&
      (item.point.lng > bounds._southWest.lng && item.point.lng < bounds._northEast.lng))
  }
}

export { Branche, BrancheList }
