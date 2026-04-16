const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (prisma) => {
  const router = express.Router();

  const JWT_SECRET = process.env.JWT_SECRET || 'secret';

  const authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  router.get('/', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          items: {
            include: {
              product: {
                select: { name: true, images: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(orders);
    } catch (error) {
      console.error('Orders list error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  router.get('/my', authenticate, async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        where: { userId: req.user.userId },
        include: {
          items: {
            include: {
              product: {
                select: { name: true, images: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(orders);
    } catch (error) {
      console.error('My orders error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true },
          },
          items: {
            include: {
              product: {
                select: { name: true, images: true, slug: true },
              },
            },
          },
        },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error('Order detail error:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const {
        items,
        total,
        deliveryCost,
        name,
        email,
        phone,
        address,
        city,
        zipCode,
        deliveryMethod,
        paymentMethod,
        comment,
      } = req.body;

      const token = req.headers.authorization?.replace('Bearer ', '');
      let userId = null;
      
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          userId = decoded.userId;
        } catch (e) {}
      }

      const order = await prisma.order.create({
        data: {
          userId,
          total,
          deliveryCost,
          name,
          email,
          phone,
          address,
          city,
          zipCode,
          deliveryMethod,
          paymentMethod,
          comment,
          items: {
            create: items.map((item) => ({
              productId: item.id,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      res.status(201).json(order);
    } catch (error) {
      console.error('Order create error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  router.patch('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status, trackNumber } = req.body;

      const order = await prisma.order.update({
        where: { id: parseInt(id) },
        data: {
          status,
          ...(trackNumber && { trackNumber }),
        },
      });

      res.json(order);
    } catch (error) {
      console.error('Order status update error:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  });

  return router;
};
