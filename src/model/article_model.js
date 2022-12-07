const { Model } = require('objection')
const { UserModel, CategoryModel } = require('.')

class ArticleModel extends Model {
    static get idColumn() { return 'id' }
    static get tableName() { return 'article' }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                content: { type: 'string', minLength: 1, maxLength: 255 },
                image: {type: 'text'},
                user_id: { type: 'integer' },
                category_id: { type: 'integer' }
            }
        }
    }
    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'article.user_id',
                    to: 'user.id'
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: CategoryModel,
                join:{
                    from: 'article.category_id',
                    to: 'user.id'
                }
            }
        }
    }

    
      static getAll() {
        return CategoryModel.query()
        .withGraphFetched('user')
        .withGraphFetched('category')

      }
    
      static delete(id) {
        return CategoryModel.query().deleteById(id);
      }
    
      static create(payload) {
        return CategoryModel.query().insert(payload);
      }
};

module.exports = ArticleModel