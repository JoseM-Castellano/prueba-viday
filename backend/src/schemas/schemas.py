#Convierte los modelos en listas y diccionarios
from src.modelos.modelos import Pelicula

def peliculaSchema(modelo) -> dict:
    diccionario = {
        "id": str(modelo["_id"]),
        "nombre": modelo["nombre"],
        "director": modelo["director"],
        "anno": modelo["anno"],
        "media": modelo["media"]
    }
    return diccionario

def peliculasSchema(peliculas) -> list:
    return [peliculaSchema(pelicula) for pelicula in peliculas]