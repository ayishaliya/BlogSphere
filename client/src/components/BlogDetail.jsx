import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/post/${id}`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setLoading(false);
        } else {
          setError("Failed to fetch blog");
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching blog: " + error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]); // Run effect when the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="blog-detail-container">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-author">By {blog.author}</p>
      <p className="blog-timestamp">
        {new Date(blog.createdAt).toLocaleString()}
      </p>
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
