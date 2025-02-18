import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

function Watchlist() {
    var [Watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        setWatchlist(JSON.parse(localStorage.getItem("Watchlist")))
    }, [])

    function handleDelete(movieID) {
        var movies = JSON.parse(localStorage.getItem("Watchlist"))
        movies = movies.filter((movie) => { return movie.id != movieID })
        setWatchlist(movies)
        localStorage.setItem("Watchlist", JSON.stringify(movies))
    }

    function sortMovie(){
        
        console.log(JSON.stringify(Watchlist))
        var watched= [...Watchlist]
        var newWatchlist= watched.sort((a,b)=>{
            return a.avgRating-b.avgRating
        })
        setWatchlist(newWatchlist)
    }

    function sortRating(){
        
        console.log(JSON.stringify(Watchlist))
        var watched= [...Watchlist]
        var newWatchlist= watched.sort((a,b)=>{
            return a.title.localeCompare(b.title)
        })
        setWatchlist(newWatchlist)
    }

    if (Watchlist.length === 0) {
        console.log(Watchlist)
        return (

            <div className="bg-emerald-800">
                <div>No data</div>
            </div>)
    }
    return (
        <div className="bg-emerald-800">
            <div className="flex justify-end align-end">
                <FontAwesomeIcon className="text-white p-2 m-1" icon={faFilter} />
                <FontAwesomeIcon className="text-white p-2 m-1" icon={faMagnifyingGlass} />
            </div>
            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-sm text-left rtl:text-right text-emerald-900 dark:text-emerald-800">
                    <thead className="text-lg text-emerald-700 uppercase bg-emerald-50 dark:bg-emerald-700 dark:text-emerald-400">
                        <tr className="text-center">
                            <th>Title
                            <button  onClick={sortMovie}><FontAwesomeIcon className="text-white px-2" icon={faSort}/></button></th>
                            <th>Movie</th>
                            <th>Genre(s)
                            </th>
                            <th>Average Rating
                            <FontAwesomeIcon onClick={sortMovie} className="text-white px-2" icon={faSort} />
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
            </div>
        </div>

    )
}

export default Watchlist