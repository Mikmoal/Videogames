import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import { getName } from "../../redux/actions";

export default function SearchPokemon({ paginate }) {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(getName(search))
        setSearch('')
    }

    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        paginate(1)
    }
    return (
        <div className={style.search_bar}>
            <form onSubmit={onSubmit} action="">
                <input type="search" name="search" onChange={onInputChange} pattern=".*\S.*" required />
                    <button className={style.search_btn} type="submit">
                        <span>Search</span>
                    </button>
            </form>
        </div>
    )
}