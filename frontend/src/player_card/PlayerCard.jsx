import "./PlayerCard.css"

function PlayerCard({userRatingData, userProfileData}) {
    const chess_blitz = userRatingData?.chess_blitz?.last?.rating
    const chess_bullet = userRatingData?.chess_bullet?.last?.rating
    const chess_rapid = userRatingData?.chess_rapid?.last?.rating
    const profile_pic = userProfileData?.avatar
    const username = userProfileData?.username
    const league = userProfileData?.league
    return (<>
        <div className="card-container">
            <span className="profile-information">
                <img src={profile_pic} alt="profile pic of user" />
                <h3>League: {league}</h3>
            </span>
            <span className="stats">
                <h3>blitz: {chess_blitz}</h3>
                <h3>bullet: {chess_bullet}</h3>
                <h3>rapid: {chess_rapid}</h3>
            </span>
        </div>
    </>)
}

export default PlayerCard