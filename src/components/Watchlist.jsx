import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons/faFilterCircleXmark";

function Watchlist() {
    var [Watchlist, setWatchlist] = useState([]);
    var [movieascending, setmovascend] = useState(false);
    var [moviedescending, setmovdescent] = useState(false);
    var [movieunsorted, setmovUnsort] = useState(true);
    var [ratingascending, setRateascend] = useState(false);
    var [ratingdescending, setRatedescent] = useState(false);
    var [ratingunsorted, setRateUnsort] = useState(true);
    var [filterSelected, setFilterSel] = useState(false)
    var [genres, setGenre] = useState([])
    var [searchflag, setSearchflag] = useState(false)
    useEffect(() => {
        setWatchlist(JSON.parse(localStorage.getItem("Watchlist")))
    }, [])

    function handleDelete(movieID) {
        var movies = JSON.parse(localStorage.getItem("Watchlist"))
        movies = movies.filter((movie) => { return movie.id != movieID })
        setWatchlist(movies)
        localStorage.setItem("Watchlist", JSON.stringify(movies))
    }

    function sortMovie() {

        // console.log(JSON.stringify(Watchlist))
        var watched = [...Watchlist]


        if (movieunsorted) {
            var newWatchlist = watched.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            setmovUnsort(false);
            setmovascend(true);
        }
        if (movieascending) {
            var newWatchlist = watched.sort((a, b) => {
                return b.title.localeCompare(a.title)
            })
            setmovascend(false);
            setmovdescent(true)
        }
        if (moviedescending) {

            var newWatchlist = JSON.parse(localStorage.getItem("Watchlist"))
            setmovdescent(false)
            setmovUnsort(true)
        }
        setWatchlist(newWatchlist)
    }

    function sortRating() {

        // console.log(JSON.stringify(Watchlist))
        var watched = [...Watchlist]
        if (ratingunsorted) {
            var newWatchlist = watched.sort((a, b) => {
                return a.avgRating - b.avgRating
            })
            setRateUnsort(false);
            setRateascend(true)
        }
        if (ratingascending) {
            var newWatchlist = watched.sort((a, b) => {
                return b.avgRating - a.avgRating
            })
            setRateascend(false);
            setRatedescent(true);
        }
        if (ratingdescending) {
            var newWatchlist = JSON.parse(localStorage.getItem("Watchlist"))
            setRatedescent(false);
            setRateUnsort(true);
        }
        setWatchlist(newWatchlist)
    }

    function fetchGenre() {
        var movies = JSON.parse(localStorage.getItem("Watchlist"))
        var genre = []
        movies.forEach((movie) => {
            genre = ([...genre, ...movie.genres])
        })
        genre = new Set(genre);
        genre = [...genre]
        setGenre(genre)
    }

    function handleFilterSelect() {
        if (filterSelected) {
            setWatchlist(JSON.parse(localStorage.getItem("Watchlist")))
            setFilterSel(false);
        } else {
            fetchGenre()
            setFilterSel(true);
        }
    }
    function handleSelectedOption(e) {
        var selected = e.target.value
        console.log(e.target)
        var filterMovies = JSON.parse(localStorage.getItem("Watchlist"))

        if (selected !== "all") {
            filterMovies = filterMovies.filter((movie) => {
                return movie.genres.includes(selected)
            })
        }
        setWatchlist(filterMovies)
    }


    function handleSearch(e) {
        var text = e.target.value
        var movies = JSON.parse(localStorage.getItem("Watchlist"))
        if (text) {
            var filtered = movies.filter((movie) => (
                movie.title.toLowerCase().includes(text.toLowerCase())
            ))
            if (filtered.length!==0) {
                movies = filtered
                setSearchflag(false)
            } else {
                setSearchflag(true)
            }

        }else{
            setSearchflag(false)

        }

        setWatchlist(movies)

    }

    if (Watchlist.length === 0) {
        if (!searchflag)
            return (

                <div className="bg-emerald-800 flex items-center  justify-center  w-full h-[100vh]">
                    <div className="font-bold text-xl text-white">No Watchlisted movies</div>
                </div>
                )
    }
    return (
        <div className="bg-emerald-800">
            <div className="flex justify-end align-end">
                {filterSelected ?
                    <>
                        <FontAwesomeIcon onClick={handleFilterSelect} className="text-white p-2 m-1" icon={faFilterCircleXmark} />
                        <select onChange={handleSelectedOption} className="bg-white-50 border border-emerald-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[10%] p-2 m-1 dark:bg-emerald-700 dark:border-emerald-600 dark:placeholder-emerald-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >

                            <option value="all">All</option>
                            {
                                genres.map((genre) =>
                                    <option key={genre} value={genre}>{genre}</option>
                                )
                            }
                        </select>
                    </>
                    :
                    <FontAwesomeIcon onClick={handleFilterSelect} className="text-white p-2 m-1" icon={faFilter} />
                }
                <input type="text" className="bg-white border-emerald-300 m-1 focus-within:outline-2 p-1 focus-within:outline-red-600 focus:ring-blue-500 focus:border-blue-500 text-emerald-800 focus:bg-white-500 rounded-lg" placeholder="Search Movies" onChange={handleSearch}></input>
            </div>
                <div className="relative overflow-x-auto shadow-md">
                {searchflag ?
                <div className="bg-emerald-800 flex items-center  justify-center  w-full h-[100vh]">
                <div className="font-bold text-xl text-white">No Movies to search</div>
            </div> :
                    <table className="w-full text-sm text-left rtl:text-right text-emerald-900 dark:text-emerald-800">
                        <thead className="text-lg text-emerald-700 uppercase bg-emerald-50 dark:bg-emerald-700 dark:text-emerald-400">
                            <tr className="text-center">
                                <th>Title
                                    {
                                        movieunsorted ?
                                            <FontAwesomeIcon onClick={sortMovie} className="text-white px-2" icon={faSort} />
                                            : movieascending ?
                                                <FontAwesomeIcon onClick={sortMovie} className="text-white px-2" icon={faCaretUp} />
                                                :
                                                <FontAwesomeIcon onClick={sortMovie} className="text-white px-2" icon={faCaretDown} />
                                    }
                                </th>

                                <th>Movie</th>
                                <th>Genre(s)
                                </th>
                                <th>Average Rating

                                    {
                                        ratingunsorted ?
                                            <FontAwesomeIcon onClick={sortRating} className="text-white px-2" icon={faSort} />
                                            : ratingascending ?
                                                <FontAwesomeIcon onClick={sortRating} className="text-white px-2" icon={faCaretUp} />
                                                :
                                                <FontAwesomeIcon onClick={sortRating} className="text-white px-2" icon={faCaretDown} />
                                    }
                                </th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Watchlist.map(
                                (movie) => (

                                    <tr key={movie.id} className="text-center bg-white border-b dark:bg-emerald-800 dark:border-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-600 justify-center">
                                        <td className="px-6 py-4 text-white">{movie.title}</td>
                                        <td className="px-6 py-4 ">
                                            <img className="mx-auto w-40 h-50 p-2 m-2 rounded-xl object-center" src={movie.image} alt="" />
                                        </td >
                                        <td className="px-6 py-4 text-white">{movie.genres.join(", ")}</td>
                                        <td className="px-6 py-4 text-white">{movie.avgRating}</td>
                                        <td>
                                            <button className="px-6 py-4 text-red-500" onClick={() => { handleDelete(movie.id) }}>Delete</button>
                                        </td>

                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
}
                </div>
            
        </div>

    )
}

export default Watchlist