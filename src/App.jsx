import { useState } from 'react'
import './App.css'
import SearchBar from './search_bar/SearchBar'
import PlayerCard from './player_card/PlayerCard'

function App() {
  const [userRatingData, setUserRatingData] = useState()
  const [userProfileData, setProfileData] = useState()
  const [isAvailable, setIsAvailable] = useState(false)
  // define the call here
  async function fetchData(username) {
    try {
      const stats = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
      const stats_data = await stats.json()
      setUserRatingData(stats_data)
      console.log(stats_data)

      const profile = await fetch(`https://api.chess.com/pub/player/${username}`)
      const profile_data = await profile.json()
      setProfileData(profile_data)
      console.log(profile_data)

      setIsAvailable(true)
    } catch (error) {
      console.log("error fetching: " + error)
    }
  }

  return (
    <>
     <SearchBar fetchUserRating={fetchData} ></SearchBar>
     {isAvailable ? (<PlayerCard 
        userRatingData={userRatingData} userProfileData={userProfileData}></PlayerCard>) : (
          <h3>
            So empty...
          </h3>
     )}
    </>
  )
}

export default App
