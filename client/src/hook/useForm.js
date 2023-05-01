import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, create, getVG } from "../redux/actions";
import { useHistory } from "react-router-dom";

export const useForm = (initialForm, validateForm) => {
  // por parámetros llega el estado inicial y la funcion validateForm(son todas las validaciones)
  const [form, setForm] = useState(initialForm); // el estado inicial se reciben por parámetros
  const [errors, setErrors] = useState({}); // se usa para los errores, se inicia como un objeto vacío, el cual se llenara de errores. Si el el objeto está vacío entonces no hay errores
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVG());
  }, [dispatch]);

  const genre = useSelector((state) => state.genresState).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  // console.log(genre);

  var nameVG = useSelector((state) => state.videogamesClean);
  // console.log(nameVG);

  const handleChange = (e) => {
    const { name, value } = e.target;

    validateForm({
      ...form,
      [name]: value,
    });
    setForm({
      ...form,
      [name]: value, //se hace el cambio por el evento que entra por parametro
    });
  };

  const handleBlur = (e) => {
    // esta función lanza las validaciones al perder el foco las propiedades del formulario.
    handleChange(e); //
    setErrors(validateForm(form)); //validateForm se ejecuta dentro del estado de error, y llenara el objeto vacío con los errores
  };

  const handleGenres = (e) => {
    if (form.genres.includes(e.target.value)) {
      return;
    } else {
      setForm({
        ...form,
        genres: [...form.genres, parseInt(e.target.value)],
      });
    }
  };

  const removeGenres = (e) => {
    setForm({
      ...form,
      genres: form.genres.filter((el) => el !== e.target.value),
    });
  };

  const handleSubmit = (e) => {
    // hace el submit(envía) del formulario
    e.preventDefault();
    setErrors(validateForm(form));

    if (form.name) {
      var aux = nameVG.find((e) => e.name === form.name);
      console.log(aux);
      if (aux !== undefined) {
        return alert("Nombre repetido");
      }
    }
    if (Object.keys(errors).length > 0) {
      //preguntamos si el objeto errores esta vacío, si se cumple se procesa
      alert("Faltan campos por completar o hay un error");
    } else if (
      form.name === "" ||
      form.description === "" || //si hay campos vacíos no prosigue
      form.platforms === "" ||
      form.image === "" ||
      form.release_date === "" ||
      form.rating === "" ||
      !form.genres.length
    ) {
      return alert("Hay campos sin completar");
    } else {
      console.log(form);
      dispatch(create(form));
      alert("Videogame created");
      setForm({
        name: "",
        description: "",
        platforms: "",
        image: "",
        release_date: "",
        rating: "",
        genres: [],
      });
      history.push("/home");
    }
  };

  return {
    form,
    errors,
    genre,
    handleChange,
    handleBlur,
    handleGenres,
    removeGenres,
    handleSubmit,
  };
};
