import styled from "styled-components";
import RowOperation from "../../Common/RowOperation";
import TableComponent from "../../Common/TableComponent";

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
  setCurrent,
  handleDelete,
}) {
  const columns = [
    {
      title: "Sample",
      dataIndex: "code",
      key: ["id", "report_id"],
      render: (code, row) =>
        code ? code + (row?.report_id ? " (#" + row?.report_id + ")" : "") : "",
    },
    {
      title: "P##",
      dataIndex: "p",
    },
    {
      title: "Substrate",
      dataIndex: "substrate",
      render: (report) => report?.name,
    },
    {
      title: "Taxa cat.",
      dataIndex: "taxa",
      render: (report) => report?.category?.name,
    },
    {
      title: "Taxa",
      dataIndex: "taxa",
      render: (taxa) => taxa?.name,
    },
    {
      title: "",
      dataIndex: "Operation",
      render: (_, record) =>
        record.children && (
          <RowOperation
            deleteRow
            updateRow
            onUpdateClick={() => setCurrent(record.report_id)}
            onDeleteConfirm={() => handleDelete(record.report_id)}
          />
        ),
    },
  ];

  return (
    <Container>
      <TableComponent
        loading={loading}
        data={data}
        columns={columns}
        meta={meta}
        rowKey={["id", "report_id"]}
        handlePageChange={(aPage) => handlePageChange(aPage)}
      />
    </Container>
  );
}

export default TableContainer;
