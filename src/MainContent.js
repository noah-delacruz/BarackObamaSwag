import React from 'react'
import barackObamaImage from './images/barackobama.png'
import barackObamaHandsImage from './images/barackobamahands.png'
import uziImage from './images/uzi.png'

const CLIENT_ID = "17cb48114a804f2e8f713ff46dc33453"
const CLIENT_SECRET = "561bfcb545514d6c96965f9cb2a6cb8c"

export default function MainContent() {
    // States
    // const [show, setShow] = React.useState(false)
    const [album, setAlbum] = React.useState({
        albumName: "",
        albumImage: "",
    })
    const [accessToken, setAccessToken] = React.useState("")

    // Get API access token
    React.useEffect(() => {
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    async function search() {
        console.log("Searching for " + album.albumName)

        // GET request using search to get the Artist ID
        let artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        let artistID = await fetch('https://api.spotify.com/v1/search?q=' + album.albumName + '&type=album', artistParameters)
            .then(response => response.json())
            .then(data => setAlbum(prevAlbum => ({
                ...prevAlbum,
                albumImage: data.albums.items[0].images[0].url
            })))
    }

    function handleClick() {
        console.log("clicked button!")
        // setShow(prevShow => !prevShow)
        search()
    }

    function handleChange(event) {
        setAlbum(prevAlbum => ({
            ...prevAlbum,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Search for album cover..."
                name="albumName"
                value={album.albumName}
                onChange={handleChange}
                onKeyUp={event => {
                    if(event.key === "Enter") {
                        search()
                    }
                }}
            />
            <button onClick={handleClick}>click me</button>
            <div>
                <img className="base-image" src={barackObamaImage} />
                {/* {show && <img className="overlay-image" src={uziImage} />} */}
                <img className="overlay-image" src={album.albumImage} />
                <img className="baseHands-image" src={barackObamaHandsImage} />
            </div>
        </div>
    )
}