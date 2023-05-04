import react,{useState} from 'react';


const MovieEditForm = ({ movie, onSave, onCancel }) => {
  const [title, setTitle] = useState(movie.title);
  const [duration, setDuration] = useState(movie.duration);
  const [starring, setStarring] = useState(movie.starring);
  const [category, setCategory] = useState(movie.category);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the server using fetch or a similar method
    // Then call the onSave callback to close the edit form
    onSave();
  };
  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="duration">Duration</label>
        <input type="text" name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <div>
        <label htmlFor="starring">Starring</label>
        <input type="text" name="starring" id="starring" value={starring} onChange={(e) => setStarring(e.target.value)} />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};
export default MovieEditForm;