import { useState, useEffect } from "react";
import { FaPlus, FaSave } from "react-icons/fa";

function Form({ addTask, editTask }) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (editTask) {
      setInputText(editTask.text);
    } else {
      setInputText("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputText);
    if (!editTask && inputText.trim()) {
      setInputText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new priority or task..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className={`todo-input ${editTask ? 'edit-mode' : ''}`}
      />
      <button type="submit" className="add-btn btn-gradient">
        {editTask ? (
          <>
            <FaSave /> Save Changes
          </>
        ) : (
          <>
            <FaPlus /> Add Task
          </>
        )}
      </button>
    </form>
  );
}

export default Form;
