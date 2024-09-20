import styled from "styled-components";
import ListComponent from "../Common/ListComponent";

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

  .ant-badge > .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }
`;
const ListContainer = ({
  data,
  meta,
  handlePageChange,
  loading,
  Component,
}) => {
  return (
    <Container>
      <ListComponent
        loading={loading}
        data={data}
        meta={meta}
        handlePageChange={(aPage) => handlePageChange(aPage)}
        Component={Component}
      />
    </Container>
  );
};

export default ListContainer;
