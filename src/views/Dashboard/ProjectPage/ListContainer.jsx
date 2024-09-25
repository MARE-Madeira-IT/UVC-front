import styled from "styled-components";
import ListComponent from "../Common/ListComponent";

const Container = styled.div`
  width: 100%;

  .editable-row {
    cursor: pointer;
  }
  .ant-list .ant-list-items > .ant-list-item {
    padding: 0;
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
        showPaginationTotal={false}
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
