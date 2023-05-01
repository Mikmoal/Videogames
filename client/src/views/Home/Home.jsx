import Card from "../../components/Card/Card";
import style from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import NavBar from "../../components/NavBar/NavBar";
import loading from "../../loading.gif";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getVG, clean } from "../../redux/actions";

function Home() {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVG());
    dispatch(clean())
  }, [dispatch])

  const videogamesArr = useSelector(state => state.videogames)

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);

  console.log(videogamesArr);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = videogamesArr.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div>
      <NavBar paginate={paginate} />
      

      <div>
        <Pagination
          postPerPage={postPerPage}
          totalPost={videogamesArr.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>


      {videogamesArr.length === 0 ? (
        <div className={style.loading}>
          <img width='50px' src={loading} alt='loading' />
        </div>) :
        (
          <div className={style.allCards}>
            {currentPosts.map(e => (
            <Card
            key={e.id}
            id={e.id}
            name={e.nombre}
            description={e.description}
            platforms={e.platforms}
            image={e.imagen}
            release_date={e.release_date}
            rating={e.rating}
            genres={e.generos}
            />
          ))}
          </div>
        )}
    </div>
  );
}

export default Home;