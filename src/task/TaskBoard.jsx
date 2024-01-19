import { Fragment, useState } from "react";
import SearchTask from "./SearchTask"
import TaskActions from "./TaskActions"
import TaskList from "./TaskList"
import AddTaskModal from "./AddTaskModal";


function TaskBoard() {
    const defaultTask = {
        id: crypto.randomUUID(),
        title: "Learn React Native",
        description:
            "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
        tags: ["web", "react", "js"],
        priority: "High",
        isFavorite: false,
    };
    const[tasks,setTasks]=useState([defaultTask])
    const[showAddModal,setShowAddModal]=useState(false)
    const[taskToUpdate,setTaskToUpdate]=useState(null)
    

    function handleAddTask(newTask,isAdd){
      if(isAdd){
        setTasks([...tasks,newTask])
      }
      else{
        setTasks(tasks.map((task)=>{
               if(task.id===newTask.id){
                return newTask;
               }
               else{
                return task;
               }
        }))
      }
      
      setShowAddModal(false)
    }

   function handleAddEditTask(task){
    setTaskToUpdate(task)
    setShowAddModal(true)
   }

   function handleCloseClick(){
    setShowAddModal(false)
    setTaskToUpdate(null)
   }
    return <Fragment>
         <section className="mb-20" id="tasks">
		      {showAddModal && <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>}
        <div className="container">
            
        <div className="p-2 flex justify-end">
            <SearchTask/>
        </div>
              <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                <TaskActions onAddClick={()=>setShowAddModal(true)}/>
                <TaskList tasks={tasks} onEdit={handleAddEditTask}/>
            </div>
        </div>
      </section>
    </Fragment>
  
 
  
     
  }
    
  


export default TaskBoard