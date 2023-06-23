import React from "react";
import { useEffect, useState } from "react";
import {FaSearch} from 'react-icons/fa'
import { MovieCard } from "../Component/MovieCard";



export const MainPage = ()=>{


    const[movies , setMovies] = useState([])
    const searchMoves = async ()=>{
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${nextPage}&with_watch_monetization_types=flatrate&with_userscore=6`)
        const data = await response.json()
        setMovies(data.results)
    } 

    
    const[searchTerm , setSearchTerm] = useState("")
    const [nextPage , setNextPage] = useState(1)
    useEffect(()=>{
        searchMoves("")
    },[])

    const operation = (event)=>{
        if(event.key === "Enter"){
            searchMoves(searchTerm)
        }
    }


    const changePage = ()=>{
        setNextPage(nextPage + 1)
        searchMoves()
    }

    
    // const body = document.querySelector(".app")

    // window.addEventListener("scroll", function() {
    //     var body = document.querySelector(".app");
    //     var height = body.style.height;
    //     height = height.slice(0, -2);
    //     height = Number(height);
    //     return function() {
    //         if(height - window.scrollY < 700) {
    //             height += height / 2;
    //         }
    //         body.style.height = height + "px";
    //     };
    // }());


    return (
        <div className="app">
                <div>
                    {movies?.length > 0 
                    ?
                    (<div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>)
                    : 
                    <h1 id="lost">NO MOVIE FOUND</h1>}
                </div>
                <div>
                    <button onClick={changePage}>
                        <p>change</p>
                    </button>
                </div>
        </div>
    )
}