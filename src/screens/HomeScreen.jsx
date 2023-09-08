import { useState, useRef, useEffect, useCallback} from 'react';
import { useGetMoviesByIdentityQuery } from '../slices/apiSlices';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';


const HomeScreen = () => {

  //Manages the year so that a user cannot choose a year above 2023
  const currentYear = new Date().getFullYear();

  //The query string which we will use to query the OMDb API
  const [searchParam, setSearchParam] = useState('');

  //Store the url string in our session to avoid losing of data in cases of refresh or forward and backward click
  const url = sessionStorage.getItem("url") ? sessionStorage.getItem("url") : '';
  // console.log(url);
  
  
  //The RTK function making the query call to the OMDB database
  const { data, isLoading } = useGetMoviesByIdentityQuery(searchParam || url);

  //Handle movie title changes from the html input
  const [title, setTitle] = useState('');
  //Store the exact title string (example "&s=title") needed to make query to the OMDB database
  const currentTitle = useRef('');    


  //Handle movie type changes from the html input
  const [type, setType] = useState('');
  //Store the exact type string (example "&type=type") needed to make query to the OMDB database
  const currentType = useRef('')

  //Handle year of movies input from the html input
  const [year, setYear] = useState('');
  //Store the exact year string (example "&y=year") needed to make query to the OMDB database
  const currentValidYear = useRef('')

//Extract the present page incase of page reload
  const extractPageFromSession = useCallback((api) => {
  
    const apiArray = api.split('&');
    for (let i=0; i<apiArray.length; i++){
        const paramArray = apiArray[i].split('=');
        if (paramArray[0] === 'page'){
            return Number(paramArray[1]);
        }
    }
    
  }, [])
  
  // const extractPageFromSession = (api) => {
  //     const apiArray = api.split('&');
  //     for (let i=0; i<apiArray.length; i++){
  //         const paramArray = apiArray[i].split('=');
  //         if (paramArray[0] === 'page'){
  //             return paramArray[1];
  //         }
  //     }
      
  // }



  //Handle page changes from the pagination component
  const [page, setPage] = useState(extractPageFromSession(url)? extractPageFromSession(url) : 1 );
 
 
  //Store the exact page string (example "&page=page") needed to make query to the OMDB database
  const currentPage = useRef('');

  //Function to the query url in session storage
  const saveInSessionStorage = useCallback((page) => { 

    //Extract the exact page format needed to query the database
    currentPage.current = '&page='.concat(page)

    //searchString is the complete string need to query the database along with the database domain
    const searchString = process.env.REACT_APP_APIKEY + currentTitle.current?.concat(currentValidYear.current, currentType.current, currentPage.current)
    setSearchParam(searchString);

    sessionStorage.setItem("url", searchString);

  }, [])


  //The HTML form to extract the users input
  const handleSearch = (e) => {
    e.preventDefault();

    if (year < 0 || year > currentYear) {
      //stop execution if value entered by user is -negative or above 2023
      return;
    } else {
      if (year > 0 && year <= currentYear) {
        //extract the exact year string format needed to query the database
        currentValidYear.current = '&y='.concat(year);
      }
    }

    if (title !== '') {
      //Extract the exact title format needed to query the databse
      currentTitle.current = '&s='.concat(title);
    }

    if (type !== '') {
      //Extract the exact type format needed to query the databse
      currentType.current = '&type='.concat(type);
    }
    
    if (!title) {
      return;
    }

    //Call the session storage function
    saveInSessionStorage(page)

  }


  //This function handles the loading of a new page when a page value is clicked in the pagination
  const handlePageClick = useCallback((event, page) => {
    
    setPage(page)

    //Call the session storage function
    saveInSessionStorage(page);

  }, [saveInSessionStorage])

//Restore the states incase of refresh
  const restoreparamValues = useCallback(() => {

    //Fetch the url on the session storage
    const url = sessionStorage.getItem("url");

    if (url) {
      //Convert the url string into an array and loop through it to restore our states
      const urlArray = url.split('&');
      for (var i = 0; i < urlArray.length; i++){

        const paramArray = urlArray[i].split('=');

        //Update the title and currentTitle state
        if (paramArray[0] === 's') {
          setTitle(paramArray[1]);
          currentTitle.current = '&s='.concat(paramArray[1]);
        } 

        //Update the page and current page state
        if (paramArray[0] === 'page') {
          setPage(Number(paramArray[1]));
          currentPage.current = '&page='.concat(paramArray[1])
        }

        //Update the year and currentValidYear state
        if (paramArray[0] === 'y') {
          setYear(paramArray[1]);
          currentValidYear.current = '&y='.concat(paramArray[1]);
        }

        //Update the type and currentType State
        if (paramArray[0] === 'type') {
          setType(paramArray[1]);
          currentType.current = '&type='.concat(paramArray[1]);
        }
      }

      saveInSessionStorage(page)//
    }
  }, [saveInSessionStorage, page])


  
  useEffect(() => {

  // Run this function if title is false.
  if (!title && url) {
    restoreparamValues();
  }
  
  }, [searchParam, restoreparamValues, title, url])

  return (
    <div className="home">
      {isLoading && <Loader />}
      <h1 className="home-header header-1">Search For Your Favorite Movie</h1>
      <form className="search-container" onSubmit={handleSearch}>
        <div className="input-control">
          <label htmlFor="title" className='input-control-label' >Movie Title</label>
          <input required type="text" id='title' className='input-control-search input' value={title}
            onChange={e=>setTitle(e.target.value)} placeholder='enter movie title'
          />
        <p className="search-valid">{title ?(''):('* Title is required')}</p>
        </div>
        <div className="input-control">
          <label htmlFor="type" className='input-control-label'>Movie Type</label>
          <select value={type} id="type" className='input-control-id input' onChange={e=>setType(e.target.value)}>
            <option value=''>All Types</option>
            <option value='movie'>Movie</option>
            <option value='series'>Series</option>
            <option value='episode'>Episode</option>
          </select>
        </div>
        <div className="input-control">
          <label htmlFor="year" className='input-control-label' >Year</label>
          <input type="number" id='year' className='input-control-search input'
            value={year} onChange={e=>setYear(e.target.value)} placeholder='enter year'
          />
        <p className='search-valid'>{(year < 0 || year > currentYear) ? 'Invalid Year' : ''}</p>
        </div>
        <div className="submit">
          <button type='submit' disabled={!title} className={title? 'valid' : 'invalid'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </form>
      {
        data?.Error && <div className="search-total"><p style={{color: 'orangered'}}> {data.Error} </p> </div>
      }
      {
        data?.Search?.length &&
        <>
          <div>

            <div className="search-result">
              <h1 className="search-result-title header-2">Related Movies</h1>

              <div className="related-movies">
                {
                  data?.Search?.map((s) => (
                    <Card s={s} key={s.imdbID} />
                  ))
                }
              </div>
              </div>
              
          </div>
          <div className="search-total"><p>Total Related Movies: {data?.totalResults} </p> </div>
          <div className="home-pagination">
            <Pagination count={Math.ceil(data?.totalResults/10)} page={page} handlePageClick={handlePageClick} />
          </div>
        </>
      }
    </div>
  )
}

export default HomeScreen