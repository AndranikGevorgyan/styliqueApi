const {Model} = require('objection')

class CategoryModel extends Model{
    static get idColumn() { return 'id'; }

    static get tableName() { return 'category'; }
  
    static get jsonSchema() {
      return {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', minLength: 1, maxLength: 255 },
          description:{type: 'string', minLength: 1, maxLength: 255}
        }
      };
    }
  
    static getOneOrFail(id) {
      return CategoryModel.query().findById(id).throwIfNotFound();
    }
  
    static getByName(name) {
      return CategoryModel.query().findOne({ name });
    }
  
    static getAll() {
      return CategoryModel.query();
    }
  
    static delete(id) {
      return CategoryModel.query().deleteById(id);
    }
  
    static create(payload) {
      return CategoryModel.query().insert(payload);
    }
}
module.exports = CategoryModel