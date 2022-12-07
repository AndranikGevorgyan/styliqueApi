const { Model } = require('objection')

class RoleModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'role'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static getOneOrFail(id) {
    return RoleModel.query().findById(id).throwIfNotFound();
  }

  static getRoleByName(name) {
    return RoleModel.query().findOne({ name });
  }

  static getAll() {
    return RoleModel.query();
  }

  static deleteRole(id) {
    return RoleModel.query().deleteById(id);
  }

  static addRole(payload) {
    return RoleModel.query().insert(payload);
  }

}
module.exports = RoleModel