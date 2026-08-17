from fastapi import APIRouter, HTTPException
import httpx

from app.routes.fetch_user_data.service.user_data_service import fetch_user_data

router = APIRouter(prefix="/users", tags=["user_stats"])


@router.get("/user_stats/{username}")
def get_user_stats(username: str):
    try:
        return fetch_user_data(username)
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Player not found") from exc
        raise HTTPException(status_code=502, detail="Chess.com API error") from exc
    except httpx.RequestError as exc:
        raise HTTPException(status_code=502, detail="Could not reach Chess.com") from exc
