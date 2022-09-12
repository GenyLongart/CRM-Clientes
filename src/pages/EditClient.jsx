import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddClientForm from '../components/AddClientForm'

const EditClient = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    
    const gettingClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);

        console.log(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    gettingClientAPI();
  }, []);
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Edita los datos del cliente</p>

        {cliente?.nombre ? (
          <AddClientForm 
          cliente = {cliente}
          cargando = {cargando}
        />
        ) : <p>ID Cliente no válido</p>}
        
    </>
  )
}

export default EditClient