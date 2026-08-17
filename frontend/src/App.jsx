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
    const trimmedUsername = username.trim()
    if (!trimmedUsername) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `http://localhost:8000/users/user_stats/${encodeURIComponent(trimmedUsername)}`
      )
      if (!response.ok) {
        setIsAvailable(false)
        return
      }

      const data = await response.json()
      setProfileData(data.profile)
      setUserRatingData(data.rating)
      setIsAvailable(true)
    } catch (error) {
      console.log("error fetching: " + error)
      setIsAvailable(false)
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
