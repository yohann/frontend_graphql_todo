import { useState, useEffect } from "react";
import Form from "./components/Form";
import Task from "./components/Task";
import { fetchTasks } from "./components/services/fetchTasks";
import { addTask } from "./components/services/addTask";
import { removeTask } from "./components/services/removeTask";
import { toggleTask } from "./components/services/toggleTask";
import { updateTask } from "./components/services/updateTask";

const FILTER_MAP = {
  all: "All",
  in_progress: "Active",
  completed: "Completed",
};

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("in_progress");
  const [currentlyEditing, setCurrentlyEditing] = useState("");

  const fetchData = async (selectedFilter = null) => {
    try {
      const response = await fetchTasks(selectedFilter || filter);

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      console.log(result.data.tasks);
      setTasks(result.data.tasks);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerAddTask = async (name, description) => {
    await addTask(name, description);
    triggerSetFilter('in_progress');
  };

  const triggerDeleteTask = async (id) => {
    await removeTask(id);
    fetchData();
  };

  const triggerToggleTask = async (id) => {
    await toggleTask(id);
    fetchData();
  };

  const triggerUpdateTask = async (id, name, description) => {
    await updateTask(id, name, description);
    fetchData();
  };

  const triggerSetFilter = async (filter) => {
    setFilter(filter);
    fetchData(filter);
  }

  const filterList = Object.keys(FILTER_MAP).map((key) => (
    <button
      className={`px-3 py-1 ${key === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
      onClick={() => triggerSetFilter(key)}
      aria-pressed={key === filter}
      data-cy={`filter-${key}`}
    >
      <span className="sr-only">Show</span>
      <span>{FILTER_MAP[key]}</span>
      <span className="sr-only">Tasks</span>
    </button>
  ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container bg-blue-800 flex h-screen">
      <div className="m-auto bg-primary-600 white p-6 rounded-lg text-white max-w-md w-full">
        <h2 className="text-white text-xl font-semibold mb-4">TO DO LIST</h2>
        <Form addTask={triggerAddTask} />
        <ul className="tasks">
          {tasks.map(({ name, id, stateCd }) => (
            <Task
              key={id}
              text={name}
              id={id}
              completed={stateCd == 'completed'}
              deleteTask={triggerDeleteTask}
              toggleTask={triggerToggleTask}
              updateTask={triggerUpdateTask}
              isEditing={id === currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}
            />
          ))}
        </ul>
        <div>
          {filterList}
        </div>
      </div>
    </div>
  );
}

export default App;
