import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const UsersPages = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    // Obtener los usuarios del backend
    axios
      .get("http://localhost:5001/api/users")
      .then((response) => {
        setUsers(response.data); // Guardar los datos en el estado
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setError(error.response?.data?.message || "Error al cargar los datos");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSubmit = () => {
    navigate("/");
  }

  return (
    <div>
     <button onClick={handleSubmit} >Go Back</button>

     
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Correo Electrónico</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPages;
