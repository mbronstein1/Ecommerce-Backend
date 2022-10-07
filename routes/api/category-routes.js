const router = require('express').Router();
const { restart } = require('nodemon');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const getCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(getCategories)
  } catch (err) {
    res.status(400).json(err)
  }
});


// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getOneCategory = await Category.findByPk(id, {
      include: [{ model: Product }]
    });

    if (!getOneCategory) {
      res.status(404).json({ message: `No category found with id${id}` });
      return;
    }
    res.status(200).json(getOneCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

// Update category table by id value
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: id
        }
      }
    );

    if (!updateCategory) {
      res.status(404).json({ message: `No category found with id${id}` });
      return;
    };
    res.status(200).json({ message: `Category with id${id} successfully updated!` })
  } catch (err) {
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedCategory = await Category.destroy({
      where: {
        id: id
      }
    })

    if (!deletedCategory) {
      res.status(404).json({ message: `No category found with id${id}` })
    }
    res.status(200).json({ message: `Category with id${id} successfully deleted!` })
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
