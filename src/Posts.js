import { Button } from "@material-ui/core";
import React from "react";
import "./Posts.css";

export default function Posts({ caption, image, user, price, details }) {
  return (
    <div className="posts">
      <img src={image} alt="" />
      <div className="posts__details">
        <h2>{user}</h2>
        <h5>{caption}</h5>
        <p>{details}</p>
        <p>₹{price}</p>
      </div>
      <Button>Buy Now</Button>
    </div>
  );
}
