import React, { useEffect, useState } from "react";
import { chunk } from "lodash";

function Movies() {
  var [isLoading, setLoading] = useState(true);
  var [moviesList, setMovieList] = useState([[]]);
  var [pg, setpg] = useState(0);
  var [isDisabled,setDisable]=useState(false)
  var [Watchlist, setWatchlist] = useState([]);
  var dummyMovies= new Array( 14 )
  function increment(){
    setpg(pg+1)
  }
  function decrement(){
    setpg(pg-1)
   
  }
  useEffect(() => {

    var movieList=JSON.parse(localStorage.getItem("moviesList"))
    if(!movieList){
    const url = "https://imdb236.p.rapidapi.com/imdb/most-popular-movies";
    const options = {
      method: "GET",
      headers: {
        'x-rapidapi-key': '2c087856ddmshdd7745aca84366dp168235jsn3612a1d9762b',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      },
    };

    fetch(url, options)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        data = chunk(data, 14);
        console.log(data)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setLoading(false);
        localStorage.setItem("moviesList", JSON.stringify(data));
        setMovieList(data);
      });
    }else{
      setTimeout(() => {
      setLoading(false);
    }, 2000);
      setMovieList(movieList)
    }
  }, []);

  useEffect(()=>{
   if(pg===0)
    setDisable(true)
  else
    setDisable(false) 
  
  })

  function isFavorite(movieId) {
    var watchlist=JSON.parse(localStorage.getItem("Watchlist"))
    if(watchlist){
      return watchlist.some((movie)=>movie.id===movieId)
    }else{
      return false
    }
  }

  if(isLoading){
    return (
      <main className="flex flex-wrap justify-evenly">
      {moviesList[pg].map((movie,index) => (
        <section
          key={index}
          className="rounded-lg bg-cover bg-emerald-900 bg-center shadow-xl border m-4 h-50 w-40 font-bold flex justify-center items-end hover:scale-110 duration-300 hover:cursor-pointer animate-pulse"
          
        >
        </section>
      ))}
    </main>
    )
  }

  return (
    <>
    <main className="flex flex-wrap justify-evenly">
      {moviesList[pg].map((movie) => (
        <section
          key={movie.id}
          className="group relative rounded-lg bg-cover bg-center shadow-xl border m-4 h-50 w-40 font-bold flex justify-center items-end hover:scale-110 duration-300 hover:cursor-pointer"
          style={{ backgroundImage: `url(${movie.primaryImage})`}}
          
        >
          <div className="absolute top-1 right-1 flex items-center justify-center w-10 h-10 bg-gray-400 rounded-lg text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isFavorite(movie.id) ?"❤️" :"🤍"}
            </div>
          
          <div className="w-full rounded-lg text-white text-center bg-blue-500 bg-opacity-50 p-4 p-4" style={{
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
            }}>{movie.originalTitle}</div>
            
        </section>
      ))}
    </main>
    
    <footer className="flex justify-between p-4">
        <button disabled={isDisabled} onClick={decrement}
        className={`mt-4 w-20 p-2 rounded ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-700'} text-white`}
     >Previous</button>
        <div className="flex text-center items-center text-white font-bold">{pg+1}</div><button
        className="mt-4 w-20 p-2 rounded bg-emerald-500 hover:bg-emerald-700  text-white" onClick={increment}
     >Next</button>
     </footer>
    </>
  );
}

export default Movies;
