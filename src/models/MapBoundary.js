import { Collection, Model } from 'js-abstract-model'
import { MapPoint } from 'src/models/MapPoint'

class MapBoundary extends Model {
  constructor (data) {
    super(data, [
      {
        key: '_southWest',
        relatedModel: MapPoint
      },
      {
        key: '_northEast',
        relatedModel: MapPoint
      }
    ])
  }

  getBounds () {
    return {
      northEast: this._northEast.getPoint(),
      southWest: this._southWest.getPoint()
    }
  }

  getBBox () {
    return [
      this._northEast.getPoint().lng,
      this._northEast.getPoint().lat,
      this._southWest.getPoint().lng,
      this._southWest.getPoint().lat
    ]
  }
}

class MapBoundaryList extends Collection {
  model () {
    return MapBoundary
  }
}

export { MapBoundary, MapBoundaryList }
