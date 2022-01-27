import { useState, useEffect } from "react"
import { useParams, Link} from "react-router-dom"

const AlbumView = () => {
    const {id} = useParams()
    const [ albumData, setAlbumData ] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/song/${id}`
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.kind === "song")
    const renderSongs = justSongs.map((song, i) => {
        return(
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })
    return(
        
        <div>
            <h2>List of Songs:</h2>
            {renderSongs}
        </div>
    )
}

export default AlbumView