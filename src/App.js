import './App.css';
import "./movieCard.css"
import './ResponsiveStyles/SearchResultResponsive.css'
import './ResponsiveStyles/Movie&TvPage-Responsive.css'
import './ResponsiveStyles/Navbar_Responsive.css'
import './Component/PeopleList.css'
import './Component/PersonDetails.css'
import { MainPage } from './pagesM/MainPage';
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom'
import PopularMovie from './pagesM/popularMovie';
import PeopleList from './Component/PeopleList';
import Details from './Component/movieCardExpand/details';
import SearchBoxN from './Component/navbarAndDependencies/searchBoxN';
import SearchBoxResultsPage from './Component/searchBoxResults/searchBoxResultsPage';
import ErrorPage from './ErrorPage';
import Popular from './Component/Popular';
import PersonDetails from './Component/PersonDetails';
import Navbar from './Component/navbarAndDependencies/navbar';
import { useEffect, useState } from 'react';
import NewPlayingMovie from './pagesM/NowPlayingMovie';
import TopRatingMovie from './pagesM/TopRatingMovie';
import UpComingMovie from './pagesM/UpComingMovie';
import PopularTv from './pagesT/PopularTv';
import DetailsT from './Component/TvCardExpend/DetailsT';
import { useRef } from 'react';
import AiringTvShow from './pagesT/AiringTodayTv';
import TopRatedTv from './pagesT/TopRatedTv';
import OnTheAirTv from './pagesT/OnTheAirTv';
import ShowResultsT from './Component/searchBoxResults/ShowResultsT';

function App() {

  const [getSearchResult , setGetSearchResult] = useState([])
  
  const getData = (get)=>{
    setGetSearchResult(get)
    console.log(get)
  }

  const ref2 = useRef()

  return (
    <div className="App">
      <Router>
      <Navbar/>
        <SearchBoxN setGetSearchResult={setGetSearchResult} getSearchResult={getSearchResult} getData={getData}/>
        <Routes ref={ref2}>
          <Route path='/' element={<MainPage/>} />
          <Route path='/pagesM/popularMovie' element={<PopularMovie/>} />
          <Route path='/pagesM/nowPlayingMovie' element={<NewPlayingMovie/>}/>
          <Route path='/pagesM/TopRatingMovie' element={<TopRatingMovie/>}/>
          <Route path='/popular' element={<Popular/>} />
          <Route path='/pagesM/UpComingMovie' element={<UpComingMovie/>}/>
          <Route path='/pagesT/PopularTv' element={<PopularTv/>}/>
          <Route path='pagesT/AiringTodayTv' element={<AiringTvShow/>}/>
          <Route path='/pagesT/OnTheAirTv' element={<OnTheAirTv/>}/>
          <Route path='/pagesT/TopRatedTv' element={<TopRatedTv/>}/>
          <Route path='/DetailsT/:tvId' element={<DetailsT/>}/>
          <Route path='/details/:movieId' element={<Details/>} />
          <Route path='/popular/:personId' element={<PersonDetails/>} />
          <Route path='/searchBoxN' element={<SearchBoxN />}/>
          <Route path='/searchBoxResultsPage' element={<SearchBoxResultsPage getSearchResult={getSearchResult}/>}/>
          <Route path='/popular' element={<Popular/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
  