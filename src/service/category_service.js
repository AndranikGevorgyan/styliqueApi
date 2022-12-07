const { CategoryModel } = require("../model");


class CategoryService {
    static create(payload) {
        return CategoryModel.create(payload)
    }
    static get() {
        return CategoryModel.getAll()
    }
    static delete(id){
        return CategoryModel.delete(id)
    }
}

module.exports = CategoryService