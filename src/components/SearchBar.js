import React, { useContext } from "react"
import { SearchContext } from "../context/SearchContext"

function SearchBar(){
    const {termRef, handleSearchRef} = useContext(SearchContext)
    return(
        <div>
            <form>
                <input 
                type="text" 
                placeholder="Enter a search here"
                ref={termRef}
                />
                <button onClick={(e) => handleSearchRef(e, termRef.current.value)}>Submit</button>
            </form>
        </div>
    )
}

export default SearchBar