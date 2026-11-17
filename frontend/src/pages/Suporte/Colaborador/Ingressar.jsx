import servidor from "../../../hooks/api.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAlert } from "../../../context/Alert/useAlert.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageForm } from "../../../components/layout/PageForm.jsx";
import { StackColumn } from "../../../components/layout/StackColumn.jsx";
import { StackRow } from "../../../components/layout/StackRow.jsx";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Stack,
} from "@mui/material";

export const IngressarChamado = () => {
  const api = servidor();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [estados, setEstados] = useState([]);
  const [setores, setSetores] = useState([]);
  const [problemas, setProblemas] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [anydesk, setAnydesk] = useState("");
  const [patrimonio, setPatrimonio] = useState("");

  const [estado, setEstado] = useState("");
  const [setor, setSetor] = useState("");
  const [problema, setProblema] = useState("");
  const [descricao, setDescricao] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedNome = localStorage.getItem("nome");
    const storedEmail = localStorage.getItem("email");

    if (storedNome) setNome(storedNome);
    if (storedEmail) setEmail(storedEmail);

    const fetchData = async () => {
      const estadosData = await api.getStates();
      setEstados(estadosData);

      const setoresData = await api.getSectores();
      setSetores(setoresData);

      const problemasData = await api.getProblems();
      setProblemas(problemasData);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const campos = [
      celular,
      anydesk,
      patrimonio,
      estado,
      setor,
      problema,
      descricao,
    ];

    if (campos.some((campo) => !campo || campo === "")) {
      return showAlert("Preencha todos os campos!", "warning");
    }

    setIsLoading(true);
    const req = await api.openTicket(
      nome,
      email,
      celular,
      anydesk,
      patrimonio,
      estado,
      setor,
      problema,
      descricao,
    );
    setIsLoading(false);

    if (req) {
      showAlert("Seu chamado foi aberto com sucesso!", "success");

      setCelular("");
      setAnydesk("");
      setPatrimonio("");
      setEstado("");
      setSetor("");
      setProblema("");
      setDescricao("");
    } 
    else {
      showAlert("Erro ao registrar chamado!", "error");
    }
  };

  const formatCel = (valor) => {
    //remove tudo que não for número
    const num = valor.replace(/\D/g, "");

    if (num.length === 11) {
      const ddd = num.slice(0, 2);
      const parte1 = num.slice(2, 7);
      const parte2 = num.slice(7);
      return `${ddd} ${parte1}-${parte2}`;
    }
    return valor;
  };

  return (
    <PageForm title="INGRESSAR NOVO CHAMADO" maxWidth="1050px">
      <StackColumn spacing={2.5}>
        <StackRow>
          <TextField
            disabled
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            disabled
            fullWidth
            label="Nome"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StackRow>

        <Divider sx={{ my: "24px !important" }} />

        <StackRow>
          <TextField
            required
            fullWidth
            type="tel"
            label="Celular"
            placeholder="99 99999-9999"
            value={celular}
            onChange={(e) => {
              //limpa caracteres
              const valor = e.target.value.replace(/\D/g, "");

              if (valor.length < 12) {
                const format = formatCel(valor);
                setCelular(format);
              }
            }}
          />
          <TextField
            required
            fullWidth
            type="text"
            label="Anydesk"
            placeholder="1383226360"
            pattern="[0-9]*"
            value={anydesk}
            onChange={(e) => {
              //remove tudo que não for número
              const numericValue = e.target.value.replace(/\D/g, "");

              if (numericValue.length <= 10) {
                setAnydesk(numericValue);
              }
            }}
          />
          <TextField
            required
            fullWidth
            label="Patrimônio"
            value={patrimonio}
            onChange={(e) => setPatrimonio(e.target.value)}
          />
        </StackRow>

        <StackRow>
          <TextField
            select
            required
            fullWidth
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            {estados.map((estado) => (
              <MenuItem key={estado.id} value={estado.nome}>
                {estado.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            required
            fullWidth
            label="Problema"
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
          >
            {problemas.map((problema) => (
              <MenuItem key={problema.id} value={problema.nome}>
                {problema.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            required
            fullWidth
            label="Setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          >
            {setores.map((setor) => (
              <MenuItem key={setor.id} value={setor.nome}>
                {setor.nome}
              </MenuItem>
            ))}
          </TextField>
        </StackRow>

        <StackRow>
          <TextField
            required
            fullWidth
            multiline
            rows={10}
            label="Descrição"
            placeholder="Descreva aqui seu problema"

            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </StackRow>
      </StackColumn>

      <Stack direction="row" spacing={2} mt={4}>
        <Button
          fullWidth
          variant="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          VOLTAR
        </Button>

        <Button
          fullWidth
          variant="primary"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "CARREGANDO..." : "ENVIAR"}
        </Button>
      </Stack>
    </PageForm>
  );
};