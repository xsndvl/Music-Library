import './App.css';
import React, { useEffect, useState, useRef, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Gallery from "./components/Gallery"
import SearchBar from "./components/SearchBar"
import { DataContext } from './context/DataContext';
import { SearchContext } from "./context/SearchContext"
import AlbumView from './views/AlbumView';
import ArtistView from './views/ArtistView';
import { createResource as fetchData } from "./helper"
import { render } from '@testing-library/react';

function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [term, setTerm] = useState("")
  let [data, setData] = useState(null)
  let termRef = useRef("")


  useEffect(() => {
    let fetchURL = "https://itunes.apple.com/search?term="
    if (term){
      setData(fetchData(term))
      document.title = `${term} Music`
      const fetchData = async () => {
        const response = await fetch(fetchURL + term)
        const resData = await response.json()
        if(resData.results.length > 0){
          setData(resData.results)
        } else {
          setMessage("Not Found")
        }
      }
      fetchData()
    }
  }, [term])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setTerm(term)
  }

  const renderGallery = () => {
    if(data){
      return(
        //suspense and context here
        
        <Suspense fallback={<h1>Loading...</h1>}>
        <DataContext.Provider value={data}>
          <Gallery data={data}/>
        </DataContext.Provider>
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      {message}
      
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Welcome to the Music Library!</h1>
              <SearchContext.Provider value={{
                termRef: termRef,
                handleSearchRef: handleSearch
              }}>
                <SearchBar handleSearch={handleSearch} />
                {renderGallery}
              </SearchContext.Provider>


            </div>
          }/>
          <Route path="/album/:id" element={<AlbumView />}/>
          <Route path="/artist/:id" element={<ArtistView />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
