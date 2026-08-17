import "./PlayerCard.css"

function PlayerCard({userRatingData, userProfileData}) {
    const chess_blitz = userRatingData?.blitz
    const chess_bullet = userRatingData?.bullet
    const chess_rapid = userRatingData?.rapid
    const profile_pic = userProfileData?.profile_pic
    const username = userProfileData?.name
    const league = userProfileData?.league
    return (<>
        <div className="card-container">
            <span className="profile-information">
                <img src={profile_pic} alt="profile pic of user" />
                <span className="user-header">
                    <h3 className="username">{username}</h3>
                    <h3>League: {league}</h3>
                </span>
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