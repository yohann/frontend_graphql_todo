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
      updateTask(id, trimmedText);
      setCurrentlyEditing("");
    }
  };

  const handleEditInputChange = (e) => {
    setNewText(e.target.value);
  };

  const handleEditButtonClick = () => {
    setCurrentlyEditing(isEditing ? "" : id);
  };

  return (
    <li className={`relative flex items-center text-white bg-primary-400 mb-3 p-2 ${completed ? 'line-through text-light' : ''}`} id={id} key={id} data-completed={completed} data-cy="task-item">
      <span htmlFor={`input-${id}`} className="group cursor-text">
        <input
          checked={completed}
          onChange={() => toggleTask(id)}
          className="appearance-none w-3.5 h-3.5 mr-2 border rounded-full ease-linear duration-400 group-hover:shadow-checkbox group-hover:border-secondary checked:border-secondary checked:bg-secondary cursor-pointer"
          id={`input-${id}`}
          data-cy='complete-checkbox'
          type="checkbox"
        />
        <span onClick={handleEditButtonClick}>{text}</span>
      </span>
      {isEditing && (
        <form className="absolute left-7.5 top-2 bg-primary-400 outline-none border-0 border-b text-black border-white edit" onSubmit={handleSubmit}>
          <input
            ref={editingInput}
            type="text"
            value={newText}
            onBlur={handleSubmit}
            onChange={handleEditInputChange}
            data-cy='edit-input'
          />
          <button className="hidden" type="submit">Update</button>
        </form>
      )}
      <button className="ml-auto text-white" onClick={handleEditButtonClick}>
        <FaEdit alt="edit" />
      </button>
      <button className="ml-2 text-white" data-cy='delete-button' onClick={() => deleteTask(id)}>
        <FaRegTrashCan alt="delete" />
      </button>
    </li>
  );
}

export default Task;