const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const MY_SECRET_KEY="MY_SECRET_KEY";

const router = express.Router();

router.post('/signup', async (req, res) => { 
  const { email, password } = req.body;
    console.log("signup", email);;
  try {
       const user = new User({ email, password,userType:'A' });
       await user.save();
       const token = jwt.sign({ userId: user._id }, MY_SECRET_KEY);
      res.send({ token: token, userId: user._id, email: user.email, userType: user.userType});
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, MY_SECRET_KEY);
      res.send({ token: token, userId: user._id, email: user.email, userType: user.userType });
  } catch (err) {
    return res.status(200).send({ error: 'Invalid password or email' });
  }
});

router.post('/AddNewClaims', async (req, res) => {  
  
  try {
    console.log("AddNewClaims api call", req.body);
    return ( req.files? res.status(200).send({ res: "successfully with file" }) :  
    res.status(200).send({ res: 'successfully with no file' }))
 
  } catch (err) {
    return res.status(422).send({ res: 'something went wrong' });
  }
  

  
 });




module.exports = router;
