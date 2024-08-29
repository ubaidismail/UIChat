const { body, validationResult } = require('express-validator');
const todos_modal = require('../models/todo');

const todoController = {

    async add_todo(req,res){
        const validationRules = [
            body('task_name').trim().isLength({min:1}).withMessage('Task name is required'),
            body('task_description').trim().isLength({min:1}).withMessage('Task description is required'),
            body('task_label').trim().isLength({min:1}).optional(),
        ]
        await Promise.all(validationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);

          if (!errors.isEmpty()) {
              return res.status(400).json({ status:false, errors: 'Somethign wernt wrong or error getting your data'});
          }
        const {task_name, task_description, task_label} = req.body;

          try {
                let insert_data = {task_name:task_name, task_description: task_description, task_label:task_label };
                const insert_query = await todos_modal.create(insert_data);
                res.status(200).json({success:true,insert_query});

          } catch (error) {
            res.status(500).json({ uccess:false, error: 'Internal Server Error', message: error.message });

          }

    },

    
    async get_todo_by_ID(req,res){
      const todo_id = req.params.id;

      try {
        const todo = await todos_modal.findOne({_id:todo_id});
        if(!todo){
          return res.status(404).json({ success: false, message: 'Todo not found' });  
        }

        res.status(200).send({success:true,todo:todo});
        
        
        // console.log(todo);
      } catch (error) {
        res.status(500).json({ uccess:false, error: 'Internal Server Error', message: error.message });
      }
    },


    async update_todo(req,res){
        const validationRules = [
            // body('_id').trim().isLength({min:11}).withMessage('Task ID is required'),
            body('task_name').trim().isLength({min:1}).withMessage('Task name is required'),
            body('task_description').trim().isLength({min:1}).withMessage('Task description is required'),
            body('task_label').trim().isLength({min:1}).optional(),
        ]
        await Promise.all(validationRules.map(validation => validation.run(req)));

        const errors = validationResult(req);

          if (!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array() });
          }
        const {_id, task_name, task_description, task_label} = req.body;
        const todo_id = req.params.id;

          try {
           
                let update_data = {task_name:task_name, task_description: task_description, task_label:task_label };
                const update_query = await todos_modal.findByIdAndUpdate(todo_id, update_data, {new:true});
                res.status(200).json({success:true,update_query});

          } catch (error) {
            res.status(500).json({ success:false,  error: 'Internal Server Error', message: error.message });

          }

    },

    async delete_todo(req,res){
      const todo_id = req.params.id;

      try {
        const todo = await todos_modal.deleteOne({_id:todo_id});
        res.status(200).send({success:true,todo});
        // console.log(todo);
      } catch (error) {
        res.status(500).json({ uccess:false, error: 'Internal Server Error', message: error.message });
      }
    },

    async get_all_todos(req,res){
      // let success = false;
      try {

        const todos = await todos_modal.find();
        res.status(200).json({success:true, todos:todos});

      } catch (error) {
        res.status(500).json({success:false, error:'Ineternal Server Error', message:error.message});
      }
    }
}
module.exports = todoController;