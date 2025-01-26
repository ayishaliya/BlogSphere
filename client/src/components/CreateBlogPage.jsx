import React, { useState } from "react";
import "./CreateBlogPage.css";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) {
      setError("All fields are required!");
      return;
    }
    const response = await fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify({ title, content, author }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      setError("");
    } else {
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-title">Create a New Blog</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            className="form-input"
            placeholder="Write your blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="form-input"
            placeholder="Enter the author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
