import moment from "moment";
import RowOperation from "src/views/Dashboard/Common/RowOperation";
import TableComponent from "src/views/Dashboard/Common/TableComponent";
import styled from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Container = styled.div`
  width: 100%;

  .editable-row {
    cursor: pointer;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;

function TableContainer({
  loading,
  data,
  meta,
  handlePageChange,
  handleDelete,
  download,
}) {
  const columns = [
    {
      title: "",
      fixed: "left",
      width: 80,
      render: (_, rest) => (
        <Button disabled={!rest.url} onClick={() => download(rest)}>
          <DownloadOutlined />
        </Button>
      ),
    },
    {
      title: "State",
      fixed: "left",
      dataIndex: "state",
    },
    {
      title: "Exported at",
      fixed: "left",
      dataIndex: "created_at",
      render: (val) => moment(val).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Filters",
      children: [
        {
          title: "From Date",
          index: "date_from",
          render: (val) => moment(val).format("YYYY-MM-DD"),
        },
        {
          title: "To Date",
          index: "date_to",
          render: (val) => moment(val).format("YYYY-MM-DD"),
        },
        {
          title: "Reports",
          index: "reports",
          render: (_, obj) => obj?.reports?.join(", "),
        },
        {
          title: "Depths",
          index: "depths",
          render: (_, obj) => obj?.depths?.join(", "),
        },
        {
          title: "Localities",
          index: "localities",
          render: (_, obj) => obj?.localities?.join(", "),
        },
        {
          title: "Sites",
          index: "sites",
          render: (_, obj) => obj?.sites?.join(", "),
        },
        {
          title: "Taxas",
          index: "taxas",
          render: (_, obj) => obj?.taxas?.join(", "),
        },
        {
          title: "Taxa Categories",
          index: "taxa_categories",
          render: (_, obj) => obj?.taxa_categories?.join(", "),
        },
      ],
    },
    {
      title: "",
      dataIndex: "Operation",
      render: (_, record) => (
        <RowOperation
          deleteRow
          onDeleteConfirm={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <Container>
      <TableComponent
        scroll={{ x: 1500 }}
        loading={loading}
        data={data}
        columns={columns}
        meta={meta}
        handlePageChange={(aPage) => handlePageChange(aPage)}
      />
    </Container>
  );
}

export default TableContainer;
