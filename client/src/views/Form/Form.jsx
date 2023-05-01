import { useForm } from "../../hook/useForm.js";
import { Link } from "react-router-dom"
import style from "./Form.module.css";

const initialForm = {
  name: "",
  description: "",
  platforms: "",
  image: "",
  release_date: "",
  rating: "",
  genres: []
}

const validationsForm = (form) => {
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;  //expresion regular valida que solo se acepten mayúsculas y minúsculas            
  let regexNumbers = /^[0-9]\d*(\.\d+)?$/; //  /[0-9]/ es otra expresión regular para numeros
  let errors = {};

  if (!form.name.trim()) {  //el trim() evalua que tenga información, que no haya espacios en blanco
    errors.name = "El campo nombre es requerido"
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' solo acepta letras y espacios en blanco"
  } else if (form.name === "") {
    errors.name = "El nombre está vacío"
  }

  if (!form.description) {
    errors.description = "Se requiere una descripción del videojuego"
  } else if (form.description === "") {
    errors.description = "El campo está vacío"
  }

  if (!form.platforms) {
    errors.platforms = "Se requiere indicar la o las plataforma del videojuego"
  } else if (form.platforms === "") {
    errors.platforms = "El campo está vacío"
  }

  if (!form.image) {
    errors.image = "El campo es requerido"
  } else if (form.image === "") {
    errors.image = "El campo está vacío"
  }

  if (!form.release_date) {
    errors.release_date = "Se requiere indicar la fecha de lanzamiento"
  } else if (form.release_date === "") {
    errors.release_date = "El campo está vacío"
  }

  if (!form.rating) {
    errors.rating = "Se requiere indicar el rating del videojuego"
  } else if (form.rating === "") {
    errors.rating = "El campo está vacío"
  }

  if (form.genres.length === 0) {
    errors.genres = "Se requiere mínimo de un género"
  }

  return errors
}

function Form() {
  const {                        // destructuracion de useForm       
    form,
    errors,
    genre,
    handleChange,
    handleBlur,
    handleGenres,
    removeGenres,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // useForm tiene los valores iniciales del formulario y la validaciones


  return (
    <div>
      <div className={style.nav}>
        <Link to="/home">Home</Link>
      </div>
      <div className={style.container}>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <div>
            <label>Nombre </label>
            <input type="text" onChange={handleChange} onBlur={handleBlur} name="name" value={form.name} />
            {errors.name && <span>{errors.name}</span>}
          </div>

          <div>
            <label>Descripción </label>
            <input type="text" value={form.description} onBlur={handleBlur} onChange={handleChange} require='true' name="description" />
            {errors.description && <span>{errors.description}</span>}
          </div>

          <div>
            <label>Plataforma(s) </label>
            <input type="text" value={form.platforms} onBlur={handleBlur} onChange={handleChange} require='true' name="platforms" />
            {errors.platforms && <span>{errors.platforms}</span>}
          </div>

          <div>
            <label>Imagen </label>
            <input
              type="text"
              name="image"
              placeholder="image or url-image"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.image}
              require='true'
            />
            {errors.image && <span>{errors.image}</span>}
          </div>

          <div>
            <label>Fecha de lanzamiento </label>
            <input type="text" value={form.release_date} onBlur={handleBlur} onChange={handleChange} require='true' name="release_date" />
            {errors.release_date && <span>{errors.release_date}</span>}
          </div>

          <div>
            <label>Rating </label>
            <input type="number" value={form.rating} onBlur={handleBlur} onChange={handleChange} require='true' name="rating" />
            {errors.rating && <span>{errors.rating}</span>}
          </div>

          <div>

            <label>Géneros(s) </label>
            <select onChange={handleGenres} onBlur={handleBlur} defaultValue={'Choose an option'}>
              <option>Géneros</option>
              {genre.map((e, index) => (
                <option value={e.id} name={e.name} key={index}>{e.name}</option>
              ))}
            </select>

            {errors.genres && <span>{errors.genres}</span>}

          </div>

          <div>
            {form.genres.map((c, index) => {
              const found = genre.find(element => element.id === parseInt(c));

              return (<button value={found.id} onClick={removeGenres} key={index}>x  {found.name}</button>)
            }
            )}
          </div>

          <div className={style.centralized}>
            <button className={style.back_btn}>
              <Link to="/home"><span>Back</span></Link>
            </button>

            <div>
              <input type="submit" value="Crear nuevo juego" />
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Form