import { useState } from 'react'
import './App.css'
import SearchBar from './search_bar/SearchBar'
import PlayerCard from './player_card/PlayerCard'

function App() {
  const [userRatingData, setUserRatingData] = useState()
  const [userProfileData, setProfileData] = useState()
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchData(username) {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="app-content">
        <SearchBar fetchUserRating={fetchData} isLoading={isLoading} />
        {isAvailable ? (
          <PlayerCard
            userRatingData={userRatingData}
            userProfileData={userProfileData}
          />
        ) : (
          <h3 className="empty-state">So empty...</h3>
        )}
      </div>

      {isLoading && (
        <div
          className="loading-overlay"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="loading-panel">
            <div className="spinner" aria-hidden="true" />
            <p>Fetching player…</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App
