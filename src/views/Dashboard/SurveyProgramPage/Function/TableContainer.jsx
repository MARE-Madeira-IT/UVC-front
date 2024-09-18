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
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Depth",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "Operation",
      width: 50,
      render: (_, record) => (
        <RowOperation
          deleteRow
          updateRow
          onUpdateClick={() => setCurrent(record.id)}
          onDeleteConfirm={() => handleDelete(record.id)}
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
        handlePageChange={(aPage) => handlePageChange(aPage)}
      />
    </Container>
  );
}

export default TableContainer;
