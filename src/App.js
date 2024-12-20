import { useState, useEffect } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Task from "./components/Task";
import apolloClient from "./lib/apolloClient";
import { ApolloProvider } from '@apollo/client';
import { GET_TASKS } from './lib/queries';
import { fetchTasks } from "./components/services/fetchTasks";
import { addTask } from "./components/services/addTask";
import { removeTask } from "./components/services/removeTask";
import { toggleTask } from "./components/services/toggleTask";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchTasks();

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

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
  const [completedAll, setCompletedAll] = useState(false);
  const [filter, setFilter] = useState("All");
  const [currentlyEditing, setCurrentlyEditing] = useState("");

  const triggerAddTask = async (name, description) => {
    addTask(name, description);
    fetchData();
  };

  const triggerDeleteTask = (id) => {
    removeTask(id);
    fetchData();
  };

  const deleteAll = () => setTasks([]);

  const triggerToggleTask = (id) => {
    toggleTask(id);
    fetchData();
  };

  const toggleAll = () => setTasks(tasks.map((task) => (
    { ...task, completed: !task.completed }
  )));

  const triggerUpdateTask = (text, id) => setTasks(tasks.map((task) => (
    task.id === id ? { ...task, text } : task
  )));

  const completeAll = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: !completedAll })));
    setCompletedAll(!completedAll);
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ApolloProvider client={apolloClient}>
      <div className="app-container bg-blue-800 flex h-screen">
        <div className="m-auto bg-primary-600 white p-6 rounded-lg text-white max-w-md w-full">
          <h2 className="text-white text-xl font-semibold mb-4">TO DO LIST</h2>
          <Form addTask={triggerAddTask} />
          <ul className="tasks">
            {tasks.filter(FILTER_MAP[filter]).map(({ name, id, stateCd }) => (
              <Task
                key={id}
                text={name}
                id={id}
                completed={stateCd}
                deleteTask={triggerDeleteTask}
                toggleTask={triggerToggleTask}
                updateTask={triggerUpdateTask}
                isEditing={id === currentlyEditing}
                setCurrentlyEditing={setCurrentlyEditing}
              />
            ))}
          </ul>
          <div className="hidden">
            <button onClick={deleteAll}>Delete All</button>
            <button onClick={toggleAll}>Toggle All</button>
            <button onClick={completeAll}>Complete All</button>
          </div>
          {tasks.length > 0 && (
            <div>
              {filterList}
            </div>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
