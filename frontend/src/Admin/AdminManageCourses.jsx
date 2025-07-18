import React, { useEffect, useState } from 'react';
import '../styles/AdminStyle/AdminManageCourses.css';

function AdminManageCourses() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    detailedDescription: '',
    modules: [{ title: '', content: '' }],
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, e) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][e.target.name] = e.target.value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const addModule = () => {
    setFormData({ ...formData, modules: [...formData.modules, { title: '', content: '' }] });
  };

  const removeModule = (index) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `http://localhost:8000/api/courses/${editId}`
        : 'http://localhost:8000/api/courses';

      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save course');

      setFormData({
        title: '',
        description: '',
        image: '',
        detailedDescription: '',
        modules: [{ title: '', content: '' }],
      });
      setEditId(null);
      fetchCourses();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      image: course.image,
      detailedDescription: course.detailedDescription || '',
      modules: course.modules.length > 0 ? course.modules : [{ title: '', content: '' }],
    });
    setEditId(course._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/courses/${id}`, {
        method: 'DELETE',
      });
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  return (
    <div className="admin-courses-container">
      <h2>Manage Courses</h2>

      <form className="admin-course-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="detailedDescription"
          placeholder="Detailed Description"
          value={formData.detailedDescription}
          onChange={handleChange}
        />

        <h4>Modules</h4>
        {formData.modules.map((mod, index) => (
          <div key={index} className="module-input-group">
            <input
              type="text"
              name="title"
              placeholder="Module Title"
              value={mod.title}
              onChange={(e) => handleModuleChange(index, e)}
            />
            <textarea
              name="content"
              placeholder="Module Content"
              value={mod.content}
              onChange={(e) => handleModuleChange(index, e)}
            />
            {formData.modules.length > 1 && (
              <button type="button" onClick={() => removeModule(index)} className="remove-module">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addModule} className="add-module">
          + Add Module
        </button>

        <button type="submit">{editId ? 'Update' : 'Add'} Course</button>
      </form>

      <div className="admin-course-list">
        {courses.map((course) => (
          <div key={course._id} className="admin-course-item">
            <img src={course.image} alt={course.title} />
            <div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button onClick={() => handleEdit(course)}>Edit</button>
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminManageCourses;
