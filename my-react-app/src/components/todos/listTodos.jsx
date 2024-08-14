import React, { useContext, useEffect, useState } from "react";
import AxiosContext from "../../context/axioContext/axiosContext";
import { BsFillTrashFill, BsThreeDotsVertical } from "react-icons/bs";
import { collapse } from "@material-tailwind/react";

export default function ListTodos() {

    const axiosRequest = useContext(AxiosContext)
    const [todos, setTodos] = useState([])

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

    }, [])


    return (

        <div>
            <div
                className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h5
                            className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
                        >
                            Todos
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
                                    <div className="flex items-center justify-between pb-3 pt-3 last:pb-0" key={index}>
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
                                                alt="Tania Andrew"
                                                className="relative inline-block h-9 w-9 rounded-full object-cover object-center"
                                            />
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
                                            className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
                                        >
                                            <button
                                                data-ripple-light="true"
                                                data-collapse-target={'collapse'+index}
                                                className="select-none  text-center align-middle font-sans text-xs font-bold uppercase text-dark shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>
                                            <div
                                                data-collapse="collapse"
                                                className="block h-0 w-full basis-full overflow-hidden transition-all duration-300 ease-in-out"
                                            >
                                               <a href=""><BsFillTrashFill/></a>
                                            </div>

                                        </h6>
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
