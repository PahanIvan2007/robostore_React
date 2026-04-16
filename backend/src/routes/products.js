const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const {
        category,
        brand,
        minPrice,
        maxPrice,
        inStock,
        search,
        sort = 'popular',
        page = 1,
        limit = 12,
      } = req.query;

      const where = {};

      if (category) {
        where.category = { slug: category };
      }

      if (brand) {
        where.brand = brand;
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      if (inStock === 'true') {
        where.inStock = true;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      const orderBy = {};
      switch (sort) {
        case 'price-low':
          orderBy.price = 'asc';
          break;
        case 'price-high':
          orderBy.price = 'desc';
          break;
        case 'rating':
          orderBy.rating = 'desc';
          break;
        default:
          orderBy.reviewsCount = 'desc';
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take: parseInt(limit),
          include: {
            category: {
              select: { name: true, slug: true },
            },
          },
        }),
        prisma.product.count({ where }),
      ]);

      res.json({
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      console.error('Products list error:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  router.get('/:slug', async (req, res) => {
    try {
      const { slug } = req.params;

      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          reviews: {
            include: {
              user: {
                select: { name: true },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          accessories: {
            include: {
              accessory: true,
            },
          },
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Product detail error:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const product = await prisma.product.create({
        data: req.body,
      });
      res.status(201).json(product);
    } catch (error) {
      console.error('Product create error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(product);
    } catch (error) {
      console.error('Product update error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.product.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Product delete error:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  return router;
};
