import { BsFillPencilFill } from "react-icons/bs";
import './EditTable.css'
// import images from './MovieImages.json';
// import picture from '../Media/ViewImages/movie2.jpg';
import React, { useEffect, useState, useContext } from 'react';
// import { BiSave } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { SaveOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined,  FolderViewOutlined,LeftOutlined } from '@ant-design/icons';




function MovieDetails({ movie, setMovie, onBackClick }) {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setTitle] = useState(movie.title);
    const [newDuration, setDuration] = useState(movie.duration);
    const [newStarring, setStarring] = useState(movie.starring);
    const [newGenreName, setGenreName] = useState(movie.genreName);
    const [newYear, setYear] = useState(movie.year);
    const [currentMovie, setCurrentMovie] = useState(movie);
    
    
    function handleEdit() {
        console.log("movie on edit mode1");
        setEditMode(true);
        console.log("movie on edit mode2");
    };
    function handleCancel(){
        setEditMode(false);
    }
    const handleSave  = async (event, id) => {
        event.preventDefault()
        try {
            // Update the movie details in the database
            const updatedMovie = {
            ...movie,
            title: newTitle,
            duration: newDuration,
            starring: newStarring,
            genreName: newGenreName,
            year: newYear
            };
            const response = await fetch(`https://localhost:44311/api/services/app/Movie/Update?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMovie)
            });
            if (!response.ok) {
            throw new Error('Failed to update movie.');
            }
            // Set the updated movie details in the state
            setMovie(updatedMovie);
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <div className="movie-details-container">
        <div className="movie-details">
            {editMode ? (
                <form>
                    <label>
                        Title:
                        <input type="text" value={newTitle} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Duration:
                        <input type="text" value={newDuration} onChange={(e) => setDuration(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Starring:
                        <input type="text" value={newStarring} onChange={(e) => setStarring(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Genre:
                        <input type="text" value={newGenreName} onChange={(e) => setGenreName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Year:
                        <input type="text" value={newYear} onChange={(e) => setYear(e.target.value)} />
                    </label>
                    <br />
                    <div className="editSavePlusBack">
                        <button style={{backgroundColor: '#e76f51', borderRadius:'5px', width:'45px', marginRight:'20px'}}><SaveOutlined onClick={(event) => handleSave(event, movie.id)} style={{color: 'white', size:'19', height:'20px' }} className='icon' /></button>
                        <button type="button"  style={{backgroundColor: '#e76f51', borderRadius:'5px', width:'45px'}} onClick={handleCancel}><LeftOutlined style={{color: 'white', size:'50', height:'20px' }} className='icon' /></button>
                    </div>
                </form>
            ) : (
                <>
                    <h2>{movie.title}</h2>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Starring:</strong> {movie.starring}</p>
                    <p><strong>Genre:</strong> {movie.genreName}</p>
                    <p><strong>Year:</strong> {movie.year}</p>
                    {/* <img src={picture} height={200} width={200} /> */}
                </>
            )}
            <div className="backPlusEditBtn">
                {!editMode && (
                    <button style={{backgroundColor: '#e76f51', borderRadius:'5px', width:'45px', marginRight:'20px'}}>
                        <EditOutlined  onClick={handleEdit} style={{color: 'white', size:'19', height:'20px' }} className='icon' />
                    </button>
                )}
                {!editMode && (
                    <button onClick={onBackClick} style={{backgroundColor: '#e76f51', borderRadius:'5px', width:'45px'}}>
                        <LeftOutlined style={{color: 'white', size:'19', height:'20px' }} className='icon' />
                    </button>
                )}
            </div>
        </div>
    </div>
    );
}
  export default MovieDetails