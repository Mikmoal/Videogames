import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions";
import { A_Z, Z_A } from "../../constants";
import style from "./Orders.module.css";

export default function Order() {
    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(orderBy(e.target.value))
    }

    return (
        <div className={style.select}>
            <select onChange={onSelectChange} >
                <option defaultValue>Order By</option>
                <option value={A_Z}>Order A - Z</option>
                <option value={Z_A}>Order Z - A</option>
            </select>
            <ul>
                <li defaultValue>Order By</li>
                <li value={A_Z}>Order A - Z</li>
                <li value={Z_A}>Order Z - A</li>
            </ul>
        </div>
    )
}