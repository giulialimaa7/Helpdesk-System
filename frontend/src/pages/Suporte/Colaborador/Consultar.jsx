import servidor from "../../../hooks/api.js";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TableContainer } from "../../../components/layout/TableContainer.jsx";
import { MyTable } from "../../../components/ui/MyTable.jsx";
import { chamadosColaborador } from "../../../components/columns/chamadosColaborador.jsx";

export const ConsultarChamados = () => {
  const api = servidor();
  
  const [chamadosUser, setChamadosUser] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const chamadosUserData = await api.getUserTickets();
        setChamadosUser(chamadosUserData);
      } 
      catch (error) {
        console.log("Erro ao carregar chamados: ", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chamadosComKey = chamadosUser.map((chamado, index) => ({
    ...chamado,
    key: chamado.protocolo || index,

    abertura: chamado.abertura
      ? format(new Date(chamado.abertura), "dd-MM-yyyy", { locale: ptBR })
      : "",
  }));

  return (
    <TableContainer title="MEUS CHAMADOS">
      <MyTable 
        loading={loading}
        data={chamadosComKey} 
        columns={chamadosColaborador()} 
      />
    </TableContainer>
  );
};