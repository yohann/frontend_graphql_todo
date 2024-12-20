import { useEffect, useState, useRef } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function Task({ text, id, completed, deleteTask, toggleTask, updateTask, isEditing, setCurrentlyEditing }) {
  const [newText, setNewText] = useState(text);
  const editingInput = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editingInput.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = newText.trim();
    if (trimmedText) {
      updateTask(trimmedText, id);
      setCurrentlyEditing("");
    }
  };

  const handleEditInputChange = (e) => {
    setNewText(e.target.value);
    updateTask(e.target.value, id);
  };

  const handleEditButtonClick = () => {
    setCurrentlyEditing(isEditing ? "" : id);
  };

  return (
    <li className={`relative flex items-center text-white bg-primary-400 mb-3 p-2 ${completed ? 'line-through text-light' : ''}`} id={id} key={id} data-completed={completed}>
      <label htmlFor={`input-${id}`} className="group cursor-pointer">
        <input
          checked={completed}
          onChange={() => toggleTask(id)}
          className="appearance-none w-3.5 h-3.5 mr-2 border rounded-full ease-linear duration-400 group-hover:shadow-checkbox group-hover:border-secondary checked:border-secondary checked:bg-secondary"
          id={`input-${id}`}
          type="checkbox"
        />
        <span>{text}</span>
      </label>
      {isEditing && (
        <form className="absolute left-7.5 top-2 bg-primary-400 outline-none border-0 border-b border-white" onSubmit={handleSubmit}>
          <input
            ref={editingInput}
            type="text"
            value={newText}
            onChange={handleEditInputChange}
          />
          <button className="hidden" type="submit">Update</button>
        </form>
      )}
      <button className="ml-auto text-white" onClick={handleEditButtonClick}>
        <FaEdit alt="edit" />
      </button>
      <button className="ml-2 text-white" onClick={() => deleteTask(id)}>
        <FaRegTrashCan alt="delete" />
      </button>
    </li>
  );
}

export default Task;