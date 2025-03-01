from fastapi import FastAPI

app = FastAPI()

print("Hola desde index")

@app.get("/")
def read_root():
    return {"Hello": "World"}
