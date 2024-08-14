const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const fetchuser = require('../middleware/fetchuser');
const todoController = require('../controller/todoController');


// define routers that will use in app

// router.get('/test', (req, res) =>{
//     res.send('Test working page!');
// })

// invoice route

// login reoute
 
router.post('/register',authController.register );
router.post('/login',authController.login);
router.post('/forget-password',authController.forgetPassword);
router.post('/getuser' , fetchuser ,authController.getuser);
router.post('/delete-user' , fetchuser ,authController.delete_user);
// router.post('/check-user-auth' ,authController.check_AUTH);
router.post('/logout' ,authController.logout);
router.post('/users' , fetchuser ,authController.list_users);

// ##### TOdos routes ###
router.post('/add-todo' ,todoController.add_todo);
router.post('/get-todo/:id' ,todoController.get_todo_by_ID);
router.post('/update-todo/:id' ,todoController.update_todo);
router.get('/delete-todo/:id' ,todoController.delete_todo);
router.post('/get-todos' ,todoController.get_all_todos);



module.exports = router;