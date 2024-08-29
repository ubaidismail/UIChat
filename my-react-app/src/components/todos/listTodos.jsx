import React, { useContext, useEffect, useState } from "react";
import AxiosContext from "../../context/axioContext/axiosContext";
import { BsFillTrashFill, BsThreeDotsVertical, BsFillPencilFill,BsCardChecklist } from "react-icons/bs";
import { collapse } from "@material-tailwind/react";
import styles from './listTodos.module.css'


export default function ListTodos({setEditTodo}) {

    const axiosRequest = useContext(AxiosContext)
    const [todos, setTodos] = useState([])
    const [todoOption, setTodoOption] = useState({})
    

    const fetchTodos = async () => {
        try {
            const response = await axiosRequest({
                method: 'post',
                url: '/get-todos'
            });
            if (response.success) {
                setTodos(response.todos);
                // console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTodos();

    }, [fetchTodos])

    const handle_options_todos = (id) => {
        // setTodoOption(!todoOption);
        // alert(id);
        setTodoOption(
            preState => ({
                ...preState,   // ... it is called (spread syntax) this used to copy and expend iterable object or array
                [id]: !preState[id]
            }))

    }

    const handleTodoEdit = async (id) => {
        try {
            let response = await axiosRequest({
                method: 'post',
                url: '/get-todo/' + id,
            })
            if(response.success){
                setEditTodo(response.todo);
                console.log(response.todo)
            }else{
                alert('error');
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleTodoDelete = async (id) => {
        try {
            let response = await axiosRequest({
                method: 'get',
                url: '/delete-todo/' + id,
            })
            if(response.success){
                fetchTodos();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div>

            <div
                className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h5
                            className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
                        >
                            Todos <small>({todos.length})</small>
                        </h5>
                        <a
                            href="#"
                            className="block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
                        >
                            View all
                        </a>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {
                            todos && todos.length > 0 ? (
                                todos.map((todo, index) =>
                                    <div className="flex items-center justify-between pb-3 pt-3 last:pb-0 position-relative" key={index}>
                                        <div className="flex items-center gap-x-3">
                                            <BsCardChecklist />
                                            <div>
                                                <h6
                                                    className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
                                                >
                                                    {todo.task_name}
                                                </h6>
                                                <p
                                                    className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
                                                >
                                                    {todo.task_label}
                                                </p>
                                                <p>
                                                    {todo.task_description}
                                                </p>
                                            </div>
                                        </div>
                                        <h6
                                            className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                                            <span onClick={() => handle_options_todos(index)}><BsThreeDotsVertical /></span>
                                        </h6>
                                        {
                                            todoOption[index] && (
                                                <div className={styles.edit_and_delete}>
                                                    <span className="d-block" onClick={() => handleTodoEdit(todo._id)}>Edit</span>
                                                    <span className="d-block" onClick={() => handleTodoDelete(todo._id)}>Delete</span>

                                                </div>

                                            )}


                                    </div>
                                )

                            ) : ('No Todo Found'
                            )}



                    </div>
                </div>
            </div>

        </div>

    )
}
