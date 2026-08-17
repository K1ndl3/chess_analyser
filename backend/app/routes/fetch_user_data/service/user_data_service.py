import httpx

CHESS_COM_BASE_URL = "https://api.chess.com/pub/player"
USER_AGENT = "ChessProfile/1.0 (local learning project)"


def _chess_com_get(url: str) -> dict:
    response = httpx.get(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
        timeout=10,
        follow_redirects=True,
    )
    response.raise_for_status()
    return response.json()


def fetch_user_profile(username: str) -> dict:
    profile = _chess_com_get(f"{CHESS_COM_BASE_URL}/{username}")
    return {
        "name": profile.get("username"),
        "profile_pic": profile.get("avatar"),
        "league": profile.get("league"),
    }


def _current_rating(stats: dict, time_control: str):
    time_control_stats = stats.get(time_control) or {}
    last_game = time_control_stats.get("last") or {}
    return last_game.get("rating")


def fetch_user_rating(username: str) -> dict:
    stats = _chess_com_get(f"{CHESS_COM_BASE_URL}/{username}/stats")
    return {
        "blitz": _current_rating(stats, "chess_blitz"),
        "bullet": _current_rating(stats, "chess_bullet"),
        "rapid": _current_rating(stats, "chess_rapid"),
    }


def fetch_user_data(username: str) -> dict:
    return {
        "profile": fetch_user_profile(username),
        "rating": fetch_user_rating(username),
    }
