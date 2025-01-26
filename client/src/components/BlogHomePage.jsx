import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogHomePage.css";

const BlogHomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-homepage">
      <main className="blog-posts">
        <div className="posts-row">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2 className="post-title">
                <Link to={`/post/${post._id}`}>{post.title}</Link>{" "}
              </h2>
              <p className="post-excerpt">
                {post.content.substring(0, 100)}...
              </p>
              <div className="post-meta">
                <span className="author">By {post.author}</span>
                <span className="timestamp">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogHomePage;
