import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { COLORS } from "../../styles/colors.js";
import { Table, Input, Button, Space } from "antd";

export const MyTable = ({ columns, data, rowClassName, loading }) => {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (confirm, dataIndex, selectedKeys) => {
    confirm();
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 12,
          minWidth: 220,
          borderRadius: 10,
          background: COLORS.branco,
          boxShadow: `0 6px 20px ${COLORS.preto}`,
          border: `1px solid ${COLORS.verdeBorda}`,
        }}
      >
        <Input
          ref={searchInput}
          value={selectedKeys[0]}
          placeholder="Buscar..."
          onPressEnter={() => handleSearch(confirm, selectedKeys, dataIndex)}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{
            fontSize: 15,
            marginBottom: 8,
            borderRadius: 6,
            display: "block",
            borderColor: COLORS.accentBordaVerde,
          }}
        />

        <Space>
          <Button
            size="small"
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearch(confirm, dataIndex, selectedKeys)}
            style={{
              fontSize: 12,
              border: "none",
              borderRadius: 6,
              background: `linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
            }}
          >
            Pesquisar
          </Button>

          <Button
            size="small"
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{
              fontSize: 12,
              borderRadius: 6,
              color: COLORS.branco,
              borderColor: COLORS.verdeEscuro,
              background: `linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
            }}
          >
            Limpar
          </Button>

          <Button
            type="link"
            size="small"
            onClick={close}
            style={{
              fontSize: 12,
              color: COLORS.texto2,
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? COLORS.verde : COLORS.cinza, fontSize: 12 }}
      />
    ),

    onFilter: (value, record) =>
      (record[dataIndex] ?? "")
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    filterDropdownProps: {
      onOpenChange: (open) => {
        if (open)
          setTimeout(() => searchInput.current?.select(), 100);
      },
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: COLORS.verdeDisable, padding: "1px 2px", borderRadius: 3 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const enhancedColumns = columns.map((col) =>
    col.searchable ? { ...col, ...getColumnSearchProps(col.dataIndex) } : col
  );

  return (
    <>
      <style>
        {`
          // /* BOTÃO OK FILTRO */
          // .ant-table-filter-dropdown .ant-btn-primary {
          //   background: linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro}) !important;
          //   border-color: ${COLORS.verdeEscuro} !important;
          //   color: ${COLORS.branco} !important;
          //   box-shadow: 0 2px 6px ${COLORS.sombraVerde} !important;
          // }
          // .ant-table-filter-dropdown .ant-btn-primary:hover {
          //   background: linear-gradient(135deg, ${COLORS.verdeEscuro}, ${COLORS.verdeHover}) !important;
          // }

          // /* BOTÃO RESET */
          // .ant-table-filter-dropdown .ant-btn-link {
          //   color: ${COLORS.verde} !important;
          // }
          // .ant-table-filter-dropdown .ant-btn-link:disabled {
          //   color: ${COLORS.cinzaTexto} !important;
          //   cursor: not-allowed !important;
          //   opacity: 0.5 !important;
          // }

          // /* CHECK BOX MARCADO */
          // .ant-table-filter-dropdown .ant-checkbox-checked .ant-checkbox-inner {
          //   background-color: ${COLORS.verde} !important;
          //   border-color: ${COLORS.verde} !important;
          // }

          // /* CHECK BOX HOVER */
          // .ant-table-filter-dropdown .ant-checkbox-wrapper:hover .ant-checkbox-inner,
          // .ant-table-filter-dropdown .ant-checkbox:hover .ant-checkbox-inner {
          //   border-color: ${COLORS.verde} !important;
          // }

          // /* FOCO CHECKBOX */
          // .ant-table-filter-dropdown .ant-checkbox-input:focus + .ant-checkbox-inner {
          //   border-color: ${COLORS.verde} !important;
          //   box-shadow: 0 0 0 2px ${COLORS.sombraVerde} !important;
          // }

          // /* FUNDO ITEM SELECIONADO */
          // .ant-table-filter-dropdown .ant-dropdown-menu-item-selected {
          //   background-color: ${COLORS.verdeClaro} !important;
          //   color: ${COLORS.texto1} !important;
          // }

          /* BOTÃO OK PESQUISA */
          .helpdesk-table .ant-table-filter-dropdown .ant-btn-primary {
            background: linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro}) !important;
            border: none !important;
            box-shadow: 0 2px 6px ${COLORS.sombraVerde} !important;
          }

          /* HOVER OK */
          .helpdesk-table .ant-table-filter-dropdown .ant-btn-primary:hover {
            background: linear-gradient(135deg, ${COLORS.verdeEscuro}, ${COLORS.verdeHover}) !important;
          }

          /* BOTÃO LIMPAR */
          .helpdesk-table .ant-table-filter-dropdown .ant-btn-default {
            color: ${COLORS.branco} !important;
            border-color: ${COLORS.verdeEscuro} !important;
            background: linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro}) !important;
            box-shadow: 0 2px 6px ${COLORS.sombraVerde} !important;
          }

          /* HOVER LIMPAR */
          .helpdesk-table .ant-table-filter-dropdown .ant-btn-default:hover {
            color: ${COLORS.branco} !important;
            border-color: ${COLORS.verdeHover} !important;
            background: linear-gradient(135deg, ${COLORS.verdeEscuro}, ${COLORS.verdeHover}) !important;
          }

          /* FONTE GLOBAL DA TABELA */
          .helpdesk-table .ant-table {
            font-size: 13px;
            background: ${COLORS.branco};
            border-radius: 12px;
            overflow: hidden;
            border: 1.5px solid ${COLORS.verdeBorda};
          }

          /* CABEÇALHO */
          .helpdesk-table .ant-table-thead > tr > th {
            background: ${COLORS.branco};
            color: ${COLORS.texto1};
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.4px;
            border-bottom: 1.5px solid ${COLORS.verdeBorda};
            padding: 12px 16px;
          }

          /* CÉLULAS */
          .helpdesk-table .ant-table-tbody > tr > td {
            font-size: 13px;
            color: ${COLORS.texto1};
            border-bottom: 1px solid ${COLORS.verdeClaro};
            padding: 12px 16px;
          }

          /* LINHA EM ANDAMENTO */
          .helpdesk-table .row-em-andamento > td {
            background-color: ${COLORS.accentLaranja} !important;
          }

          /* PAGINAÇÃO */
          .helpdesk-table .ant-pagination-item-active {
            border-color: ${COLORS.verde};
          }
          .helpdesk-table .ant-pagination-item-active a {
            color: ${COLORS.verde};
          }
          .helpdesk-table .ant-pagination-item:hover {
            border-color: ${COLORS.verde};
          }
          .helpdesk-table .ant-pagination-item:hover a {
            color: ${COLORS.verde};
          }
          .helpdesk-table .ant-pagination-prev:hover .ant-pagination-item-link,
          .helpdesk-table .ant-pagination-next:hover .ant-pagination-item-link {
            color: ${COLORS.verde};
            border-color: ${COLORS.verde};
          }

          /* ÍCONE DE FILTRO ATIVO */
          .helpdesk-table .ant-table-filter-trigger.active {
            color: ${COLORS.verde};
          }
        `}
      </style>

      <Table
        className="helpdesk-table"
        rowKey="key"
        loading={loading}
        dataSource={data}
        columns={enhancedColumns}
        rowClassName={rowClassName}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
    </>
  );
};