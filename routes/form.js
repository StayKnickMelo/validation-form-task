const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Form = require('../model/Form');


router.post('/userform',[
  check('name', 'Please a name').not().isEmpty(),
  check('email', 'Please use a valid email').isEmail(),
  check('msg', 'Please leave a message').not().isEmpty()
], async(req,res)=>{

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  try {
    // const userForm = req.body

    const userForm = await Form.create(req.body);

    res.status(201).json({
      success: true,
      data: userForm
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{msg: 'Server Error'}]
    });
  };

});



module.exports = router;