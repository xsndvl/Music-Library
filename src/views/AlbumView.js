import { useState, useEffect } from "react"

const AlbumView = () => {
    const [ albumData, setAlbumData ] = useState([])
    useEffect(()=>{
        console.log("Album")
    })
    return(
        
        <div>
            <p>Album Data Goes Here!</p>
        </div>
    )
}

export default AlbumView