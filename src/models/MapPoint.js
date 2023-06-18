import { Collection, Model } from 'js-abstract-model'

class MapPoint extends Model {
  constructor (data) {
    super(data, [
      { key: 'lat' },
      { key: 'lng' }
    ])
  }

  getPoint () {
    return {
      lat: this.lat,
      lng: this.lng
    }
  }
}

class MapPointList extends Collection {
  model () {
    return MapPoint
  }
}

export { MapPoint, MapPointList }
