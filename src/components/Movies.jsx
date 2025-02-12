import React, { useEffect, useState } from "react";
import { chunk } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

function Movies() {
  var [isLoading, setLoading] = useState(true);
  var [moviesList, setMovieList] = useState([[]]);
  var [pg, setpg] = useState(0);
  var [isDisabled,setDisable]=useState(false)
  function increment(){
    setpg(pg+1)
  }
  function decrement(){
    setpg(pg-1)
  }
  useEffect(() => {

    var movieList=JSON.parse(localStorage.getItem("movies"))
    if(!movieList){
    const url = "https://imdb236.p.rapidapi.com/imdb/most-popular-movies";
    const options = {
      method: "GET",
      headers: {
        'x-rapidapi-key': 'a47838846amsh25cf565f9b2b67ep1af018jsn8b35bed5261d',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
      },
    };

    fetch(url, options)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        data = chunk(data, 14);
        setLoading(false);
        localStorage.setItem("moviesList", data);
        setMovieList(data);
      });
    }else{
      setLoading(false);
      setMovieList(movieList)
    }
  }, []);

  useEffect(()=>{
   if(pg===0)
    setDisable(true)
  else
    setDisable(false) 
  })

  return (
    <>
    <main className="flex flex-wrap">
      {moviesList[pg].map((movie) => (
        <section
          key={movie.id}
          className="rounded-lg bg-cover bg-center shadow-xl border m-4 h-50 w-40 font-bold flex justify-center items-end hover:scale-110 duration-300 hover:cursor-pointer"
          style={{ backgroundImage: `url(${movie.primaryImage})`}}
        >
          
          <div className="w-full rounded-lg text-white text-center bg-blue-500 bg-opacity-50 p-4 p-4" style={{
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
            }}>{movie.originalTitle}</div>
        </section>
      ))}
    </main>
    
    <footer className="flex justify-between p-4">
        <button disabled={isDisabled} onClick={decrement}
        className={`mt-4 w-20 p-2 rounded ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
     >Previous</button>
        <div className="flex text-center items-center">{pg+1}</div><button
        className="mt-4 w-20 p-2 rounded bg-blue-500 hover:bg-blue-700  text-white" onClick={increment}
     >Next</button>
     </footer>
    </>
  );
}

export default Movies;
