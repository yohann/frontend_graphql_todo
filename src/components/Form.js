import { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa";

function Form({ addTask }) {
  const [todoText, setTaskText] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmedText = todoText.trim();
    console.log(trimmedText);
    if (!trimmedText) return;
    addTask(trimmedText, "");
    clearForm();
  }, [todoText, addTask]);

  const clearForm = useCallback(() => {
    setTaskText("");
  }, []);

  return (
    <form className="text-white flex gap-1 w-full mb-4" onSubmit={handleSubmit}>
      <label htmlFor="todo" className="flex-1 mr-1">
        <span className="hidden">Task</span>
        <input
          className="w-full text-inherit px-1 py-2 border-0 border-b border-white bg-transparent outline-0"
          type="text"
          name="todo"
          id="todo"
          placeholder="Add New Task"
          aria-label="Add New Taask"
          value={todoText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </label>
      <button
        className="text-inherit bg-secondary w-9 h-9 flex justify-center items-center rounded-full shadow-button"
        type="submit"
      >
        <FaPlus alt="plus" />
        <span className="sr-only">Add Task</span>
      </button>
    </form>
  );
}

Form.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default Form;