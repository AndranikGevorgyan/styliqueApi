const { ArticleService } = require("../service")
const { ErrorUtil, SuccessHandlerUtil } = require('../util')
const { ResourceNotFoundError } = ErrorUtil

class ArticleController {
    static async create(request, response, next) {
        try {
            const { image } = request.files
            const payload = { ...request.body }
            if (image) {
                image.mv(__dirname + '/upload/' + image.name)
                payload.image = image
            }
            const article = await ArticleService.create(payload)
            if (!article) throw new ResourceNotFoundError('1')

            SuccessHandlerUtil.handleAdd(response, next, article)
        } catch (error) {
            next(error)
        }
    }
    static async get(request, response, next) {
        try {
            const articles = await ArticleService.get()
            if (!articles) throw new ResourceNotFoundError('2')
            SuccessHandlerUtil.handleList(response, next, articles)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController