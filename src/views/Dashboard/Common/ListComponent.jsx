import { List, Spin } from "antd";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: transparent;
  border-radius: 5px;

  .ant-table-thead > tr > th {
    background-color: #eaeaea;
    font-weight: bold;
  }

  .ant-table-cell {
    padding: 15px 20px !important;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }

  .table-row {
    &:hover {
      cursor: pointer;
    }
  }

  .ant-table-wrapper {
    background-color: white;
  }

  .ant-pagination {
    padding: 0px 20px;
    box-sizing: border-box;
  }

  .ant-pagination-total-text {
    margin-right: auto;
  }

  tr.border-top > td {
    border-top: 1px solid #757575;
  }
`;

function ListComponent({
  data,
  meta,
  handlePageChange,
  loading,
  showQuickJumper = false,
  rowKey = "id",
  bordered = false,
  handleShowSizeChange,
  Component,
  showPaginationTotal,
}) {
  useEffect(() => {
    //This makes the table is on a page with no data after deleting the only row
    if (
      meta?.total &&
      meta?.current_page > 1 &&
      meta?.current_page > Math.ceil(meta.total / meta.per_page)
    ) {
      handlePageChange(meta.current_page - 1);
    }
  }, [meta?.total]);

  if (loading && !data)
    return <Spin style={{ width: "100%" }} tip="Loading data" />;

  return (
    <Container>
      <List
        bordered={bordered}
        pagination={
          meta
            ? {
                showQuickJumper: showQuickJumper,
                showSizeChanger: false,
                onShowSizeChange: handleShowSizeChange,
                total: meta.total,
                onChange: (e) => handlePageChange(e),
                showTotal:
                  showPaginationTotal != null
                    ? showPaginationTotal
                    : (total, range) =>
                        `${range[0]}-${range[1]} of ${total} records`,
                current: meta.current_page,
                pageSize: meta.per_page,
                size: "small",
              }
            : false
        }
        loading={loading}
        dataSource={data}
        size="small"
        rowKey={(record) => {
          if (typeof rowKey === "string") {
            return record[rowKey];
          } else {
            return rowKey.map((el) => record[el]).join(",");
          }
        }}
        renderItem={(item) => (
          <List.Item>
            <Component {...item} />
          </List.Item>
        )}
      />
    </Container>
  );
}

export default ListComponent;
