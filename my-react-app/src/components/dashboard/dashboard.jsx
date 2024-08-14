import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/noteContext';
import AxiosContext from '../../context/axioContext/axiosContext';
import Header from '../header/sidebar';
import styles from './dashboard.module.css'
import { useNavigate, useNavigation } from 'react-router-dom';
import { BsPlus } from "react-icons/bs";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Chip,
} from "@material-tailwind/react";
import ListTodos from '../todos/listTodos';


export default function Dashboard() {
  const navigate = useNavigate();
  const a = useContext(NoteContext);
  const [auth, setAuth] = useState(localStorage.getItem('token') || '');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState(['Important', 'Urgent', 'Normal']);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const axiosRequest = useContext(AxiosContext);


  useEffect(() => {
    // console.log(auth);
    if (auth === '') {
      navigate('/login');
    }

  })
  const handleAddTodos = async (e) => {
    e.preventDefault();
    if (taskName == '') {
      alert('Please add task name');
      return;
    }
    if (taskDescription == '') {
      alert('Please add task description');
      return;
    }
    try {
      const response = await axiosRequest({
        method: 'post',
        url: '/add-todo',
        data: { task_name: taskName, task_description: taskDescription, task_label: taskPriority }
      });

      handleResponseShow();
      if (response.success) {
        setSuccess(true);
        handleResponseShow();
    } else {
        setError(true);  // Handle the case where the response doesn't indicate success
    }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  const handleResponseShow = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }
  const handle_toggle_form = () => {
    setIsFormVisible(!isFormVisible);
  }




  return (
    <>
      <Header />
      <main className={styles.main_area}>
        <div className='container'>
          {/* The Portal Build By {a.name} Whoose age is {a.age} */}

          <div className="add-todo text-right">
            <button type="button" onClick={handle_toggle_form} className="mt-3 text-right text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">  <BsPlus /> Add todo</button>
          </div>
          {
            isFormVisible ?

              <div className='todo-form w-50 m-auto bg-dark-subtle px-10 pt-2 rounded-2'>
                {
                  success ?
                    <div
                      class="relative block w-full m-2 p-2 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
                        Task Created
                    </div>
                    :
                    error ? 
                    <div class="relative block w-full m-2 p-2 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      Something went wrong creating the task
                    </div> 
                    : ''
                }
                <Card color="transparent" shadow={false}>

                  <div className="row">
                    <div className="col-md-12 pt-3 pb-3">
                      <form className="mt-3" onSubmit={handleAddTodos}>
                        <div className="mb-1 flex flex-col gap-6">

                          <div class="relative h-11 w-full min-w-[200px]">
                            <input placeholder="Task Name"
                              class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              value={taskName}
                              onChange={(e) => setTaskName(e.target.value)} />
                            <label
                              class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Task Title
                            </label>
                          </div>

                          <div class="relative w-full min-w-[200px]">
                            <textarea placeholder="Description"
                              class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                              value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                            <label
                              class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                              Task Description
                            </label>
                          </div>


                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Task Priority
                          </Typography>

                          <div className="flex gap-2">
                            <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-green-500/20 py-1.5 px-3 font-sans text-xs font-bold uppercase text-green-900">
                              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">

                                <div className="inline-flex items-center">

                                  <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="important">
                                    <input type="checkbox"
                                      className="before:content[''] peer relative -ml-px h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-green-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:hidden before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-900 checked:bg-green-900 checked:before:bg-green-500 hover:before:opacity-10"
                                      id="important" value={taskPriority[0]} onChange={(e) => setTaskPriority(e.target.value)} />
                                    <span
                                      className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"></path>
                                      </svg>
                                    </span>
                                  </label>
                                </div>

                              </div>

                              <span className="ml-[18px]">Important</span>
                            </div>
                            <div
                              className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-red-500/20 py-1.5 px-3 font-sans text-xs font-bold uppercase text-red-900">
                              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                                <div className="inline-flex items-center">
                                  <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="urgent">
                                    <input type="checkbox"
                                      className="before:content[''] peer relative -ml-px h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-red-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:hidden before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-900 checked:bg-red-900 checked:before:bg-red-500 hover:before:opacity-10"
                                      id="urgent" value={taskPriority[1]} onChange={(e) => setTaskPriority(e.target.value)} />
                                    <span
                                      className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"></path>
                                      </svg>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <span className="ml-[18px]">Urgent</span>
                            </div>

                            <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-orange-200 py-1.5 px-3 font-sans text-xs font-bold uppercase text-info-900">

                              <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
                                <div className="inline-flex items-center">

                                  <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="normal">
                                    <input type="checkbox"
                                      className="before:content[''] peer relative -ml-px h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-orange-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:hidden before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-900 checked:bg-red-900 checked:before:bg-red-500 hover:before:opacity-10"
                                      id="normal" value={taskPriority[2]} onChange={(e) => setTaskPriority(e.target.value)} />
                                    <span
                                      className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"></path>
                                      </svg>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <span className="ml-[18px]">Normal</span>
                            </div>
                          </div>
                        </div>


                        <Button type='submit' className="mt-6 px-4 pt-2 pb-2" fullWidth>
                          Add
                        </Button>

                      </form>
                    </div>
                  </div>
                </Card>
              </div>
              :
              ''
          }
          {/* List todos */}

          <ListTodos/>

        </div>
      </main>

    </>
  )
}
