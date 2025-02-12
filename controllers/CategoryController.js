const ProductCategory = require("../models/ProductCategory");

const getCategory = async (req, res) => {
  const categoryList = await ProductCategory.find({userId:String(req.body.userId)});
  res.json(categoryList);
};
const postCategory = (req, res) => {
  try {
   const category = new ProductCategory({
      categoryName: req.body.categoryName,
      categoryId: req.body.categoryId,
      categoryImage: req.body.categoryImage,
      userId: req.body.userId,
      categoryColor: req.body.categoryColor,
    });
    category.save((err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        categoryName: category.categoryName,
        categoryId: category.categoryId,
        categoryImage: category.categoryImage,
        userId: category.userId,
        categoryColor: category.categoryColor,
        id: category._id
      });
    });
  } catch (e) {
    myConsole.log(e);
  }
};
const postCategoryMany = async (req, res) => {
  try {
    const categories = req.body.categories;
    console.log(categories)
    if (!categories || categories.length === 0) {
        return res.status(400).json({ message: "No hay categorias para importar." });
    }
    await ProductCategory.insertMany(categories);

    res.status(201).json({ message: "Productos importados correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la importación." });
    }
};
module.exports = {
    getCategory,
    postCategory,
    postCategoryMany
};
