import React from 'react'
import { BiEdit } from "react-icons/bi"
import { MdDelete, MdOutlineDoneAll } from "react-icons/md"
import { BsFillHandThumbsUpFill } from "react-icons/bs"

const Todo = ({ index, todo, handleDelete, getSingleTodo, handleComplete }) => {
  return (
    <div key={index} className="task__content-allTask__task">
      <div className='text-lg font-[500]'>
        {todo?.completed === true ? (
          <del>{index + 1} . {todo?.name}</del>
        ) : (
          <>{index + 1} . {todo?.name}</>
        )}
      </div>
      <div className="task__content-allTask__btn">
        <button
          onClick={(e) => handleComplete(todo)}
        >
          {todo?.completed === false ? (
            <BsFillHandThumbsUpFill style={{ color: "red" }} size={25} />
          ) : (
            <MdOutlineDoneAll style={{ color: "green" }} size={25} />
          )}
        </button>
        <button
          onClick={() => getSingleTodo(todo)}
        ><BiEdit size={25} /></button>
        <button
          onClick={() => handleDelete(todo?.id)}
        ><MdDelete size={25} /></button>
      </div>
    </div>
  )
}

export default Todo