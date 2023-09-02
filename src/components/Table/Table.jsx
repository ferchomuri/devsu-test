import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Dialog/Dialog";
import MenuContext from "../MenuContext/MenuContext";
import { deleteProduct } from "../../brigde/GeneralRequest";
import "./Table.css";

const Table = ({ data, showColums }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [perPage, setPerPage] = useState(5); // Estado para elementos por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para página actual

  // Calcula el índice de inicio y fin de los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const handleOpenDialog = (id) => {
    setIdToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async () => {
    await deleteProduct(idToDelete).then((response) => {
      handleCloseDialog();
    });
  };

  const parsedDate = (dateString) => {
    const parsedDate = new Date(dateString);
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
    return formattedDate;
  };

  return (
    <div className='main-container'>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              {showColums.map((item) => (
                <th key={item.name}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(startIndex, endIndex).map((item) => (
              <tr key={item.id}>
                <td>
                  <div className='circle-image-container'>
                    <img
                      className='circle-image'
                      src={item.logo}
                      alt={item.name}
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{parsedDate(item.date_release)}</td>
                <td>{parsedDate(item.date_revision)}</td>
                <td>
                  <MenuContext
                    options={[
                      {
                        type: "button",
                        label: "Editar",
                        action: () =>
                          navigate(`/editProduct/${item.id}`, { state: item }),
                      },
                      {
                        type: "button",
                        label: "Eliminar",
                        action: () => handleOpenDialog(item.id),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='footer-table'>
        <p className='paragraph-space'>
          <strong>{`${data.length} Resultado${
            data.length > 1 ? "s" : ""
          }`}</strong>
        </p>
        <div>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() =>
              setCurrentPage(
                Math.min(Math.ceil(data.length / perPage), currentPage + 1)
              )
            }
            disabled={currentPage >= Math.ceil(data.length / perPage)}
          >
            Siguiente
          </button>
        </div>
        <select
          className='space-select'
          value={perPage}
          onChange={(e) => {
            setPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
        </select>
      </div>
      <ConfirmationDialog
        text='¿Estás seguro de que quieres eliminar este producto?'
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Table;
