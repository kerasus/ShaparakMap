import { Branche } from 'src/models/Branche.js'
import { Collection, Model } from 'js-abstract-model'

class Cluster extends Model {
  constructor (data) {
    super(data, [
      { key: 'branch_count' },
      {
        key: 'branchies',
        relatedModel: Branche
      },
      { key: 'geom' } // POINT
    ])

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

class ClusterList extends Collection {
  model () {
    return Cluster
  }

  inBounds (bounds) {
    return this.list.filter(item =>
      (item.point.lat > bounds._southWest.lat && item.point.lat < bounds._northEast.lat) &&
      (item.point.lng > bounds._southWest.lng && item.point.lng < bounds._northEast.lng))
  }
}

export { Cluster, ClusterList }
