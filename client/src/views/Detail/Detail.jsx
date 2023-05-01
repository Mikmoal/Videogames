import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getId } from "../../redux/actions";
import loading from "../../loading.gif";

function renderizarDetail(videogame) {
  console.log("se ejecuta renderizarDetail");
  const genres = videogame.genres.map((element) => {
    return element.genre.name;
  });

  return (
    <div key={videogame.id}>
      <img src={videogame.image} alt={videogame.name} />
      <p>ID: {videogame.id}</p>
      <p>Name: {videogame.name}</p>
      <p>Description: {videogame.description}</p>
      <p>Platforms: {videogame.platforms}</p>
      <p>Release date: {videogame.release_date}</p>
      <p>Rating: {videogame.rating}</p>
      <p>Genres: {genres.join(', ')}</p>
    </div>
  )
}

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getId(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const videogame = useSelector((state) => state.Details)
  // console.log(Array.isArray(videogame))
  // console.log("este es lo que trae del state: " + videogame)



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