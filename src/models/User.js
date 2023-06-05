import { Model, Collection } from 'js-abstract-model'

class User extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'user_id' },
      { key: 'firstname' },
      { key: 'lastname' },
      { key: 'national_code' },
      { key: 'phone_number' },
      { key: 'picture' },
      { key: 'roles' },
      { key: 'mobile_number' }
    ])

    if (!this.id) {
      this.id = this.user_id
    }
    if (!this.picture) {
      this.picture = '/img/default-avatar.png'
    }
  }

  hasRole (role) {
    return this.roles.includes(role)
  }

  isSuperuser () {
    return this.hasRole('superuser')
  }
}

class UserList extends Collection {
  model() {
    return User
  }
}

export { User, UserList }
