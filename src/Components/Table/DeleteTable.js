import { useState } from "react";
const DeleteMovie = ({ id, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`https://localhost:44311/api/services/app/Movie/Delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      onDelete(id);
    } catch (error) {
      console.error(error);
    }
    setIsDeleting(false);
  };
  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};
export default DeleteMovie;





