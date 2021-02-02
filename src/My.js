import axios from "./axios";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import "./My.css";
import { useStateValue } from "./StateProvider";

export default function My() {
  const [{ namee, emaill }, dispatch] = useStateValue();
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (namee) {
      data();
    }
  }, [namee]);

  const data = async () =>
    await axios.get("/sync").then((response) => {
      response.data.map((p) => {
        setPost(response.data);
        // }
      });
    });

  const result = post.filter((p) => p.email === emaill);
  return (
    <div className="post">
      {namee ? (
        result.map((p) => (
          <Posts
            caption={p.caption}
            image={p.image}
            user={p.user}
            price={p.price}
            details={p.details}
          />
        ))
      ) : (
        <h2>Sign In</h2>
      )}
    </div>
  );
}
