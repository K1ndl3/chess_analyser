import { useState } from "react"
import "./SearchBar.css"
function SearchBar({fetchUserRating}) {
    const [username, setUsername] = useState("")

    const handleClick = (event) => {
        event.preventDefault()
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
            />
            <button
                className="search-btn"
                type="submit"
            >Enter</button>
        </form>
        </>
    )
}

export default SearchBar