import { Collection, Model } from 'js-abstract-model'
import { CityList } from 'src/models/City.js'

class Province extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'capacity' },
      { key: 'geom' },
      {
        key: 'cities',
        relatedModel: CityList
      }
    ])
  }
}

class ProvinceList extends Collection {
  model () {
    return Province
  }
}

export { Province, ProvinceList }
