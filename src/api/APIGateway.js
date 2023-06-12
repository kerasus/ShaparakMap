import Auth from 'src/api/models/Auth.js'
import User from 'src/api/models/user.js'
import Point from 'src/api/models/Point.js'
import Province from 'src/api/models/Province.js'
import Statistic from 'src/api/models/Statistic.js'
import MultiString from 'src/api/models/MultiString.js'
import MultiPolygon from 'src/api/models/MultiPolygon.js'

/* Exporting the APIGateway object. */
export const APIGateway = {
  auth: new Auth(),
  user: new User(),
  point: new Point(),
  province: new Province(),
  statistic: new Statistic(),
  multiString: new MultiString(),
  multiPolygon: new MultiPolygon()
}
