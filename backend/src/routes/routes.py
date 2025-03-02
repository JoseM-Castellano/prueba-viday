from fastapi import APIRouter, Request

from src.connection.mongo_client import peliculascol
from src.modelos.modelos import Pelicula
from src.schemas.schemas import peliculasSchema
from bson import ObjectId

router = APIRouter()

@router.get("/peliculas")
async def get_peliculas(nombre:str="",director:str="",anno:int=-1,media:float=-1):
    print("Get peliculas")
    query = {}
    if nombre != "" : query.update({"nombre" : nombre})
    if director != "" : query.update({"director" : director})
    if anno != -1 : query.update({"anno" : anno})
    if media != -1 : query.update({"media" : media})

    return peliculasSchema(peliculascol.find(query))

@router.post("/")
async def post_pelicula(pelicula: Pelicula):
    peliculascol.insert_one(dict(pelicula))

@router.put("/{id}")
async def update_pelicula(id:str, pelicula:Pelicula):
    peliculascol.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(pelicula)})

@router.delete("/{id}")
async def delete_pelicula(id:str):
    peliculascol.find_one_and_delete({"_id": ObjectId(id)})