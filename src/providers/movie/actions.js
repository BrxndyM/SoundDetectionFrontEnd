import {createAction} from 'redux-actions';


const fetchAllMoviesAction = createAction("FETCH_MOVIES");

const createNewMovieAction = createAction("ADD_MOVIE", (movies) => ({ movies }));

const updateMovieAction= createAction("UPDATE_MOVIE", (movies) => ({ movies }));

const deleteMovieAction=createAction("DELETE_MOVIE", (movie)=>({movie}));

export {fetchAllMoviesAction, createNewMovieAction, updateMovieAction, deleteMovieAction};