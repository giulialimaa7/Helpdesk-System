import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SyncIcon from "@mui/icons-material/Sync";
import ErrorIcon from "@mui/icons-material/Error";
import servidor from "../../../../hooks/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../../styles/colors.js";
import {
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

export const Dashboard = () => {
  const navigate = useNavigate();
  const api = servidor();

  const hoje = new Date();

  const [data, setData] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  const [loadingGrafico, setLoadingGrafico] = useState(false);
  const [loadingRelatorio, setLoadingRelatorio] = useState(false);

  const [relatorio, setRelatorio] = useState({
    chamadosAbertos24h: 0,
    chamadosAndamento24h: 0,
    chamadosFechados24h: 0,
    chamadosSemResponsavel: 0,
  });

  const anosDisponiveis = Array.from(
    { length: hoje.getFullYear() - 2025 + 1 },
    (_, i) => 2025 + i
  );

  const mesesDisponiveis = Array.from({ length: 12 }, (_, i) => ({
    valor: i,
    label: new Date(2000, i).toLocaleString("pt-BR", { month: "long" }),

  })).filter((mes) => {
    if (anoSelecionado === 2025) 
      return mes.valor >= 6
    ;
    
    if (anoSelecionado === hoje.getFullYear()) 
      return mes.valor <= hoje.getMonth()
    ;
    
    return true;
  });

  const handleAnoChange = (novoAno) => {
    setAnoSelecionado(novoAno);

    const mesInvalido =
      (novoAno === 2025 && mesSelecionado < 6) ||
      (novoAno === hoje.getFullYear() && mesSelecionado > hoje.getMonth())
    ;

    if (mesInvalido) {
      setMesSelecionado(novoAno === 2025 ? 6 : hoje.getMonth());
    }
  };

  const nomeMesSelecionado = 
    new Date(anoSelecionado, mesSelecionado).toLocaleString("pt-BR", {
    month: "long",
  });

  useEffect(() => {
    const fetchGrafico = async () => {
      try {
        setLoadingGrafico(true);

        const [openTickets, closedTickets] = await Promise.all([
          api.getTickets(),
          api.getClosedTickets(),
        ]);

        const todosChamados = [...openTickets, ...closedTickets];

        const isMesmoMes = (dataString) => {
          if (!dataString) 
            return false
          ;

          const d = new Date(dataString);
          return d.getMonth() === mesSelecionado && d.getFullYear() === anoSelecionado;
        };

        const contagem = {
          "Analista 1": 0,
          "Analista 2": 0,
          "Analista 3": 0,
          "Analista 4": 0,
          "Analista 5": 0,
          Outros: 0,
        };

        todosChamados.forEach((ticket) => {
          const dataReferencia = ticket.fechamento || ticket.abertura;

          if (!isMesmoMes(dataReferencia)) 
            return
          ;

          const responsavel = ticket.responsavel?.trim();

          if (contagem.hasOwnProperty(responsavel)) {
            contagem[responsavel]++;
          } 
          else {
            contagem["Outros"]++;
          }
        });

        const dados = [
          { 
            name: "analista1@example.com", 
            shortName: "Analista 1",
            total: contagem["Analista 1"], 
            color: COLORS.analista1  
          },
          { 
            name: "analista2@example.com", 
            shortName: "Analista 2", 
            total: contagem["Analista 2"], 
            color: COLORS.analista2   
          },
          { 
            name: "analista3@example.com", 
            shortName: "Analista 3", 
            total: contagem["Analista 3"], 
            color: COLORS.analista3 
          },
          { 
            name: "analista4@example.com", 
            shortName: "Analista 4", 
            total: contagem["Analista 4"], 
            color: COLORS.analista4  
          },
          { 
            name: "analista5@example.com", 
            shortName: "Analista 5", 
            total: contagem["Analista 5"], 
            color: COLORS.analista5
          },
          { 
            name: "Outros", 
            shortName: "Outros", 
            total: contagem["Outros"], 
            color: COLORS.outros  
          },
        ];

        const ordenado = dados
          .filter((item) => item.name !== "Outros")
          .sort((a, b) => b.total - a.total);

        const outros = dados.find((item) => item.name === "Outros");
        setData([...ordenado, outros]);
      } 
      catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      } 
      finally {
        setLoadingGrafico(false);
      }
    };

    fetchGrafico();
  }, [mesSelecionado, anoSelecionado]);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        setLoadingRelatorio(true);

        const [openTickets, closedTickets] = await Promise.all([
          api.getTickets(),
          api.getClosedTickets(),
        ]);

        const agora = new Date();
        const todosChamados = [...openTickets, ...closedTickets];
        const ultimas24h = new Date(agora.getTime() - 24 * 60 * 60 * 1000);

        const abertos24h =
          todosChamados.filter(
            (t) => t.abertura && new Date(t.abertura) >= ultimas24h
          ).length
        ;

        const andamento24h =
          todosChamados.filter(
            (t) => t.abertura && new Date(t.abertura) >= ultimas24h && t.status === "EM ANDAMENTO"
          ).length
        ;

        const fechados24h =
          todosChamados.filter(
            (t) => t.fechamento && new Date(t.fechamento) >= ultimas24h
          ).length
        ;

        const semResponsavel =
          todosChamados.filter(
            (t) => (!t.responsavel || t.responsavel.trim() === "N/A") && t.status !== "FECHADO"
          ).length
        ;

        setRelatorio({
          chamadosAbertos24h: abertos24h,
          chamadosAndamento24h: andamento24h,
          chamadosFechados24h: fechados24h,
          chamadosSemResponsavel: semResponsavel,
        });
      } 
      catch (error) {
        console.error("Erro ao buscar relatório:", error);
      } 
      finally {
        setLoadingRelatorio(false);
      }
    };

    fetchRelatorio();
  }, []);

  const semDados = data.length > 0 && data.every(
    (item) => item.total === 0
  );

  const relatorioItems = [
    {
      icon: <CheckCircleIcon sx={{color: COLORS.verde}} />,
      label: "Chamados Abertos",
      sublabel: "Últimas 24 horas",
      valor: relatorio.chamadosAbertos24h,
      accent: COLORS.accentVerde,
    },
    {
      icon: <CancelIcon sx={{color: COLORS.vermelho}} />,
      label: "Chamados Fechados",
      sublabel: "Últimas 24 horas",
      valor: relatorio.chamadosFechados24h,
      accent: COLORS.accentVermelho,
    },
    {
      icon: <SyncIcon sx={{color: COLORS.azul}} />,
      label: "Chamados em andamento",
      sublabel: "Últimas 24 horas",
      valor: relatorio.chamadosAndamento24h,
      accent: COLORS.accentAzul,
    },
    {
      icon: <ErrorIcon sx={{ color:COLORS.laranja}} />,
      label: "Chamados sem atendimento",
      sublabel: "Pendentes no sistema",
      valor: relatorio.chamadosSemResponsavel,
      accent: COLORS.accentLaranja,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            minWidth: 140,
            borderRadius: 3,
            backdropFilter: "blur(6px)",
            backgroundColor: COLORS.branco,
            border: `1px solid ${COLORS.verdeBorda}`,
            boxShadow: `0 8px 20px ${COLORS.sombra}`,
          }}
        >
          <Typography 
            fontSize={15} 
            color="#555"
          >
            {item.shortName}
          </Typography>

          <Typography 
            fontSize={13} 
            fontWeight={600} 
          >
            {item.total} chamados
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        width: "100%",
        borderRadius: 3,
        background: COLORS.branco,
        border: `1.5px solid ${COLORS.verdeBorda}`,

      }}
    >
      {/* HEADER */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Stack 
          gap={2} 
          flexWrap="wrap"
          direction="row" 
          alignItems="center" 
        >
          {/* BARRA VERDE + TÍTULO */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 4,
                height: 22,
                borderRadius: 2,
                background: `linear-gradient(180deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
              }}
            />
            <Typography
              variant="h6"
              fontSize={16}
              fontWeight={700}
              color={COLORS.texto1}
            >
              DASHBOARD
            </Typography>
          </Stack>

          {/* FILTROS — estilo vindo do muiTheme */}
          <Stack direction="row" alignItems="center" gap={1}>
            <FormControl size="small">
              <Select
                sx={{ height: "35px"}}
                value={anoSelecionado}
                onChange={(e) => handleAnoChange(Number(e.target.value))}
              >
                {anosDisponiveis.map((ano) => (
                  <MenuItem key={ano} value={ano}>
                    {ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <Select
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(Number(e.target.value))}
                sx={{textTransform: "capitalize", height: "35px"}}
              >
                {mesesDisponiveis.map((mes) => (
                  <MenuItem
                    //size="small"
                    key={mes.valor}
                    value={mes.valor}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {mes.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Button
          variant="text"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/suporte/administrador/chamados")}
          sx={{
            fontSize: 13,
            color: COLORS.verde,

            "&:hover": {background: COLORS.verdeClaro},
          }}
        >
          VER TODOS
        </Button>
      </Stack>

      <Divider sx={{mt: 2, mb: 3, borderColor: COLORS.verdeBorda}} />

      <Box
        sx={{
          gap: 3,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* GRÁFICO */}
        <Box sx={{ flex: 6, display: "flex" }}>
          <Card
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              background: COLORS.fundoCard,
              border: `1.5px solid ${COLORS.verdeBorda}`
            }}
          >
            <CardContent>
              <Typography
                mb={2}
                fontSize={14}
                fontWeight={700}
                letterSpacing={1}
                color={COLORS.textoLabel}
              >
                CHAMADOS POR RESPONSÁVEL
              </Typography>

              {loadingGrafico ? (
                <Box 
                  sx={{ 
                    height: 265, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}
                >
                  <CircularProgress size={30} sx={{ color: COLORS.verde }} />
                </Box>

              ) : semDados ? (
                <Box 
                  sx={{ 
                    height: 265, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}
                >
                  <Typography color="text.secondary" fontSize={14}>
                    Nenhum chamado em {nomeMesSelecionado} de {anoSelecionado}
                  </Typography>
                </Box>
                
              ) : (
                <ResponsiveContainer width="100%" height={265}>
                  <BarChart 
                    data={data} 
                    fontSize={14} 
                    margin={{ top: 10, right: 2, left: 8, bottom: 5 }}
                  >
                    <CartesianGrid 
                      vertical={false} 
                      stroke={COLORS.verdeBorda} 
                      strokeDasharray="4 4" 
                    />
                    <XAxis
                      tick={false}
                      dataKey="name"
                      tickLine={false}
                      axisLine={{ stroke: COLORS.textoGrafico }}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      allowDecimals={false}
                      axisLine={{ stroke: COLORS.textoGrafico }}
                      tick={{ fontSize: 12, fill: COLORS.textoGrafico }}
                    />
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ fill: "#3AAF500D" }} 
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                    <foreignObject 
                      x="0" 
                      y="225" 
                      width="100%" 
                      height="30"
                    >
                      <Box
                        mt={1.7}
                        gap={0.5}
                        fontSize={12}
                        display="flex"
                        color={COLORS.textoGrafico}
                        alignItems="center"
                        justifyContent="center" 
                        sx={{textTransform: "capitalize"}}
                      >
                        <AccessTimeIcon sx={{fontSize: 14}} />
                        {nomeMesSelecionado} de {anoSelecionado}
                      </Box>
                    </foreignObject>
                  </BarChart>
                </ResponsiveContainer>
              )}

              <Divider sx={{mt: 1.5, borderColor: COLORS.verdeBorda}} />

              {/* LEGENDA */}
              <Stack 
                mt={1.5} 
                direction="row" 
                sx={{pl: "30px", pr: "2px"}}
              >
                {data.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ 
                      flex: 1, 
                      gap: 0.75, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        flexShrink: 0,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <Typography fontSize={12} color="textSecondary">
                      {item.shortName}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* RELATÓRIO */}
        <Box sx={{ flex: 4, display: "flex" }}>
          <Card
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              background: COLORS.fundoCard,
              border: `1.5px solid ${COLORS.verdeBorda}`
            }}
          >
            <CardContent>
              <Typography
                mb={2}
                fontSize={14}
                fontWeight={700}
                letterSpacing={1}
                color={COLORS.textoLabel}
              >
                RELATÓRIO
              </Typography>

              <Stack spacing={1.5}>
                {relatorioItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      display: "flex",
                      borderRadius: 2.5,
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: COLORS.fundoRelatorio,
                      border: `1px solid ${COLORS.verdeBorda}`,
                    }}
                  >
                    <Box 
                      sx={{ 
                        gap: 1.5, 
                        display: "flex", 
                        alignItems: "center" 
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: item.accent,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box 
                        sx={{ 
                          gap: 0.5, 
                          display: "flex", 
                          flexDirection: "column" 
                        }}
                      >
                        <Typography
                          fontSize={13}
                          fontWeight={600}
                          color={COLORS.texto1}
                        >
                          {item.label}
                        </Typography>

                        <Typography 
                          fontSize={11} 
                          fontWeight={500} 
                          color={COLORS.texto2}

                        >
                          {item.sublabel}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        minWidth: 40,
                        height: 36,
                        px: 1.5,
                        borderRadius: 2,
                        background: COLORS.branco,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 15,
                        color: COLORS.texto1,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                        border: `1px solid ${COLORS.verdeBorda}`,
                      }}
                    >
                      {
                        loadingRelatorio ? 
                        <CircularProgress 
                          size={16} 
                          sx={{ color: COLORS.verde }} 
                        /> 
                        : item.valor
                      }
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Paper>
  );
};