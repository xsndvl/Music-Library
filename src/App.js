import './App.css';
import React, { useEffect, useState, useRef } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Gallery from "./components/Gallery"
import SearchBar from "./components/SearchBar"
import { DataContext } from './context/DataContext';
import { SearchContext } from "./context/SearchContext"
import AlbumView from './views/AlbumView';
import ArtistView from './views/ArtistView';
import { render } from "react-dom"

function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let termRef = useRef("")

  let fetchURL = "https://itunes.apple.com/search?term="

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(fetchURL + term.replace(" ", "%"))
      const resData = await response.json()
      console.log("this is resData: " + resData)
      if(resData.results.length > 0){
        setData(resData.results)
      } else {
        setMessage("Not Found")
      }
    }
    fetchData()
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
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                <Gallery data={data}/>
              </DataContext.Provider>
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
