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
    // {
    //   title: "#",
    //   dataIndex: "id",
    //   fixed: "left",
    //   width: 80,
    // },
    {
      title: "Sample",
      dataIndex: "code",
      width: 250,
      fixed: "left",
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 200,
    },
    {
      title: "Taxa category",
      dataIndex: "taxa",
      width: 200,
      render: (taxa) => taxa?.category?.name,
    },
    {
      title: "Genus",
      dataIndex: "taxa",
      width: 200,
      render: (taxa) => taxa?.genus,
    },
    {
      title: "Species",
      dataIndex: "taxa",
      width: 200,
      render: (taxa) => taxa?.species,
    },
    {
      title: "Taxa",
      dataIndex: "taxa",
      width: 250,
      render: (taxa) => taxa?.name,
    },
    {
      title: "Size category",
      dataIndex: "sizeCategory",
      width: 150,
      render: (sizeCategory) => sizeCategory?.name,
    },
    {
      title: "Size (cm)",
      dataIndex: "size",
      width: 150,
    },
    {
      title: "ntotal",
      dataIndex: "ntotal",
      width: 150,
    },
    {
      title: "Density/100",
      width: 150,
      render: (_, rest) => (rest["density/1"] ? rest["density/1"] / 100 : ""),
    },
    {
      title: "Density/1",
      dataIndex: "density/1",
      width: 150,
    },
    {
      title: "gr/100",
      width: 150,
      render: (_, rest) => (rest["biomass/1"] ? rest["biomass/1"] / 100 : ""),
    },
    {
      title: "gr/1",
      dataIndex: "biomass/1",
      width: 150,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: 300,
    },
    {
      title: "",
      dataIndex: "Operation",
      fixed: "right",
      width: 80,
      render: (_, record) =>
        record.children && (
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
        scroll={{ x: 1500 }}
        rowKey={["report_id", "type", "id"]}
      />
    </Container>
  );
}

export default TableContainer;
