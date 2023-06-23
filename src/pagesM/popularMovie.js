import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {useState , useEffect , useRef ,useCallback} from 'react'
import axios from 'axios'
import Navbar from '../Component/navbarAndDependencies/navbar'
import { MovieCard } from '../Component/MovieCard'
import Spinner from '../Component/Spinner'
import DoubleRangeSlider from '../Component/DoubleRangeSlider'
import "react-datepicker/dist/react-datepicker.css";




export default function PopularMovie() {

    const[searchBox , setSearchBox] = useState(false) 
    const [onClick , setOnClick] = useState(false)
    const [onClickOne , setOnClickOne] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [genBring, setGenBring] = useState([])
    const [selectedGenres , setSelectedGenres] = useState([])
    const [getId, setGetId] = useState([])
    const [getCerM , setGetCerM] = useState([])
    const [selectedAddCer , setSelectedAddCer] = useState([])
    const[addCerReduce ,setAddCerReduce] = useState([])
    const[popM , setPopM] = useState([])
    const [page, setPage] = useState(1)
    const [sliderValues, setSliderValues] = useState([1890, new Date().getFullYear()]) // Initial values for the slider
    let currentDay = new Date().getDate()
    let currentMonth = new Date().getMonth() + 1

    if (currentDay < 10) {
        currentDay = '0' + currentDay
    }

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
    }
    
    const BringGenres = async ()=>{
        const data1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        setGenBring(data1.data.genres)
    }

    // slider values change
    const handleSliderChange = (newValues) => {
        setSliderValues(newValues)
    }

    const handleAdd = (gen)=>{
        setSelectedGenres([...selectedGenres ,gen])
        setGenBring(genBring.filter((g)=> g.id !== gen.id ))
        setPage(1)
    }

    const handleRemove = (gen)=>{
        setGenBring([...genBring ,gen])
        setSelectedGenres(selectedGenres.filter((rem)=> rem.id !== gen.id))
        getGenIdRemove(selectedGenres)
    }

        
    const getGenIdAdd = ()=>{
        if(selectedGenres.length < 1) return 
        const GId = selectedGenres.map(i => i.id)
        const res = GId.reduce((acc,cur)=> acc+','+cur)
        setGetId([...getId ,res])
    }

    const getGenIdRemove = (sel)=>{
        setGetId(getId.filter((id)=> id === sel.id))
    }

    //certification
    const GenCertificationM = async ()=>{
        const get = await axios.get('https://api.themoviedb.org/3/certification/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e')
        setGetCerM(get.data.certifications.US)
    }


    const handleAddCer = (cer)=>{
        setSelectedAddCer([...selectedAddCer ,cer])
        setGetCerM(getCerM.filter((C)=> C.certification !== cer.certification))
    }

    const handleRemoveCer = (cer)=>{
        setGetCerM([...getCerM ,cer])
        setSelectedAddCer(selectedAddCer.filter((S)=> S.certification !== cer.certification))
        removeCerReduce(selectedAddCer)
    }

    const addReduceCer = ()=>{
        if(selectedAddCer.length < 1) return
        const select = selectedAddCer.map((C)=> C.certification)
        const done = select.reduce((acc, cur)=> acc +','+cur)
        setAddCerReduce([...addCerReduce ,done])
    }

    const removeCerReduce = (selectedAddCer)=>{
        setAddCerReduce(addCerReduce.filter((Cer)=> Cer === selectedAddCer.certification ))
    }
    
    //certification


    const popularM = async (pageNumber)=>{
        const get = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&with_genres=${getId}&certification=${addCerReduce}&primary_release_date.gte=${sliderValues[0]}-01-01&primary_release_date.lte=${sliderValues[1]}-${currentMonth}-${currentDay}&certification_country=US&page=${pageNumber}`);
        return get.data.results
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(null, args);
          }, delay);
        };
      };

    const handleScroll = debounce(() => {
        const isNearBottom =
          window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight - 500;
      
        if (isNearBottom && !isLoading) {
            setIsLoading(true)
            setPage((prevPage) => prevPage + 1);
        }
      }, 500);

      const handleGenreChange = async (selectedGenre) => {
        const initialMovies = await popularM(1);
        setPopM(initialMovies);
      
        // Update the genre ID state
        setGetId(selectedGenre);
        setPage(1); // Reset the page number to 1
      };

      const handleCertificationChange = async (selectedCertification) => {
        const initialMovies = await popularM(1);
        setPopM(initialMovies);
      
        // Update the certification state
        setSelectedAddCer(selectedCertification);
        setPage(1); // Reset the page number to 1
      };

      const handleFilterChanges = async () => {
        window.scrollTo(0, 0);
        const initialMovies = await popularM(1)
        setPopM(initialMovies)

        // calling the functions that handle filtering change
        handleCertificationChange(selectedAddCer)
        handleGenreChange(selectedGenres)
        handleSliderChange(sliderValues)
        setPage(1)
      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        const initialLoad = async () => {
          const initialMovies = await popularM(1);
          setPopM(initialMovies);
        };
      
        initialLoad();
      }, []);

    useEffect(()=>{
        BringGenres()
        GenCertificationM()
    },[])

    useEffect(() => {
        if (page > 1) {
          const fetchMovies = async () => {
            const newMovies = await popularM(page);
            setPopM((prevMovies) => [...prevMovies, ...newMovies]);
          };
      
          fetchMovies();
        }
      }, [page]);


    useEffect(()=>{
        getGenIdAdd()
    },[selectedGenres])

    useEffect(()=>{
        popularM()
    },[getId])

    useEffect(()=>{
        addReduceCer()
    },[selectedAddCer])

    useEffect(()=>{
        popularM()
    },[addCerReduce])


    return(
        <div className='main'>
            <Navbar/>
            <div className="position">
                <div className="body">
                    <div className="left-side">
                        <p className='info'>Popular Movie</p>
                        <div className="filterBox">
                            <div className="pragraph">
                                <div className="topType"></div>
                                <div onClick={()=>{setOnClickOne(!onClickOne) }} className={`firstShow ${onClickOne? 'noOpenLa' : 'openLa'}`}>
                                    <h3>Filters</h3>
                                    <HiOutlineChevronRight className='cerculate'/>
                                </div>
                                <div className={`secondShow ${onClickOne? 'openLa' : 'noOpenLa'}`}>
                                    <div id="same" onClick={()=>{setOnClickOne(!onClickOne) }}>
                                        <h3>Filters</h3>
                                        <HiOutlineChevronDown className='cerculate1'/>
                                    </div>
                                    <div className="movDate">
                                        <p id='Air-date'>Air Date</p>
                                        <DoubleRangeSlider values={sliderValues} onChange={handleSliderChange} />
                                        <div id="bottom-border"></div>
                                    </div>
                                    <div className="movGenres">
                                        <div className="denres-title">
                                            <p>Genres</p>
                                        </div>
                                        {selectedGenres && selectedGenres.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass2' onClick={()=>{handleRemove(gen)}}>
                                                {gen.name}
                                            </div>
                                        ))}
                                        {genBring.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass' onClick={()=>{handleAdd(gen)}}>
                                                {gen.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div id="bottom-border2"></div>
                                    <div className="movCertification">
                                        <div className="Certification-title">
                                            <p>Certification</p>
                                        </div>
                                        <div>
                                            {selectedAddCer.map((cer)=>(
                                                <div className='certificate2' onClick={()=>{handleRemoveCer(cer)}}>
                                                    {cer.certification}
                                                </div>
                                            ))}

                                            {getCerM.map((cer)=>(
                                                <div className='certificate' onClick={()=>{handleAddCer(cer)}}>
                                                    {cer.certification}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="distance"></div>
                                </div>
                                <div className="searchBTN" onClick={handleFilterChanges}>
                                    <p id='search-click'>Search</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className='app'>
                            <div className='container'>
                                {popM.length> 0 && popM.map((M)=>{
                                        return  <MovieCard movie={M}/>
                                })}
                                {/* {isLoading && <Spinner />} */}
                            </div>           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}