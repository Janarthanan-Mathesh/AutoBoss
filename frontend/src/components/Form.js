import React, { useState } from 'react';

const Form = ({ fields, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block">{field.label}</label>
          <input
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="w-full p-2 border"
            required={field.required}
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Submit</button>
    </form>
  );
};

export default Form;