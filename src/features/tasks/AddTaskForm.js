import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTask } from "./taskSlice";

export const AddTaskForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "medium",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less")
        .required("Title is required"),
      description: Yup.string().max(
        500,
        "Description must be 500 characters or less"
      ),
      priority: Yup.string()
        .oneOf(["low", "medium", "high"], "Invalid priority")
        .required("Priority is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addTask({
          ...values,
          categories,
        })
      );
      resetForm();
      setCategories([]);
      setCategoryInput("");
    },
  });

  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={formik.handleSubmit} className="task-form">
        {/* Title Field */}
        <div className="form-field">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Task title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={
              formik.touched.title && formik.errors.title ? "input-error" : ""
            }
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error-text">{formik.errors.title}</div>
          )}
        </div>

        <div className="form-field">
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={
              formik.touched.description && formik.errors.description
                ? "input-error"
                : ""
            }
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error-text">{formik.errors.description}</div>
          )}
        </div>

        <div className="form-field">
          <select
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
            className={
              formik.touched.priority && formik.errors.priority
                ? "input-error"
                : ""
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {formik.touched.priority && formik.errors.priority && (
            <div className="error-text">{formik.errors.priority}</div>
          )}
        </div>

        <div className="form-field">
          <div className="category-input-group">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Add category"
              className="category-input"
            />
            <button
              type="button"
              onClick={addCategory}
              className="add-category-btn"
            >
              +
            </button>
          </div>
          <div className="category-tags">
            {categories.map((cat) => (
              <span key={cat} className="category-tag">
                {cat}
                <button
                  type="button"
                  className="remove-tag-btn"
                  onClick={() =>
                    setCategories(categories.filter((c) => c !== cat))
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
