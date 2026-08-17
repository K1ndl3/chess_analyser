from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.fetch_user_data.fetch_user_data import router as fetch_user_data_router


app = FastAPI(title="Chess Profile API")

app.include_router(fetch_user_data_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello_world():
    return {"message": "hello world"}
