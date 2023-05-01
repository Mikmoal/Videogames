import { useDispatch } from "react-redux";
import { filterVG } from "../../redux/actions";
import style from "../Orders/Orders.module.css";

export default function FilterVG() {
    const dispatch = useDispatch();

    function onFilter(e) {
        e.preventDefault();
        dispatch(filterVG(e.target.value))
    }

    return (
        <div className={style.select}>
            <select onChange={onFilter} >
                <option value='All Videogames' key='All Videogames'>All Videogames</option>
                <option value='Videogames' key='Videogames of API'>Videogames</option>
                <option value='New Videogames' key='New Videogames'>New Videogames</option>
            </select>
            <ul>
                <li value='All Videogames'>All Videogames</li>
                <li value='Videogames'>Videogames</li>
                <li value='New Videogames'>New Videogames</li>
            </ul>
        </div>
    )
}