import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = { text: input.trim(), done: false };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex].text = editText.trim();
    setTasks(updated);
    setEditingIndex(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="wrapper">
      <h1>📝 To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              className={task.done ? "done" : ""}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={saveEdit}>💾</button>
                  <button onClick={cancelEdit}>✖️</button>
                </>
              ) : (
                <>
                  <motion.span
                    onClick={() => toggleTask(index)}
                    className={task.done ? "done" : ""}
                    whileTap={{ scale: 0.95 }}
                  >
                    {task.text}
                  </motion.span>
                  <div className="task-buttons">
                    <button onClick={() => startEditing(index)}>✏️</button>
                    <button onClick={() => removeTask(index)}>❌</button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {tasks.length > 0 && (
        <button onClick={clearAll} style={{ marginTop: "1rem" }}>
          🗑 Clear All
        </button>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link to="/">
          <button>⬅ Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default TodoList;
