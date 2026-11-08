import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Todo({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className={`todo-item slide-in ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input 
          type="checkbox" 
          checked={todo.completed || false} 
          onChange={onToggle}
          className="todo-checkbox"
          aria-label={`Mark "${todo.text}" as completed`}
          title={todo.completed ? "Mark as active" : "Mark as completed"}
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-actions">
        <button className="icon-btn edit-btn" onClick={onEdit} title="Edit Task" aria-label="Edit Task">
          <FaEdit size={14} />
        </button>
        <button className="icon-btn delete-btn" onClick={onDelete} title="Delete Task" aria-label="Delete Task">
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  );
}

export default Todo;
