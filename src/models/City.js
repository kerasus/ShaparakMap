import { Collection, Model } from 'js-abstract-model'

class City extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'geom' },
      { key: 'province' }
    ])
  }
}

class CityList extends Collection {
  model () {
    return City
  }
}

export { City, CityList }
