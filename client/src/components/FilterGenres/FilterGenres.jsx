import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterG, getGenres } from "../../redux/actions";
import style from "../Orders/Orders.module.css";


export default function FilterGenres({ paginate }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    const genresState = useSelector((state) => state.genresState)
    //console.log(typesState instanceof Array); true

    const genresOrder = genresState.sort((a, b) => { //se ordena alfabeticamente para que salga bien en el select
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
    })


    function onFilterGenres(e) {
        e.preventDefault()
        dispatch(filterG(e.target.value))
        paginate(1)
    }

    return (
        <div className={style.select}>
            <select onChange={onFilterGenres} >
                <option value='All Genres' key='All Genres'>All Genres</option>
                {genresOrder.map((el, index) => (
                    <option value={el.name} key={index}>{el.name}</option>
                ))}
            </select>
            <ul>
                {genresOrder.map((el) => (
                    <li value={el.name}>{el.name}</li>
                ))}
            </ul>
        </div>
    )
}