import React, { useEffect, useState } from 'react';
import MoviesTable from './components/MoviesTable/index'
import { useQuery } from '@apollo/client';
import { GET_ALL_MOVIES } from './components/MoviesTable/queries'
import Tabs from './components/Tabs/index'

const App = () => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES)
  const [allMovies, setAllMovies] = useState()


  useEffect(() => {
    if (!loading) {
      setAllMovies(data.movies)
    }
    if(error){
      console.log(error)
    }
  }, [data])

  const parsedMovies = allMovies ? allMovies.map((movie, index) => (
    <div key={index}>{movie.name}</div>)
  ) : null

  return (
    <div>
      <Tabs/>
    </div>
  );
}

export default App;
