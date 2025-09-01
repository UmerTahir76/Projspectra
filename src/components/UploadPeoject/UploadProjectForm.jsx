import React, { useState } from "react";
import "./UploadProjectForm.css";

export default function UploadProjectForm({ handleUpload, loading }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [languages, setLanguages] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [supportingImages, setSupportingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const handleSupportingImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSupportingImages((prev) => [...prev, ...files]);
  };

  const removeSupportingImage = (index) => {
    setSupportingImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="upload-form-container">
      <h2 className="authen-title">Upload Your Project</h2>
      <form
        className="authen-form"
        onSubmit={(e) =>
          handleUpload(e, {
            projectTitle,
            projectCategory,
            languages,
            description,
            coverImage,
            supportingImages,
            video,
            githubLink,
            liveLink,
          })
        }
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="app">App</option>
            <option value="web">Web</option>
            <option value="ai">AI</option>
            <option value="ecom">Ecom</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Languages (comma separated)"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Cover Image */}
        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
          {coverImage && (
            <div className="preview-list">
              <div className="preview-item">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="cover"
                  className="preview-img"
                />
                <button type="button" onClick={() => setCoverImage(null)}>✕</button>
              </div>
            </div>
          )}
        </div>

        {/* Supporting Images */}
        <div className="form-group">
          <label>Supporting Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleSupportingImagesChange}
          />
          <div className="preview-list">
            {supportingImages.map((img, index) => (
              <div key={index} className="preview-item">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`support-${index}`}
                  className="preview-img"
                />
                <button type="button" onClick={() => removeSupportingImage(index)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="form-group">
          <label>Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          {video && (
            <div className="preview-list">
              <div className="preview-item">
                <video
                  src={URL.createObjectURL(video)}
                  className="preview-img"
                  controls
                />
                <button type="button" onClick={() => setVideo(null)}>✕</button>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <input
            type="url"
            placeholder="GitHub Repo Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="url"
            placeholder="Live Website Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Upload Project"}
        </button>
      </form>
    </div>
  );
}
