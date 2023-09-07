import { useState, useRef, useEffect} from 'react';
import { useGetMoviesByIdentityQuery } from '../slices/apiSlices';
import Card from '../components/Card';
import Pagination from '../components/Pagination';



const HomeScreen = () => {

  const currentYear = new Date().getFullYear();

  const [searchParam, setSearchParam] = useState('')

  // const apiKey = '?i=tt3896198&apikey=4d147704';
  // console.log('DATAAAPIKEY: ', process.env.REACT_APP_APIKEY);
  

  const {data, isLoading} = useGetMoviesByIdentityQuery(searchParam);

  //Handle movie title
  const [title, setTitle] = useState('');
  const currentTitle = useRef('');

  //Handle movie type
  const [type, setType] = useState('')
  const currentType = useRef('')

  //Handle year of movies' production
  const [year, setYear] = useState('');
  const currentValidYear = useRef('')

  //Handle page navigation
  const [page, setPage] = useState(1);
  const currentPage = useRef('')

  const handleSearch = (e) => {
    e.preventDefault();

    // let validTitle = '';
    // let validYear = '';
    // let validType = '';
    // let validPage = '';

    if (year < 0 || year > currentYear) {
      return;
    } else {
      if (year > 0 && year <= currentYear) {
        // validYear = '&y='.concat(year);
        currentValidYear.current = '&y='.concat(year);
      }
    }

    if (title !== '') {
      // validTitle = '&s='.concat(title);
      currentTitle.current = '&s='.concat(title);
    }

    if (type !== '') {
      // validType = '&type='.concat(type);
      currentType.current = '&type='.concat(type);
    }
    
    if (!title) {
      return;
    }

    // validPage = '&page='.concat(page)
    currentPage.current = '&page='.concat(page)

    // console.log('CURRENTITTLE: ', currentTitle)
   
    setSearchParam(process.env.REACT_APP_APIKEY + currentTitle.current?.concat(currentValidYear.current, currentType.current, currentPage.current));
    // console.log(process.env.REACT_APP_APIKEY + currentTitle.current?.concat(currentValidYear.current, currentType.current, currentPage.current));
  }

  const handlePageClick = (event, page) => {
    setPage(page)
    currentPage.current = '&page='.concat(page);
    setSearchParam(process.env.REACT_APP_APIKEY + currentTitle.current?.concat(currentValidYear.current, currentType.current, currentPage.current));
    // console.log(searchParam)
    // console.log(page)

  }
  
  useEffect(() => {
  }, [searchParam, page])

  return (
    <div className="home">
      <h1 className="home-header">Search For Your Favorite Movie</h1>
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
        {isLoading && <div className="search-total"><p>  loading...</p> </div>}
      </form>
      {
        data?.Search?.length &&
        <>
          <div>
            <div className="search-total"><p>Total Related Movies: {data?.totalResults} </p> </div>

            <div className="search-result">
              <h1 className="search-result-title">Related Movies</h1>

              <div className="related-movies">
                {
                  data?.Search?.map((s) => (
                    <Card s={s} key={s.imdbID} />
                  ))
                }
              </div>
              </div>
              
          </div>
          <div className="home-pagination">
            <Pagination count={Math.ceil(data?.totalResults/10)} page={page} handlePageClick={handlePageClick} />
          </div>
        </>
      }
    </div>
  )
}

export default HomeScreen