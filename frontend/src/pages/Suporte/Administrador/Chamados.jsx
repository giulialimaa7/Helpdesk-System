import servidor from "../../../hooks/api.js";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { COLORS } from "../../../styles/colors.js";
import { TableContainer } from "../../../components/layout/TableContainer.jsx";
import { MyTable } from "../../../components/ui/MyTable.jsx";
import { chamadosAdm } from "../../../components/columns/chamadosAdm.jsx";

export const Chamados = () => {
  const api = servidor();
  const navigate = useNavigate();

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const chamadosData = await api.getTickets();
        setChamados(chamadosData);
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

  const chamadosComKey = chamados.map((chamado, index) => ({
    ...chamado,
    key: chamado.protocolo || index,

    abertura: chamado.abertura
      ? format(new Date(chamado.abertura), "dd/MM/yyyy HH:mm", { locale: ptBR })
      : "",
  }));

  const getPrioridade = (prioridade) => {
    switch (prioridade) {
      case "ALTA":   
        return COLORS.vermelho
      ;
      case "MÉDIA":  
        return COLORS.laranja
      ;
      case "BAIXA":  
        return COLORS.verde
      ;
      default:       
        return COLORS.cinza
      ;
    }
  };

  return (
    <TableContainer title="CHAMADOS">
      <MyTable
        loading={loading}
        data={chamadosComKey}
        columns={chamadosAdm(navigate, getPrioridade)}
        rowClassName={(record) =>
          record.status === "EM ANDAMENTO" ? "row-em-andamento" : ""
        }
      />
    </TableContainer>
  );
};