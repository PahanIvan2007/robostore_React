const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

  const requireAdmin = (req, res, next) => {
    if (!['ADMIN', 'MANAGER', 'SYSADMIN'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

  router.get('/', authenticate, requireAdmin, async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          createdAt: true,
          _count: {
            select: { orders: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(users);
    } catch (error) {
      console.error('Users list error:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.get('/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
      
      if (req.user.userId !== userId && !['ADMIN', 'MANAGER', 'SYSADMIN'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          createdAt: true,
          addresses: true,
          orders: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('User detail error:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { role, name, phone } = req.body;

      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          ...(role && { role }),
          ...(name !== undefined && { name }),
          ...(phone !== undefined && { phone }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
        },
      });

      res.json(user);
    } catch (error) {
      console.error('User update error:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });

  router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('User delete error:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  router.post('/', authenticate, requireAdmin, async (req, res) => {
    try {
      const { email, password, name, phone, role } = req.body;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role: role || 'USER',
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('User create error:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  return router;
};
