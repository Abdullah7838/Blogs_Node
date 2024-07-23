const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Signup Done');
    res.status(200).json(response);
  } catch (err) {
    console.log('Error in SignUp Person:', err.message); 
    res.status(500).json({ error: 'Internal Error in signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await Person.findOne({ email: email });
    if (!person) {
      console.log('User not found');
      return res.status(404).json({ message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, person.password);
    if (isMatch) {
      console.log('Login Successful');
      return res.status(200).json({ message: 'Login Successful' });
    } else {
      console.log('Password mismatch');
      return res.status(401).json({ error: 'Password mismatch' });
    }
  } catch (err) {
    console.error('Error in Login Person:', err.message); 
    return res.status(500).json({ error: 'Internal Error in person login' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const data = await Person.findOne({ email: email });
    if (!data) {
      console.log("Person email profile not found");
      return res.status(404).json({ message: 'Email profile not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error in Profile Person:', err.message); 
    return res.status(500).json({ error: 'Internal error in person profile' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { email } = req.body; 
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const result = await Person.deleteOne({ email: email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }
    console.log('User deleted');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error in Deleting Person:', err.message); 
    return res.status(500).json({ error: 'Internal error in deleting profile' });
  }
});


module.exports = router;
