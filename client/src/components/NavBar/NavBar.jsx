import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import FilterGenres from "../FilterGenres/FilterGenres";
import Orders from '../Orders/Orders';
import FilterVideogames from '../FilterVideogames/FilterVideogames'; //aqui crear componentes restantes
import style from "./NavBar.module.css"

const NavBar = ({ paginate }) => {
    return (
        <div className={style.mainContainer}>
            <Link to="/home">Home</Link>
            <SearchBar
                paginate={paginate} />

            <Orders
                paginate={paginate} />

            <FilterVideogames
                paginate={paginate} />

            <FilterGenres
                paginate={paginate}
            />
            <Link to="/newVideogame">New Videogame</Link>
        </div>
    )
}

export default NavBar