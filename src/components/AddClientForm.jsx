import React from "react";
import { Formik, Form, Field } from "formik";

const AddClientForm = () => {
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        Agregar Cliente
      </h1>

      <Formik>
        <Form className="mt-10">
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="name">Nombre:</label>
            <Field 
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50'
              id='name'
              placeholder='Nombre del cliente'
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="company">Empresa:</label>
            <Field 
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50'
              id='company'
              placeholder='Empresa del cliente'
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="email">Email:</label>
            <Field 
              type='email'
              className='mt-2 block w-full p-3 bg-gray-50'
              id='email'
              placeholder='Correo electrónico'
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="phone">Teléfono:</label>
            <Field 
              type='tel'
              className='mt-2 block w-full p-3 bg-gray-50'
              id='phone'
              placeholder='Número de teléfono'
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="notes">Notas:</label>
            <Field 
              as='text-area'
              type='text'
              className='mt-2 block w-full p-3 bg-gray-50 h-40'
              id='notes'
              placeholder='Email del cliente'
            />
          </div>

          <input 
          type='submit' 
          value='Agregar Cliente' 
          className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default AddClientForm;
