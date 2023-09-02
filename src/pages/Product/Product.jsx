import React, { useState } from "react";

import "./Product.css";
import Button from "../../components/Button/Button";
import {
  createProduct,
  updateProduct,
  verificationId,
} from "../../brigde/GeneralRequest";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const actualDate = () => {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const formattedDate = `${year},${month.toString().padStart(2, "0")},${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

const parsedDateInput = (dateString) => {
  const initialDate = dateString;
  const formattedDate = new Date(initialDate).toISOString().split("T")[0];
  return formattedDate;
};

const Product = () => {
  const location = useLocation();
  const stateProducts = location.state;
  const { productId } = useParams();

  //States
  const [formData, setFormData] = useState({
    id: stateProducts ? stateProducts.id : "",
    name: stateProducts ? stateProducts.name : "",
    description: stateProducts ? stateProducts.description : "",
    logo: stateProducts ? stateProducts.logo : "",
    date_release: stateProducts
      ? parsedDateInput(stateProducts.date_release)
      : "",
    date_revision: stateProducts
      ? parsedDateInput(stateProducts.date_revision)
      : "",
  });
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  });

  //Hooks
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const { name, value } = event.target;

    if (name === "date_release") {
      // Add one year to the date of revision from date release
      const date = new Date(value);
      date.setFullYear(date.getFullYear() + 1);

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        date_revision: date.toISOString().split("T")[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "name") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "El nombre es obligatorio.",
        }));
      } else if (value.length < 5 || value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "El nombre debe tener entre 5 y 100 caracteres.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "",
        }));
      }
    }

    if (name === "description") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "La descripción es obligatoria.",
        }));
      } else if (value.length < 10 || value.length > 200) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "La descripción debe tener entre 10 y 200 caracteres.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: "",
        }));
      }
    }

    if (name === "logo") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "El logo es obligatorio.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "",
        }));
      }
    }

    if (name === "date_release") {
      const dateString = value.toString().replace("-", ",");
      const dateFromString = new Date(dateString);
      const currentDate = actualDate();
      const currentDateFromString = new Date(currentDate);

      if (dateFromString < currentDateFromString) {
        console.log(dateFromString);
        console.log(currentDateFromString);
        setErrors((prevErrors) => ({
          ...prevErrors,
          date_release: "La fecha debe ser igual o mayor a la actual.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date_release: "",
        }));
      }
    }

    if (name === "id") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: "El ID es obligatorio.",
        }));
      } else if (value.length < 3 || value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: "El ID debe tener entre 3 y 10 caracteres.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: "",
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.id !== "" &&
      formData.name !== "" &&
      formData.description !== "" &&
      formData.logo !== "" &&
      formData.date_release !== "" &&
      formData.date_revision !== "" &&
      !errors.id &&
      !errors.name &&
      !errors.description &&
      !errors.logo &&
      !errors.date_release
    ) {
      if (productId) {
        await updateProduct(formData).then((response) => {
          navigate("/");
        });
        return;
      } else {
        await createProduct(formData).then((response) => {
          navigate("/");
        });
      }
    } else {
      let tempErrors = { ...errors };
      if (formData.id === "") {
        tempErrors.id = "El ID es obligatorio.";
      }
      if (formData.name === "") {
        tempErrors.name = "El nombre es obligatorio.";
      }

      if (formData.description === "") {
        tempErrors.description = "La descripción es obligatoria.";
      }

      if (formData.logo === "") {
        tempErrors.logo = "El logo es obligatorio.";
      }

      if (formData.date_release === "") {
        tempErrors.date_release = "La fecha de liberación es obligatoria.";
      }

      setErrors(tempErrors);

      //alerta de error
      window.alert("Error en el formulario");
    }
  };

  const handleResetForm = () => {
    setFormData({
      id: stateProducts ? stateProducts.id : "",
      name: stateProducts ? stateProducts.name : "",
      description: stateProducts ? stateProducts.description : "",
      logo: stateProducts ? stateProducts.logo : "",
      date_release: stateProducts ? stateProducts.date_release : "",
      date_revision: stateProducts ? stateProducts.date_revision : "",
    });
    setErrors({
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    });
  };

  const handleVerificationId = async (event) => {
    const { value } = event.target;
    const response = await verificationId(value);
    if (response) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        id: "El ID no válido!",
      }));
    }
  };

  return (
    <div className='producto-container'>
      <div className='left-btn-regresar'>
        <Button
          action={() => navigate("/")}
          text='Regresar'
          color='secondary'
        />
      </div>
      <form className='form-container ' onSubmit={handleSubmit}>
        <h2>Formulario de Registro</h2>
        <hr className='divider' />
        <div className='container-input'>
          <div>
            <label htmlFor='id'>ID:</label>
            <input
              className={`${errors.id ? "input-error" : "input-container"}`}
              disabled={productId ? true : false}
              onBlur={handleVerificationId}
              type='text'
              id='id'
              name='id'
              value={formData.id}
              onChange={handleChange}
            />
            {errors.id && <span className='error-text'>{errors.id}</span>}
          </div>
          <div>
            <label htmlFor='name'>Nombre:</label>
            <input
              className={`${errors.name ? "input-error" : "input-container"}`}
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className='error-text'>{errors.name}</span>}
          </div>
        </div>
        <div className='container-input'>
          <div>
            <label htmlFor='description'>Descripción:</label>
            <input
              className={`${
                errors.description ? "input-error" : "input-container"
              }`}
              type='text'
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className='error-text'>{errors.description}</span>
            )}
          </div>
          <div>
            <label htmlFor='logo'>Logo:</label>
            <input
              className={`${errors.logo ? "input-error" : "input-container"}`}
              type='text'
              id='logo'
              name='logo'
              value={formData.logo}
              onChange={handleChange}
            />
            {errors.logo && <span className='error-text'>{errors.logo}</span>}
          </div>
        </div>
        <div className='container-input'>
          <div>
            <label htmlFor='date_release'>Fecha de liberación:</label>
            <input
              className={`${
                errors.date_release ? "input-error" : "input-container"
              }`}
              type='date'
              id='date_release'
              name='date_release'
              value={formData.date_release}
              onChange={handleChange}
            />
            {errors.date_release && (
              <span className='error-text'>{errors.date_release}</span>
            )}
          </div>
          <div>
            <label htmlFor='date_revision'>Fecha de revisión:</label>
            <input
              disabled
              type='date'
              id='date_revision'
              name='date_revision'
              value={formData.date_revision}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='container-buttons'>
          <Button text='Reiniciar' color='gray' action={handleResetForm} />
          <Button
            disabled={
              errors.id ||
              errors.name ||
              errors.description ||
              errors.logo ||
              errors.date_release
            }
            type='submit'
            text='Guardar'
            color='primary'
            action={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default Product;
