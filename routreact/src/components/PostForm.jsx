import { useNavigate } from "react-router-dom";

export default function PostForm({
  formData,
  setFormData,
  onSubmit,
  buttonText
}) {

  const navigate = useNavigate();

  const hasImage = formData.image_url && !formData.removeImage;

  return (
    <form
      className="post-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >

      <input
        className="input-box"
        placeholder="Enter Title..."
        value={formData.title}
        onChange={(e)=>
          setFormData({...formData,title:e.target.value})
        }
      />

      <textarea
        className="content-box"
        placeholder="Write your post..."
        value={formData.description}
        onChange={(e)=>
          setFormData({...formData,description:e.target.value})
        }
      />

      <input
        className="input-box"
        type="text"
        placeholder="Author Name..."
        value={formData.authorName || ""}
        onChange={(e) =>
          setFormData({ ...formData, authorName: e.target.value })
        }
      />
      {hasImage ? (
        <div>
          <img
            src={formData.image_url}
            alt="post"
            className="preview-image"
          />

          <button
            type="btn"
            className="btn remove"
            onClick={() =>
              setFormData({
                ...formData,
                image_url: null,
                image: null,
                removeImage: true
              })
            }
          >
            Remove Image
          </button>
        </div>
      ) : (
        <input
          type="file"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
              removeImage: false
            })
          }
        />
      )}

      <div className="form-buttons">
        <button
          type="button"
          className="btn cancel"
          onClick={() => navigate("/")}>
          Cancel
        </button>

        <button type="submit" className="btn">
          {buttonText}
        </button>
      </div>

    </form>
  );
}