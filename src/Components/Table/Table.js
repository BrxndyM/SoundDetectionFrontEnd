import React, { useEffect, useState, useContext } from 'react';
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';
import './table.css';
import { AuthContext } from '../../App';
import PopUp from '../PopUp/PopUp';
import MovieDetails from '../Table/EditTable';
import DeleteMovie from './DeleteTable';
import { BiSave } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { BiLogOut } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';

function MovieTable() {
    // const { setIsAuthenticated } = useContext(AuthContext);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState();
    const [editMode, setEditMode] = useState(false);
    // const [editingMovie, setEditingMovie] = useState(null);




    const [newTitle, setTitle] = useState(movies.title);
    const [newDuration, setDuration] = useState(movies.duration);
    const [newStarring, setStarring] = useState(movies.starring);
    const [newGenreName, setGenreName] = useState(movies.genreName);
    const [newYear, setYear] = useState(movies.year);

    const handleFormSubmit = (data) => {
        setMovies([...movies, data]);
    };


    const [selectedFilter, setSelectedFilter] = useState('');
    const filterOptions = ['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Horror', 'Adventure', 'Thriller'];

    useEffect(() => {
        const url = 'https://localhost:44311/api/services/app/Movie/GetAll';
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode': 'no-cors'
            }
        }
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("error");
                    throw new Error('Error:', response.statusText);
                }
            })
            .then(data => {
                setData(data.result);
                setCount(data.result.length);
                console.log(count, "total")
                console.log("response data", data?.result?.items);
            })
            .catch(error => console.error('Error:', error.message));
    }, [movies]);


    const columns = React.useMemo(
        () => [
            {
                Header: 'Movie Title',
                accessor: 'title',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: 'Starring',
                accessor: 'starring',
            },
            {
                Header: 'Genre',
                accessor: 'genreName',
            },
            {
                Header: 'Release Year',
                accessor: 'year',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: ({ row }) => (
                    <button onClick={() => handleView(row)}>View</button>
                ),
            },
            {
                Header: 'Edit',
                accessor: 'edit',
                Cell: ({ row }) => (
                    <button onClick={() => handleEditBtn(row.original)}>Edit</button>
                ),
            },
            {
                Header: 'Delete',
                accessor: 'delete',
                Cell: ({ row }) => (
                    <button onClick={() => handleDelete(row)}>Delete</button>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize },
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        pageCount,
    } = useTable({ columns, data: data }, useFilters, useGlobalFilter, usePagination);

    function handleSignOut() {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            // setIsAuthenticated(false);
            // Redirect the user to the login component
            window.location.href = '/Login';
        }
    }

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const filteredRows = React.useMemo(() => {
        const rowsToFilter = selectedFilter ? page.filter((row) => row.values.genre === selectedFilter) : page;
        return rowsToFilter;
    }, [selectedFilter, page]);



    function handleEditBtn() {
        setEditMode(true);
        setTitle(selectedMovie.title);
        setDuration(selectedMovie.duration);
        setStarring(selectedMovie.starring);
        setGenreName(selectedMovie.genreName);
        setYear(selectedMovie.year);
    };
    // const handleEdit = (row) => {
    //     setEditingMovie(row.original);
    //   };

    const handleDelete = (row) => {
        const url = `https://localhost:44311/api/services/app/Movie/Delete?Id=${row.original.id}`;
        const confirmDelete = window.confirm(`Are you sure you want to delete ${row.original.movie_title}?`);
        // const deletedItem = row.cell.find(item => item == )
        const rowId = (row.original.id);
        if (confirmDelete) {
            // Implement delete functionality here
            console.log(`Deleting movie ${row.original.id}`);
            console.log(row.cells.map(a => a.column));
            console.log(`Deleting movie ${row.original.movie_title}`);
            // console.log(row.cells[0].column.Header));
            const requestOptions =
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {

                    } else {
                        console.log('Error deleting record');
                    }
                })
                .catch(error => console.error('Error:', error.message));
        }
    };
    const handleView = (row) => {
        //     // code to view movie details
        //    // const handleView = (movie) => {
        //     console.log("loggin view::", movie)
        //     setSelectedMovie(movie);
        //     console.log('Selected movie state:', selectedMovie);
        const url = `https://localhost:44311/api/services/app/Movie/Get?Id=${row.original.id}`;
        // const deletedItem = row.cell.find(item => item == )
        const rowId = (row.original.id);
        const requestOptions =
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("error");
                    throw new Error('Error:', response.statusText);
                }
            })
            .then(data => {
                console.log("response data", data?.result);
                setSelectedMovie(data.result);

            })
            .catch(error => console.error('Error:', error.message));

    };

    if (selectedMovie) {
        return (
            <div>
                <MovieDetails movie={selectedMovie} setMovie={setMovies} onBackClick={() => setSelectedMovie(null)} />
            </div>
        );
        //   }
    };


    const handleEditSave  = async (event, id) => {
        event.preventDefault()
        try {
            // Update the movie details in the database
            const updatedMovie = {
            ...movies,
            title: newTitle,
            duration: newDuration,
            starring: newStarring,
            genre: newGenreName,
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
            setMovies(updatedMovie);
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
      }
      function editCanc(){
        setEditMode(false);
      }

    return (
        <>
            <div>
            <div className="toolbar">
  
  <button><FaHome /> Home</button>
  <button onClick={handleSignOut}><BiLogOut /> Sign out</button>
</div>
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
                            <button style={{ backgroundColor: '#e76f51', borderRadius: '5px', width: '45px', marginRight: '20px' }}><BiSave onClick={(event) => handleEditSave(event, movies.id)} style={{ color: 'white', size: '19', height: '20px' }} className='icon' /></button>
                            <button type="button" style={{ backgroundColor: '#e76f51', borderRadius: '5px', width: '45px' }} onClick={editCanc}><BiArrowBack style={{ color: 'white', size: '50', height: '20px' }} className='icon' /></button>
                        </div>
                    </form>) : (
                    <div>
                        <div>
                            <input
                                type="text"
                                placeholder="Search movie title"
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="search-bar"
                                style={{ fontWeight: 'bold' }}
                            />
                            <label htmlFor="genreFilter">Filter by genre:</label>
                            <select
                                id="genreFilter"
                                value={selectedFilter}
                                onChange={handleFilterChange}
                            >
                                <option value="">All</option>
                                {filterOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* <button onClick={handleSignOut}> Sign Out </button> */}
                        </div>
                        <table {...getTableProps()} >
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {filteredRows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* <button onClick={handleAddMovie}>Add Movie</button> */}
                        {/* <Table data={movies} columns={columns} /> */}

                        {/* {editingMovie && (
  <MovieEditForm
    movie={editingMovie}
    onSave={() => setEditingMovie(null)}
    onCancel={() => setEditingMovie(null)}
  />
)} */}
                        <PopUp
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                            handleFormSubmit={handleFormSubmit}
                        />
                        <div>
                            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {'<<'}
                            </button>{' '}
                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                            </button>{' '}
                            <button onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                            </button>{' '}
                            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'>>'}
                            </button>{' '}
                            <span>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </span>
                            <span>
                                | Go to page:{' '}
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: '50px' }}
                                />
                            </span>{' '}
                        </div>

                    </div>
                    )}
            </div>
        </>
    );
}

export default MovieTable;