import { Collection, Model } from 'js-abstract-model'

class Building extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'fclass' },
      { key: 'name' },
      { key: 'type' },
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

class BuildingList extends Collection {
  model () {
    return Building
  }
}

export { Building, BuildingList }
