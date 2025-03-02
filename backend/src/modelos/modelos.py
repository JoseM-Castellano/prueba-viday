from pydantic import BaseModel
from bson import ObjectId

#Clase para definir los modelos
class Pelicula(BaseModel):
    nombre: str
    director: str
    anno: int
    media: float

    def __getitem__(self, item):
        return getattr(self, item)