const { Model } = require('objection')

const { RoleModel } = require('./role_model')

class UserModel extends Model {
    static get idColumn() { return 'id' }
    static get tableName() { return 'user' }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                role_id: { type: 'integer' }
            }
        }
    };
    static get relationMappings() {
        return {
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: RoleModel,
                join: {
                    from: 'user.role_id',
                    to: 'role.id'
                }
            }
        }
    }
    static create(payload) {
        return UserModel.query().insert(payload);
    }
    static async getById(id) {
        return UserModel.query().findById(id)
            .withGraphFetched('role')
    }
    static getByUsername(email) {
        return UserModel.query().findOne({ email })
    }
}

module.exports = UserModel