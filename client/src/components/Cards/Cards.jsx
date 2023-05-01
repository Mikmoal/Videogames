import { Link } from "react-router-dom"
import Card from "../Card/Card.jsx"
import style from "./Cards.module.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getGenres, create, getVG, clean } from "../../redux/actions";

const Cards = () => {
    const videogamesArr = useSelector(state => state.videogames)
    // let dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPokemons());
    //     dispatch(clean())
    // }, [dispatch])

    // const [currentPage, setCurrentPage] = useState(1);
    // const [postPerPage] = useState(8);


    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfLastPost - postPerPage;
    // const currentPosts = pokemonsArr.slice(indexOfFirstPost, indexOfLastPost);


    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className={style.mainContainer}>
            {videogamesArr.map(videogame => {
                return <Card
                    key={videogame.id}
                    id={videogame.id}
                    name={videogame.name}
                    description={videogame.description}
                    platforms={videogame.platforms}
                    image={videogame.image}
                    release_date={videogame.release_date}
                    rating={videogame.rating}
                    genres={videogame.genres}
                />
            })}
        </div>
    )
}

export default Cards