import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setIsDeleting(false);
        notify(true, "Blog successfully deleted.");
        history.push("/");
      })
      .catch((err) => {
        setIsDeleting(false);
        notify(false, err.message);
      });
  };

  /* This handles the toaster notifications that are shown in the lower right corner */
  const notify = (success, message) => {
    if (success) {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          {!isDeleting && <button onClick={handleDelete}>Delete blog</button>}
          {isDeleting && <button disabled>Deleting blog</button>}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
