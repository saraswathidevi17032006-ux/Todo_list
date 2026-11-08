import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Form from "./Components/Form";
import Todo from "./Components/Todo";
import { FaPowerOff, FaClipboardCheck, FaCrown } from "react-icons/fa";
import "./App.css";

function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-blob-1"></div>
      <div className="ambient-blob-2"></div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch {
        return [];
      }
    } else {
      return [];
    }
  });

  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (text) => {
    if (!text.trim()) {
      alert("Please enter a valid task description.");
      return;
    }

    if (editTask) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTask.id ? { ...todo, text: text } : todo
        )
      );
      setEditTask(null);
    } else {
      const newTask = { id: Date.now(), text: text, completed: false };
      setTodos([...todos, newTask]);
    }
  };

  const startEdit = (todo) => {
    setEditTask(todo);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editTask && editTask.id === id) {
      setEditTask(null);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleLogin = (username, password) => {
    if (username && password) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      alert("Please enter both username and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!isLoggedIn) {
    return (
      <>
        <AmbientBackground />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <AmbientBackground />
      <main className="app-container glass-card">
        <header className="dashboard-header">
          <div className="header-title">
            <div className="header-icon-wrapper">
              <FaCrown size={22} />
            </div>
            <h2>Prestige Agenda</h2>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Logout" aria-label="Logout">
            <FaPowerOff size={15} /> <span className="logout-text">Sign Out</span>
          </button>
        </header>

        <section className="dashboard-subheader">
          <div className="welcome-text">
            Welcome back, <strong>{currentUser}</strong>
          </div>

          <div className="stats-bar">
            <div className="stats-pills">
              <div className="stat-pill">
                <span className="stat-badge">{totalTasks}</span>
                <span>Total</span>
              </div>
              <div className="stat-pill">
                <span className="stat-badge completed-badge">{completedTasks}</span>
                <span>Completed</span>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-header">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <Form addTask={addTask} editTask={editTask} />

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="no-todos">
              <FaClipboardCheck size={52} className="empty-icon" />
              <p>Your agenda is pristine. No pending priorities.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={() => toggleComplete(todo.id)}
                onEdit={() => startEdit(todo)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default App;
