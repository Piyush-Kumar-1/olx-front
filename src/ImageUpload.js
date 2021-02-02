import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage } from "./firebase";
import "./ImageUpload.css";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

export default function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [details, setDtails] = useState("");
  const [{ emaill, namee }, dispatch] = useStateValue();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",

      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            axios.post("/upload", {
              caption: caption,
              details: details,
              user: namee,
              image: url,
              price: price,
              email: emaill,
            });
          });
      }
    );
    setCaption("");
    setDtails("");
    setPrice(0);
    setImage(null);
  };

  return (
    <div>
      <form className="imageupload">
        <input
          id="input"
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="enter details"
          value={details}
          onChange={(e) => setDtails(e.target.value)}
          required
        />
        <input
          id="input"
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" onChange={handleChange} />
        {namee ? (
          <Button className="btn" onClick={handleUpload}>
            Upload
          </Button>
        ) : (
          <p id="text">Please Sign In to Upload</p>
        )}
      </form>
    </div>
  );
}
