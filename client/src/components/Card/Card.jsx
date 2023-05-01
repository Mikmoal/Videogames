import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = (props) => {
    const genres = props.genres.join(', ');
    return(
        
        <div className={style.imagenP}>
            <Link to= {`/home/${props.id}`}>
            <img src={props.image} alt={props.name} />
            <p>Name: {props.name}</p>
            <p>Genres: {genres}</p>
            </Link>
        </div>
        
    )
}

export default Card