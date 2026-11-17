import servidor from "../../../hooks/api.js";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableContainer } from "../../../components/layout/TableContainer.jsx";
import { MyTable } from "../../../components/ui/MyTable.jsx";
import { historicoChamadosAdm } from "../../../components/columns/historicoChamadosAdm.jsx";

export const HistoricoChamados = () => {
  const api = servidor();
  const navigate = useNavigate();

  const [chamadosEncerrados, setChamadosEncerrados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try{
        const chamadosEncerradosData = await api.getClosedTickets();
        setChamadosEncerrados(chamadosEncerradosData);
      }
      catch {
        console.log("Erro oo carregar histórico:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chamadosEncerradosComKey = chamadosEncerrados.map((chamado, index) => ({
    ...chamado,
    key: chamado.protocolo || index,

    abertura: chamado.abertura
      ? format(new Date(chamado.abertura), "dd-MM-yyyy", {
          locale: ptBR,
        })
      : "",

    fechamento: chamado.fechamento
      ? format(new Date(chamado.fechamento), "dd-MM-yyyy", {
          locale: ptBR,
        })
      : "",
  }));

  return (
    <TableContainer title="CHAMADOS FECHADOS" maxWidth="1100px">
      <MyTable
        loading={loading}
        data={chamadosEncerradosComKey}
        columns={historicoChamadosAdm(navigate)}
      />
    </TableContainer>
  );
};