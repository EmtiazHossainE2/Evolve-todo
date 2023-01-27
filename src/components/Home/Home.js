import React, { useEffect, useState } from 'react'
import './home.css'
import { BiEdit } from "react-icons/bi"
import { MdDelete, MdOutlineDoneAll } from "react-icons/md"
import { BsFillHandThumbsUpFill } from "react-icons/bs"
import { toast } from 'react-hot-toast'

const Home = () => {
  


  return (
    <div className='task__container flex justify-center items-center h-screen'>
      <div className='task__content'>
        <h2 className='text-2xl font-bold  pb-3'>Task Manager</h2>
        <div>
          <form className='task__content-input flex justify-center items-center pb-[10px]'>
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
          {allTask?.length > 0 ? (
            <>
              {allTask?.map((task, index) => (
                <div key={index} className="task__content-allTask__task">
                  <div className='text-xl font-[500]'>
                    {task?.completed === true ? (
                      <del>{index + 1} . {task?.name}</del>
                    ) : (
                      <>{index + 1} . {task?.name}</>
                    )}
                  </div>
                  <div className="task__content-allTask__btn">
                    <button
                    // onClick={(e) => handleComplete(task)}
                    >
                      {task?.completed === false ? (
                        <BsFillHandThumbsUpFill style={{ color: "red" }} />
                      ) : (
                        <MdOutlineDoneAll style={{ color: "green" }} />
                      )}
                    </button>
                    <button
                      // onClick={() => getSingleTask(task)}
                    ><BiEdit /></button>
                    <button
                      // onClick={() => handleDelete(task?._id)}
                    ><MdDelete /></button>
                  </div>
                </div>
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