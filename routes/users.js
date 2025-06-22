

import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Отримати список користувачів
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Отримати одного користувача
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Оновити користувача — тільки себе
router.put('/:id', authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: 'You can only update your own profile' });
  }

  const { name, email, role } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update error' });
  }
});

// Видалити користувача — тільки себе
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: 'You can only delete your own account' });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error' });
  }
});

export default router;


// import express from 'express';
// import { authMiddleware } from '../middleware/authMiddleware.js';
// import User from '../models/User.js';

// const router = express.Router();

// // Get all users (тільки бізнес)
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find({}, '-password'); 
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get one user by ID
// router.get('/:id', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id, '-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update user
// router.put('/:id', authMiddleware, async (req, res) => {
//   const { name, email, role } = req.body;
//   try {
//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: 'Update error' });
//   }
// });

// // Delete user
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Delete error' });
//   }
// });

// export default router;