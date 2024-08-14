const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');

const JWT_SECRET = 'Ubaid';

const authController = {
   
    async login(req, res) {
        // Your login logic here
        let success = false;
        const validationRules = [
            body('email').isEmail().withMessage('Not a valid email'),
            body('password').isLength({ min: 5 }).withMessage('Must contains 5 chars')
        ];
          // Applying validation middleware
          await Promise.all(validationRules.map(validation => validation.run(req)));

          // Checking for validation errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ success, errors: errors.array() });
          }

          const {email, password} = req.body;

          try {
            let user = await User.findOne({email});
            if(!user){
                res.status(400).json({success, Error: 'Please try to login with correct credentials'});
            }
            let password_compare = await bcrypt.compare(password, user.password);
            if(!password_compare){
                res.status(400).json({success, Error: 'Please try to login with correct credentials'});   
            }

            const data = {
                user:{
                    id:user.id
                }
            }
           const authToken = jwt.sign(data, JWT_SECRET);// {expiresIn:'5s'}

           success = true;
           res.cookie('token', authToken);
            res.json({success, authToken}); // Sending the saved user object as response

          } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });

          }
    },
    async forgetPassword(req, res) {
        // Your login logic here
        let success = false;
        const validationRules = [
            body('email').isEmail().withMessage('Not a valid email'),
        ];
          // Applying validation middleware
          await Promise.all(validationRules.map(validation => validation.run(req)));

          // Checking for validation errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ success, errors: errors.array() });
          }

          const {email} = req.body;

          try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(200).json({success, message: 'Wrong Email!'});
            }

            const data = {
                user:{
                    id:user.id
                }
            }
            var transporter = nodemailer.createTransport({
                host: 'smtp.cloudtach.com', // Outlook SMTP server
                port: 587, // port for secure SMTP
                secure: false, // true for 465, false for other ports
                auth: {
                  user: 'info@cloudtach.com',
                  pass: '123456@@$$@@Uba'
                }
              });
              var mailOptions = {
                from: 'info@cloudtach.com',
                to: email,
                subject: 'Reset Password',
                html: '<h1>Hi</h1><p>Please click on the link below to reset your password!<a href="#">Reset Link</a</p>'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        //    const authToken = jwt.sign(data, JWT_SECRET);
           success = true;
            return res.json({success,}); // Sending the saved user object as response

          } catch (error) {
           return res.status(500).json({ error: 'Internal Server Error', message: error.message });

          }
    },

    async register(req, res) {
        // Setting up validation rules as middleware
        const validationRules = [
            body('name').isLength({ min: 4 }).withMessage('Must contains 4 chars'),
            body('username').isLength({ min: 4}),
            body('email').isEmail().withMessage('Not a valid email'),
            body('user_role').isLength({ min: 4 }).withMessage('Required'),
            body('password').isLength({ min: 5 }).withMessage('Must contains 5 chars')
        ];
        let success = false;
        // Applying validation middleware
        await Promise.all(validationRules.map(validation => validation.run(req)));

        // Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({email: req.body.email}); // it return a promist that's why added a await
            if(user){
                return res.status(400).json({error:'Sorry a user with this email already exisit'});
            }
            // const salt = bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
             user = await User.create({
                name: req.body.name,
                username: req.body.username,
                user_role: req.body.user_role,
                email: req.body.email,
                password: hashedPassword
            });
            const data = {
                user:{
                    id:user.id
                }
            }
            success = true;
            // const user = new User(req.body);
            // await user.save();
           const authToken = jwt.sign(data, JWT_SECRET); //{expiresIn:'5s'}
        //    console.log(jwt_data);
            res.cookie('token', authToken);
            res.json({success, authToken}); // Sending the saved user object as response
            

        } catch (error) {
            res.status(500).json({ success, error: 'Internal Server Error', message: error.message });
        }
    },
    // ###### reoutes 3 loggedin user details by decoding a jwt token 
    async logout(req,res){
       let success = false;
        try {
            // localStorage.removeItem('token');
            success = true;
            res.cookie('token', '');
            res.json({success, message:'Logout!'});    
            
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });

        }

    },
    async getuser(req,res){
       
        try {
            user_id = req.user.id;
            const user = await User.findById(user_id).select('-password'); // it will minus the password field and get rest fields (data)
            res.json(user);    
            
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });

        }

    },
    async list_users(req,res){
        let success = false;
        try {
            const user = await User.find({}); 
            success = true;
            res.json({success, user});    
            
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });

        }

    },

    async delete_user(req, res){
        let success = false;

        try {
            let user_id = req.user.user_id;
            const user = await User.deleteOne(user_id);
            success = true;
            res.json({success, user});
            
        } catch (error) {
            res.status(500).json({success,error: 'Internal Server Error', message:error.message});
        }
    }
};

module.exports = authController;
