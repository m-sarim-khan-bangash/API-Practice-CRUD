import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalComponent = ({ show, handleClose, data, updateData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  // Populate modal with data when editing
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
      setImage(null);
    } else {
      setTitle("");
      setBody("");
      setImage(null);
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let params = {
      title: title,
      body: body,
    };
    const formData = new FormData(params);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (data) {
        const response = await axios.patch(
          `https://jsonplaceholder.typicode.com/posts/${data.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        updateData(response.data);
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        updateData({ ...response.data, id: Date.now() }); // Generate a unique ID
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    show && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{data ? "Edit Post" : "Add Post"}</h5>
              <button
                type="button"
                className="btn btn-danger rounded-circle"
                style={{ border: "none" }}
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <textarea
                    className="form-control"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {data ? "Save Changes" : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalComponent;
