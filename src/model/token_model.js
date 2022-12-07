// NPM models
const { Model } = require('objection')
// Local Models
const UserModel = require('./user_model')

class TokenModel extends Model {
  static get idColumn() { return 'id' }
  static get tableName() { return 'token' }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'refresh_token'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        refresh_token: { type: 'string', minLength: 10, maxLength: 500 }
      }
    }
  }

  $formatJson(json) {
    json = super.$formatJson(json)
    delete json.password
    return json
  }


  static get relationMappings() {
    const RoleModel = require('./role_model')
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'token.user_id',
          to: 'user.id'
        }
      },
      role: {
        relation: Model.HasOneThroughRelation,
        modelClass: RoleModel,
        join: {
          from: 'token.user_id',
          through: {
            from: 'user.id',
            to: 'user.role_id'
          },
          to: 'role.id'
        }
      }
    }
  }


  // Methods
  static async create(payload) {
    return TokenModel.query().insert(payload)

  }

  static async getByUserId(user_id) {
    return TokenModel.query().findOne({ user_id })
  }

  static async updateByUserID(user_id, refresh_token) {
    return TokenModel.query()
      .patch({ refresh_token })
      .where({ user_id })
  }

  static async removeTokenByRefreshToken(refresh_token) {
    return TokenModel.query()
      .delete()
      .where({ refresh_token })
  }

  static async getTokenByRefreshToken(refresh_token) {
    return TokenModel.query().findOne({ refresh_token })
      .withGraphFetched('user')
      .withGraphFetched('role')


  }
}

module.exports = TokenModel