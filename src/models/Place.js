import { Collection, Model } from 'js-abstract-model'

class Place extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'population' },
      { key: 'fclass' },
      { key: 'name' },
      { key: 'geom' } // MULTIPOLYGON
    ])

    if (typeof this.geom === 'string') {
      this.multiPolygon = this.geom.split(';')[1].replace('MULTIPOLYGON (((', '').replace(')))', '').split(',')
        .map(item => {
          const latlngs = item.trim().split(' ').map(item => parseFloat(item))
          return {
            lat: latlngs[1],
            lng: latlngs[0]
          }
        })
        .filter(latlngs => !isNaN(latlngs.lat) && !isNaN(latlngs.lng))
    } else {
      this.multiPolygon = null
    }
  }
}

class PlaceList extends Collection {
  model () {
    return Place
  }
}

export { Place, PlaceList }
