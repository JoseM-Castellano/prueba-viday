# Prueba Viday (+Pelis)

Se ha creado el programa según el enunciado enviado.

## Features

- Backend creado con FastAPI
- Base de datos MongoDB
- Frontend creado con React JS
- Imagen Docker del frontend

Desafortunadamente no se ha podido crear un contenedor para el backend debido a que no he conseguido conectarlo con la base de datos.


## Instrucciones de intalación

Pre-requisitos: Python y node.js instalados
Primero se instala el backend. Se necesita tener python instalado. Se crea un entorno virtual de python y se accede a él.

```sh
cd backend
python -m venv venv
source venv/scripts/activate
```
Una vez en el entorno virtual se instalan las dependencias mediante pip. El archivo requirements.txt contiene las dependencias.
```sh
pip install --no-cache-dir --upgrade -r ./requirements.txt
```
Finalmente se inicializa el servidor de uvicorn.
```sh
uvicorn src.index:app --reload
```
Si los puertos del backend y la base de datos se hubieran podido conectar correctamente las instrucciones de instalación serían distintas. Primero se generaría la imagen mediante el dockerfile y luego se ejecutaría en un contenedor.
```sh
docker build --tag backend .
docker run --name back -p 8000:80 backend
```
\
Para el frontend no basta más que crear la imagen mediante el dockerfile
```sh
//Desde la raíz
cd frontend/pelis_app
docker build --tag frontend .
docker run --name front -p 3000:3000 frontend
```
El proceso es muy largo. Puede llevar entre 10-15 minutos.
Si no se quisiera utilizar docker. La opción manual es la siguiente:
```sh
//Desde la raíz
cd frontend/pelis_app
//Instala dependencias leyendo package.json y package-lock.json
npm install
npm start
```
\
Si funcionaran los dos dockerfile sería tan sencillo como leer desde la raíz el docker compose.
```sh
docker compose up
```