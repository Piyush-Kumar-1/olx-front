import axios from "./axios";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";

export default function Post() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    data();
  }, []);

  const data = async () =>
    await axios.get("/sync").then((response) => {
      setPost(response.data);
    });

  return (
    <div className="post">
      {post.map((p) => (
        <Posts
          caption={p.caption}
          image={p.image}
          user={p.user}
          price={p.price}
          details={p.details}
        />
      ))}
    </div>
  );
}
