import { useEffect, useState } from 'react'
import './App.css'
import { Add, Delete, Update, MarkasComplete } from './Redux/action'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  let dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const [toDo, addTodo] = useState("");
  const [key, setKey] = useState(null);
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState("ALL"); 
  const [filteredTasks, setFilteredTasks] = useState(state); 

  useEffect(() => {
    
    setFilteredTasks(
      state.filter((task) => {
        if (filter === "Completed") return task.isCompleted;
        if (filter === "Pending") return !task.isCompleted;
        return true;
      })
    );
  }, [state, filter]);

  const handleSubmit = () => {
    if (edit) {
      dispatch(Update(key, toDo));
      setEdit(false);
    } else {
      dispatch(Add(toDo));
    }
    addTodo("");
  };

  const handleDelete = (id) => {
    dispatch(Delete(id));
  };

  const handleEdit = (id, task) => {
    setKey(id);
    addTodo(task);
    setEdit(true);
  };

  const HandleDropChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        <div className="mb-4">
          <select
            onChange={(e) => HandleDropChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            onChange={(e) => addTodo(e.target.value)}
            value={toDo}
            type="text"
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {edit ? "Edit" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {filteredTasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm"
            >
              <span className={`${task.isCompleted ? "line-through text-gray-500" : ""}`}>
                {task.task}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task.id, task.task)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ❌
                </button>
                <button
                  onClick={() => dispatch(MarkasComplete(task.id))}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center gap-2"
                >
                  Mark as Completed
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
