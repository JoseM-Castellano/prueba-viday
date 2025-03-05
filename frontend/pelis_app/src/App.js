import React, {useState, useEffect} from "react"
import axios from "axios"
import ReactDOM from "react-dom/client"

const baseURL = "http://127.0.0.1:8000";

export default function App() {
    const [post, setPost] = React.useState(null);
    const [inputs, setInputs] = useState({});
    const [nuevaPeli, setNuevaPeli] = useState({});
    const [updatePeli, setUpdatePeli] = useState({});

    
  
    function consultaDefault(){
      var url = `${baseURL}/peliculas?anno=-1&media=-1`
      axios.get(url).then((response) => {
        setPost(response.data);
        console.log(response.data);
      });
    }
    
    React.useEffect(() => {
      consultaDefault();
    }, []);
  
    if (!post) return "No se ha podido recuperar la base de datos";

    const listPelis = () => {
      console.log("List pelis");
      console.log(post);
      return post.map(peli => (
        <div className="infopeli" style={{border: "5px outset blue", backgroundColor: "lightblue", textAlign: "center"}}>
          <h2>Nombre: {peli.nombre}</h2>
          <h3>Director: {peli.director}</h3>
          <h3>Año: {peli.anno}</h3>
          <h3>Nota media: {peli.media}</h3>
          <button type="button" onClick={borrarConst(peli.id)}>Borrar</button>
          <button type="button" onClick={setPeli(peli)}>Actualizar</button>
          <br></br>
        </div>
      ));
    }

    const setPeli = peli => (event) => {
      event.preventDefault();
      console.log(peli.nombre);
      setUpdatePeli(peli);
    }

    const handleUpdate = id => (event) => {
      event.preventDefault();
      axios
      .put(`${baseURL}/${updatePeli.id}`, {
        nombre: updatePeli.nombre,
        director: updatePeli.director,
        anno: updatePeli.anno,
        media: updatePeli.media
      }).then((response) => {consultaDefault()});
    }

    const borrarConst = id => (event) => {
      console.log(id);
      event.preventDefault();
      axios
      .delete(`${baseURL}/${id}`)
      .then((response) => {consultaDefault()});
    }



    const createPost = (event) => {
      var nombre = nuevaPeli.nombre;
      var director = nuevaPeli.director;
      var anno = nuevaPeli.anno;
      var media = nuevaPeli.media;
      if(nombre.length === 0){
        nombre = "";
      }
      if(director.length === 0){
        director = "";
      }
      if(anno.length === 0){
        anno = "";
      }
      if(media.length === 0){
        media = "";
      }
      console.log(nombre);
      console.log(director);
      console.log(anno);
      console.log(media);
      event.preventDefault();
      var url = `${baseURL}/`
      axios
        .post(url, {
          nombre: nombre,
          director: director,
          anno: anno,
          media: media
        })
        .then((response) => {consultaDefault()});
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      var finalUrl = "/peliculas?";
      var flag = false;
      if(inputs.nombre !== "" && inputs.nombre !== undefined){
        finalUrl =`${finalUrl}nombre=${inputs.nombre}`;
        flag = true;
      }
      if(inputs.director !== "" && inputs.director !== undefined){
        if(flag){
          finalUrl = `${finalUrl}&`;
        }
        finalUrl = `${finalUrl}director=${inputs.director}`
        flag = true;
      }
      if(inputs.anno !== "" && inputs.anno !== undefined){
        if(flag){
          finalUrl = `${finalUrl}&`;
        }
        finalUrl = `${finalUrl}anno=${inputs.anno}`
        flag = true;
      }else{
        if(flag){
          finalUrl = `${finalUrl}&`;
        }
        finalUrl = `${finalUrl}anno=-1`
        flag = true;
      }
      if(inputs.media !== "" && inputs.media !== undefined){
        if(flag){
          finalUrl = `${finalUrl}&`;
        }
        finalUrl = `${finalUrl}media=${inputs.media}`
      }else{
        if(flag){
          finalUrl = `${finalUrl}&`;
        }
        finalUrl = `${finalUrl}media=-1`
      }
      console.log({finalUrl});
      var url = `${baseURL}${finalUrl}`
      axios.get(url).then((response) => {
        setPost(response.data);
        console.log(response.data);
      });
    }

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleNueva = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setNuevaPeli(values => ({...values, [name]: value}))
    }

    const handlePut = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setUpdatePeli(values => ({...values, [name]: value}))
    }



  
    return (
      <div>
        <h1 style={{textAlign: "center",fontFamily: "Brush Script MT"}}>+Pelis</h1>
        <h3 style={{textAlign: "center"}}>Filtrar resultados</h3>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
          <label>Nombre:
          <input 
            type="text" 
            name="nombre" 
            value={inputs.nombre || ""} 
            onChange={handleChange}
          />
          </label>
          <label>Director:
            <input 
              type="text" 
              name="director" 
              value={inputs.director || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Año:
            <input 
              type="number" 
              name="anno" 
              value={inputs.anno || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Nota media:
            <input 
              type="number" 
              name="media" 
              value={inputs.media || ""} 
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Filtrar"/>
        </form>
        <div className="container">{listPelis()}</div>
        <h3 style={{textAlign: "center"}}>Añadir película </h3>
        <form onSubmit={createPost} style={{textAlign: "center"}}>
          <label>Nombre:
          <input 
            type="text" 
            name="nombre" 
            value={nuevaPeli.nombre || ""} 
            onChange={handleNueva}
          />
          </label>
          <label>Director:
            <input 
              type="text" 
              name="director" 
              value={nuevaPeli.director || ""} 
              onChange={handleNueva}
            />
          </label>
          <label>Año:
            <input 
              type="number" 
              name="anno" 
              value={nuevaPeli.anno || ""} 
              onChange={handleNueva}
            />
          </label>
          <label>Nota media:
            <input 
              type="number" 
              name="media" 
              value={nuevaPeli.media || ""} 
              onChange={handleNueva}
            />
          </label>
          <input type="submit" value="Añadir"/>
          </form>
          <h3 style={{textAlign: "center"}}>Actualizar película</h3>
          <form onSubmit={handleUpdate(updatePeli.id)} style={{textAlign: "center"}}>
            <label>Nombre:
            <input 
              type="text" 
              name="nombre" 
              value={updatePeli.nombre || ""} 
              onChange={handlePut}
            />
            </label>
            <label>Director:
              <input 
                type="text" 
                name="director" 
                value={updatePeli.director || ""} 
                onChange={handlePut}
              />
            </label>
            <label>Año:
              <input 
                type="number" 
                name="anno" 
                value={updatePeli.anno || ""} 
                onChange={handlePut}
              />
            </label>
            <label>Nota media:
              <input 
                type="number" 
                name="media" 
                value={updatePeli.media || ""} 
                onChange={handlePut}
              />
            </label>
            <input type="submit" value="Actualizar"/>
        </form>
      </div>
    );
}
