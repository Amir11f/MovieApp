import React, { useContext, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ResultContext from '../contextThings'
import ResultContext2 from '../contextTings2'

function SearchBoxN({searchBox ,setSearchBox}) {

    const [getSearch ,setGetSearch] = useState('')
    const [getResult , setGetResult] = useContext(ResultContext)

    const searchMovie = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&query=${getSearch}&page=1&include_adult=false`)
        setGetResult(get.data.results)
        console.log(get)
    }

    const [getTvResult , setgetTvResult] = useContext(ResultContext2)
    const searchTv = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1&query=${getSearch}&include_adult=false`)
        setgetTvResult(get.data.results)
        console.log(get)
    }

    // const operation1 = ()=>{
    //     if(getSearch === '') {return alert('please search somthing')}
    //     else{
    //         searchTv()
    //         searchMovie()
    //     }

    // }

    
    // const onClickSearch = ()=>{
    //     searchMovie()
    //     searchTv() 
    // }
    console.log(getSearch);
    console.log(getResult)
    console.log(getTvResult)

    const searchBoxRef = useRef()

    useEffect(()=>{
        let handler = (event)=>{
            if(!searchBoxRef.current.contains(event.target)){
                   setSearchBox(false)
                   console.log(searchBox)
            }
        } 
        document.addEventListener('mousedown' ,handler)

        return()=>{document.removeEventListener('mousedown', handler)} 
    })

    const keyOperation = (e)=>{
        if(e.key === 'Enter'){
            searchMovie()
            searchTv()
            forceNavigate('/searchBoxResultsPage')
        }
    }

    const onClickOperation = ()=>{
        searchMovie()
        searchTv()
    }

    const forceNavigate = useNavigate()

  return (
    <div className={`type ${searchBox? 'openSearch' : 'closeSearch'}`} ref={searchBoxRef}>
            <div className="inType">
                <div className="inTypeInput">
                    <input placeholder='search for a movie, tv show'className='input1' type='text' onChange={(e)=>{setGetSearch(e.target.value)}} value={getSearch} />
                </div>
                <div className="inTypeIcon">
                    {/* <Link to={'/searchBoxResultsPage'} ><FaSearch className='inTypeIcon1' onClick={()=>{onClickSearch() ;setGetSearch('')}}/></Link> */}
                    <Link to={'/searchBoxResultsPage'} ><FaSearch className='inTypeIcon1' onKeyPress={keyOperation} onClick={onClickOperation}/></Link>
                </div>
            </div>
        </div>
  )
}

export default SearchBoxN