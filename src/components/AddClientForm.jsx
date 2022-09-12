import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "./Alert";
import Spinner from "./Spinner";

const AddClientForm = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("El número no es válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta
      if(cliente.id) { 
        //Editando un registro 

        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        
      } else { 
        //Nuevo registro
        const url = import.meta.env.VITE_API_URL;

      respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(valores),
        headers: {
          "Content-Type": "application/json",
        },
      });
      }
      await respuesta.json();
      navigate("/clients");
      
    } catch (error) {
      console.log(error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="nombre"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alert>{errors.nombre}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="empresa"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alert>{errors.empresa}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="email"
                  placeholder="Correo electrónico"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  id="telefono"
                  placeholder="Número de teléfono"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alert>{errors.telefono}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  id="notas"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

AddClientForm.defaultProps = {
  cliente: {},
  cargando: false
};

export default AddClientForm;
