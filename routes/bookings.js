
import express from 'express';
import Booking from '../models/Booking.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Створити нове бронювання
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can create bookings' });
    }

  try {
    const { business, date, note } = req.body;
    const newBooking = new Booking({
      client: req.user.id,
      business,
      date,
      note,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Отримати всі свої записи
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user.id })
      .populate('business', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Оновити бронювання
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.client.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    booking.date = req.body.date || booking.date;
    booking.note = req.body.note || booking.note;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Скасувати бронювання
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.client.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await Booking.deleteOne({ _id: booking._id });
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;