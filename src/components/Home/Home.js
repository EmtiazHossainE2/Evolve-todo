import React, { useEffect, useState } from 'react'
import './home.css'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from "uuid";
import Todo from '../Todo/Todo';

const Home = () => {

  const [todos, setTodos] = useState([])
  const [taskName, setTaskName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskID] = useState("")

  const getData = () => {
    const getTodo = localStorage.getItem('todos');
    if (getTodo) {
      setTodos(JSON.parse(getTodo))
    }
  }
  useEffect(() => {
    getData()
  },[])

  //************************************* Create task *************************************
  const handleCreateTask = async (e) => {
    e.preventDefault()
    const name = taskName
    const completed = false

    let allTodo = [];
    const prev = localStorage.getItem('todos');
    if (prev) {
      allTodo = JSON.parse(prev);
    }

    allTodo = [...allTodo, { id: uuidv4(), name, completed }];

    localStorage.setItem('todos', JSON.stringify(allTodo));
    toast.success(`Task Created `)
    setTaskName("")
    setIsEditing(false)

    getData()

  }


  //************************************* delete task *************************************
  const handleDelete = (id) => {
    // console.log(id, 'id delete')

  }



  // Update task / edit task 
  const handleUpdate = async (e) => {
    console.log('handleUpdate');
    e.preventDefault()

  }
  console.log(todos)

  return (
    <div className='task__container flex justify-center items-center h-screen'>
      <div className='task__content'>
        <h2 className='text-2xl font-bold  pb-3'>Task Manager</h2>
        <div>
          <form onSubmit={isEditing ? handleUpdate : handleCreateTask} className='task__content-input flex justify-center items-center pb-[10px]'>
            <input
              type="text"
              name="taskName"
              className={`w-[90%] p-[5px] ${taskName === "" ? "nameError" : ""}`}
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
            <button type='submit' className={`bg-green-500 border-none py-2 px-[20px] text-white font-600 cursor-pointer ${taskName === "" ? "disableBtn " : "btn"}`}>{isEditing ? "Edit" : "Add"}</button>
          </form>
        </div>
        <div className='task__content-allTask'>
          {todos?.length > 0 ? (
            <>
              {todos?.map((todo, index) => (
                <Todo key={todo.id} todo={todo} index={index} />
              ))}
            </>
          ) : (
            <p>No task found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home