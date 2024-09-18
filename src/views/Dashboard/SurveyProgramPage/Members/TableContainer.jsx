import { Avatar } from "antd";
import { connect } from "react-redux";
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

const colorDecoder = {
  admin: "gold",
  validator: "cyan",
};

function TableContainer({
  loading,
  data,
  meta,
  handlePageChange,
  setCurrentUser,
  handleDelete,
  permissions,
  auth_user,
}) {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "",
      dataIndex: "image",
      render: (image) => (
        <Avatar size="large" icon={<img src={image} alt="profile" />} />
      ),
    },

    {
      title: "Name",
      dataIndex: "userable",
      render: (userable) => userable.user.name,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "State",
      dataIndex: "accepted",
      render: (accepted) => (accepted ? "Member" : "Invited"),
    },
    {
      title: "",
      dataIndex: "Operation",
      key: "operation",
      render: (_, record) => {
        if (permissions.includes("admin") && auth_user.id !== record.id) {
          return (
            <RowOperation
              onUpdateClick={() => {
                setCurrentUser(record.id);
              }}
              onDeleteConfirm={() => handleDelete(record.id)}
            />
          );
        }
      },
    },
  ];

  //TODO: ERRO A EDITAR PERMISSOES, AO EDITAR A DATA ATUALIZA, MAS A ABRIR O RECORD ESTA DESATUALIZADO

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

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions.data,
    auth_user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(TableContainer);
