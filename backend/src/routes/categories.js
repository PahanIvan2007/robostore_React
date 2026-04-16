const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        where: { parentId: null },
        include: {
          children: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      });
      res.json(categories);
    } catch (error) {
      console.error('Categories list error:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  router.get('/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await prisma.category.findUnique({
        where: { slug },
        include: {
          children: {
            orderBy: { order: 'asc' },
          },
          parent: true,
        },
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      console.error('Category detail error:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const category = await prisma.category.create({
        data: req.body,
      });
      res.status(201).json(category);
    } catch (error) {
      console.error('Category create error:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(category);
    } catch (error) {
      console.error('Category update error:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Category delete error:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  });

  return router;
};
