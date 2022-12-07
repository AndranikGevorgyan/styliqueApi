const { ArticleModel } = require("../model");



class ArticleService {
    static create(payload) {
        payload.updated_at  = new Date()
        console.log(payload);
        return ArticleModel.create(payload)
    }
    static get() {
        return ArticleModel.getAll()
    }
}

module.exports = ArticleService