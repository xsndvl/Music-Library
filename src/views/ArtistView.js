import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const ArtistView = () => {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)

        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === "Album")
    console.log(justAlbums)
    const renderAlbums = justAlbums.map((album, i) => {
        return(
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })
    console.log("render albums")
    console.log(renderAlbums)

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        )
    }

    return(
        <div>
            {navButtons()}
            <h2>List of Albums:</h2>
            {renderAlbums}
        </div>
    )
}

export default ArtistView