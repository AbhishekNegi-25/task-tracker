import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, updateTask } from "./taskSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSave } from "react-icons/fa";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleCategoryChange = (e, index) => {
    const newCategories = [...editedTask.categories];
    newCategories[index] = e.target.value;
    setEditedTask({ ...editedTask, categories: newCategories });
  };

  const addCategory = () => {
    if (editedTask.categories[editedTask.categories.length - 1]) {
      setEditedTask({
        ...editedTask,
        categories: [...editedTask.categories, ""],
      });
    }
  };

  const removeCategory = (index) => {
    const newCategories = editedTask.categories.filter((_, i) => i !== index);
    setEditedTask({ ...editedTask, categories: newCategories });
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="edit-input"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="edit-textarea"
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="edit-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="edit-categories">
            {editedTask.categories?.map((cat, index) => (
              <div key={index} className="category-input-group">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => handleCategoryChange(e, index)}
                  className="category-input"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="remove-category-btn"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCategory}
              className="add-category-btn"
            >
              + Add Category
            </button>
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              <FaSave /> Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
              {task.categories?.map((cat) => (
                <span key={cat} className="category-tag">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              className={`action-btn ${task.completed ? "completed-btn" : ""}`}
              aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
            >
              <FaCheck />
            </button>
            <button
              onClick={handleEdit}
              className="action-btn edit-btn"
              aria-label="Edit task"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="action-btn delete-btn"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
