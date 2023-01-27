import React from 'react'
import { BiEdit } from "react-icons/bi"
import { MdDelete, MdOutlineDoneAll } from "react-icons/md"
import { BsFillHandThumbsUpFill } from "react-icons/bs"

const Todo = ({index,todo}) => {
  return (
    <div key={index} className="task__content-allTask__task">
      <div className='text-xl font-[500]'>
        {todo?.completed === true ? (
          <del>{index + 1} . {todo?.name}</del>
        ) : (
          <>{index + 1} . {todo?.name}</>
        )}
      </div>
      <div className="task__content-allTask__btn">
        <button
        // onClick={(e) => handleComplete(task)}
        >
          {todo?.completed === false ? (
            <BsFillHandThumbsUpFill style={{ color: "red" }} size={25} />
          ) : (
            <MdOutlineDoneAll style={{ color: "green" }} size={25} />
          )}
        </button>
        <button
        // onClick={() => getSingleTask(task)}
        ><BiEdit  size={25}/></button>
        <button
        // onClick={() => handleDelete(task?._id)}
        ><MdDelete  size={25}/></button>
      </div>
    </div>
  )
}

export default Todo