import { Link } from 'react-router-dom';
import style from "./Landing.module.css";
function Landing() {
    return (
        <div className="Landing">
            <h1>Videogames PI</h1>

            <div className={style.main}>
                {/* <img src= {unaimagen} alt="logo videogames" /> */}
                <Link to="/home">
                    <button>Enter</button>
                </Link>
            </div>

        </div>

    );
}

export default Landing;