import React, { useState, useEffect } from "react";
import "./UploadProjectForm.css";

export default function UploadProjectForm({ handleUpload, loading, isEditing = false, project = null, onUpdate = null }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [languages, setLanguages] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [supportingImages, setSupportingImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  // Existing media states
  const [existingCoverImage, setExistingCoverImage] = useState(null);
  const [existingSupportingImages, setExistingSupportingImages] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);

  // Media to delete
  const [toDeleteCover, setToDeleteCover] = useState(false);
  const [toDeleteSupporting, setToDeleteSupporting] = useState([]);
  const [toDeleteVideo, setToDeleteVideo] = useState(false);

  useEffect(() => {
    if (isEditing && project) {
      setProjectTitle(project.projectTitle || "");
      setProjectCategory(project.projectCategory || "");
      setLanguages(project.languages || "");
      setDescription(project.description || "");
      setGithubLink(project.githubLink || "");
      setLiveLink(project.liveLink || "");
      setExistingCoverImage(project.coverImage || null);
      setExistingSupportingImages(project.supportingImages || []);
      setExistingVideo(project.video || null);
      setToDeleteCover(false);
      setToDeleteSupporting([]);
      setToDeleteVideo(false);
    } else {
      // Reset for new upload
      setProjectTitle("");
      setProjectCategory("");
      setLanguages("");
      setDescription("");
      setCoverImage(null);
      setSupportingImages([]);
      setVideo(null);
      setGithubLink("");
      setLiveLink("");
      setExistingCoverImage(null);
      setExistingSupportingImages([]);
      setExistingVideo(null);
      setToDeleteCover(false);
      setToDeleteSupporting([]);
      setToDeleteVideo(false);
    }
  }, [isEditing, project]);

  const handleSupportingImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSupportingImages((prev) => [...prev, ...files]);
  };

  const removeSupportingImage = (index) => {
    setSupportingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && onUpdate) {
      onUpdate({
        projectId: project.projectId,
        projectTitle,
        projectCategory,
        languages,
        description,
        coverImage,
        supportingImages,
        video,
        githubLink,
        liveLink,
        toDeleteCover,
        toDeleteSupporting,
        toDeleteVideo,
      });
    } else {
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
      });
    }
  };

  return (
    <div className="upload-form-container">
      <h2 className="authen-title">{isEditing ? "Edit Your Project" : "Upload Your Project"}</h2>
      <form
        className="authen-form"
        onSubmit={handleSubmit}
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
          <label>Cover Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
          <div className="preview-list">
            {existingCoverImage && !toDeleteCover && (
              <div className="preview-item">
                <img
                  src={existingCoverImage.url}
                  alt="existing cover"
                  className="preview-img"
                />
                <button type="button" onClick={() => setToDeleteCover(true)}>✕</button>
              </div>
            )}
            {coverImage && (
              <div className="preview-item">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="new cover"
                  className="preview-img"
                />
                <button type="button" onClick={() => setCoverImage(null)}>✕</button>
              </div>
            )}
          </div>
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
            {existingSupportingImages.map((img, index) => (
              !toDeleteSupporting.includes(img.publicId) && (
                <div key={`existing-${index}`} className="preview-item">
                  <img
                    src={img.url}
                    alt={`existing support-${index}`}
                    className="preview-img"
                  />
                  <button type="button" onClick={() => setToDeleteSupporting(prev => [...prev, img.publicId])}>
                    ✕
                  </button>
                </div>
              )
            ))}
            {supportingImages.map((img, index) => (
              <div key={`new-${index}`} className="preview-item">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`new support-${index}`}
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
          <div className="preview-list">
            {existingVideo && !toDeleteVideo && (
              <div className="preview-item">
                <video
                  src={existingVideo.url}
                  className="preview-img"
                  controls
                />
                <button type="button" onClick={() => setToDeleteVideo(true)}>✕</button>
              </div>
            )}
            {video && (
              <div className="preview-item">
                <video
                  src={URL.createObjectURL(video)}
                  className="preview-img"
                  controls
                />
                <button type="button" onClick={() => setVideo(null)}>✕</button>
              </div>
            )}
          </div>
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
          {loading ? <span className="spinner"></span> : (isEditing ? "Update Project" : "Upload Project")}
        </button>
      </form>
    </div>
  );
}
