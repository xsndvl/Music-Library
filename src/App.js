import './App.css';
import React, { useEffect, useState, useRef } from "react"
import Gallery from "./components/Gallery"
import SearchBar from "./components/SearchBar"
import { DataContext } from './context/DataContext';
import { SearchContext } from "./context/SearchContext"

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
      <h1>Welcome to the Music Library!</h1>
      <SearchContext.Provider value={{
        termRef: termRef,
        handleSearchRef: handleSearch
      }}>
        <SearchBar handleSearch={handleSearch} />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery data={data}/>
      </DataContext.Provider>
    </div>
  );
}

export default App;
