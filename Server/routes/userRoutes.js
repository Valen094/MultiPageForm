const express = require('express');
const User = require('../models/Users'); // Asegúrate de que el modelo esté en la ruta correcta
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { name, age, email, address } = req.body;

    if (!name || !age || !email || !address) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const newUser = new User({ name, age, email, address });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).json({ message: 'Error al guardar el usuario', error: error.message });
  }
});

module.exports = router;
