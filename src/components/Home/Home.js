import React, { useEffect, useState } from 'react'
import './home.css'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from "uuid";
import Todo from '../Todo/Todo';
import { getStoredTodo, storeToDb } from '../../utilities/localStore';

const Home = () => {

  const [todos, setTodos] = useState([])
  const [taskName, setTaskName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [task, setTask] = useState("")

  const getData = () => {
    setTodos(getStoredTodo())
  }
  useEffect(() => {
    getData()
  }, [])

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
    storeToDb(allTodo)
    toast.success(`Task Created `)
    setTaskName("")
    setIsEditing(false)
    getData()

  }


  //************************************* delete task *************************************
  const handleDelete = (id) => {
    const todo = getStoredTodo()
    const updatedTodo = todo.filter(item => item.id !== id);
    storeToDb(updatedTodo)
    toast.success(`Task Deleted `)
    setTaskName("")
    getData()
  }

  // common function 
  const commonF = (todo, name, value, msg) => {
    const todos = getStoredTodo();
    const updatedTodo = todos?.map((item) => {
      if (item.id === todo.id) {
        item.name = name
        item.completed = value
        return item;
      } else {
        return item;
      }
    })
    storeToDb(updatedTodo)
    toast.success(`Task in ${msg} `)
    setTaskName("")
    getData()
  }

  // handleComplete task 
  const handleComplete = (todo) => {
    if (todo.completed === true) {
      commonF(todo, todo.name, false, 'queue')
    }
    else if (todo.completed === false) {
      commonF(todo, todo.name, true, 'completed')
    }
  }

  const getSingleTodo = (todo) => {
    setIsEditing(true)
    setTaskName(todo?.name)
    setTask(todo);
  }

  // Update task / edit task 
  const handleUpdate = async (e) => {
    e.preventDefault()
    commonF(task, taskName, false, 'edited')
    setIsEditing(false)
  }
  // console.log(todos)
  const queue = todos.filter((todo) => todo.completed === true)
  // console.log(queue.length)

  return (
    <div className='task__container flex justify-center items-center h-screen'>
      <div className='task__content'>
        <h2 className='text-2xl font-bold  pb-3'>Task Manager</h2>
        <div className="flex justify-between pb-5">
          <p>Total Task : {todos.length}</p>
          <p>Completed : {queue.length}</p>
        </div>
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
                <Todo
                  key={todo.id}
                  todo={todo}
                  index={index}
                  handleDelete={handleDelete}
                  handleComplete={handleComplete}
                  getSingleTodo={getSingleTodo}
                />
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