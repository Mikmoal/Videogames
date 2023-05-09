import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getId } from "../../redux/actions";
import loading from "../../loading.gif";

function renderizarDetail(videogame) {
  //console.log("se ejecuta renderizarDetail");
  

  return (
    <div key={videogame.id} >
      <img src={videogame.imagen} alt={videogame.nombre} width={"300px"}/>
      <p>ID: {videogame.id}</p>
      <p>Name: {videogame.nombre}</p>
      <p>Description: {videogame.descripcion}</p>
      <p>Platforms: {videogame.plataformas}</p>
      <p>Release date: {videogame.fecha_lanzamiento}</p>
      <p>Rating: {videogame.rating}</p>
      <p>Genres: {videogame.generos.join(', ')}</p>
    </div>
  )
}

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getId(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const videogame = useSelector((state) => state.Details)
   console.log(Array.isArray(videogame))
   console.log(videogame)



  return (

    <div className="Detail">
      <div >
        {!videogame.id ? (
          <div><img src={loading} width='120px' alt='loading' /> </div>) : renderizarDetail(videogame)
        }
      </div>
    </div>
    
  );
}