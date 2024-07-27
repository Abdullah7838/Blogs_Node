const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Person = require('./../models/Person');
const { generateToken, jwtAuthMiddleware } = require('./../jwt');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    const existingPerson = await Person.findOne({ email: email });
    if (existingPerson) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const newPerson = new Person(data);
    const response = await newPerson.save();
    
    const payload = {
      id: response.id,
      email: response.email
    };
    const token = generateToken(payload);
    
    console.log('Signup Done');
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log('Error in SignUp Person:', err.message); 
    res.status(500).json({ error: 'Internal Error in signup' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await Person.findOne({ email: email });
    if (!person) {
      console.log('User not found');
      return res.status(404).json({ message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, person.password);
    if (!isMatch) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid password' });
    }

    const payload = {
      id: person.id,
      email: person.email
    };
    const token = generateToken(payload);

    console.log('Login Successful');
    res.status(200).json({ message: 'Login Successful', token: token });
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


// Delete user profile (requires authentication)
router.delete('/delete',  async (req, res) => {
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

router.post('/cpass',async(req,res)=>{
  try{
  const {email,password,newpassword} = req.body;
  const Email =await Person.findOne({email:email})
  if(!Email){
    return res.status(404).json({ message: 'Email not found' });
  }
  
    const isMatch = await bcrypt.compare(password,Email.password)
    if(!isMatch){
    return res.status(404).json({ message: 'Password not match' });
  }
  const newpass = newpassword;
  const hashpass = await bcrypt.hash(newpass,10);
  Email.password = hashpass
  await Email.save();
  return res.status(200).json({ message: 'Password changed successfully' });
  }catch(err){
    console.error('Error in Changing Password:', err.message); 
    return res.status(500).json({ error: 'Internal error in Changing password' });
  }
});

module.exports = router;
