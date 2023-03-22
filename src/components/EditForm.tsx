import React, { useState } from "react";
import axios from 'axios'

interface IProps {
  onSubmit: (formData: {
    title: string;
    description: string;
  }) => void;
}

const EditForm = ({ onSubmit }: IProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "" });

  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        required
        type="text"
        value={formData.title}
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        onChange={handleChange}
        placeholder="Add Description"
        value={formData.description}
      />
      {/* <input
        type="checkbox"
        name="done"
        onChange={handleChange}
        value={formData.done}
      /> */}
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default EditForm;
