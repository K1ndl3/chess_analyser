import { useState } from "react"
import "./SearchBar.css"
function SearchBar({fetchUserRating, isLoading}) {
    const [username, setUsername] = useState("")

    const handleClick = (event) => {
        event.preventDefault()
        if (isLoading) return
        fetchUserRating(username)
        setUsername("")
    }

    return (
        <>
        <form className="search-bar" onSubmit={handleClick}>
            <input type="text" 
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    disabled={isLoading}
            />
            <button
                className="search-btn"
                type="submit"
                disabled={isLoading}
            >Enter</button>
        </form>
        </>
    )
}

export default SearchBar