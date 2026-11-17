import servidor from "../../../hooks/api.js";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TableContainer } from "../../../components/layout/TableContainer.jsx";
import { MyTable } from "../../../components/ui/MyTable.jsx";
import { historicoChamadosColaborador } from "../../../components/columns/historicoChamadosColaborador.jsx";

export const HistoricoColaborador = () => {
  const api = servidor();

  const [chamadosEncerrados, setChamadosEncerrados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const chamadosEncerradosData = await api.getUserClosedTickets();
        setChamadosEncerrados(chamadosEncerradosData);
      } 
      catch (error) {
        console.log("Erro ao carregar histórico: ", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chamadosEncerradosComKey = chamadosEncerrados.map(
    (chamadoEncerrado, index) => ({
      ...chamadoEncerrado,
      key: chamadoEncerrado.protocolo || index,

      abertura: chamadoEncerrado.abertura
        ? format(new Date(chamadoEncerrado.abertura), "dd-MM-yyyy", {
            locale: ptBR,
          })

        : "",

      fechamento: chamadoEncerrado.fechamento
        ? format(new Date(chamadoEncerrado.fechamento), "dd-MM-yyyy", {
            locale: ptBR,
          })
          
        : "",
    }),
  );

  return (
    <TableContainer title="MEUS CHAMADOS ENCERRADOS">
      <MyTable
        loading={loading}
        data={chamadosEncerradosComKey}
        columns={historicoChamadosColaborador()}
      />
    </TableContainer>
  );
};