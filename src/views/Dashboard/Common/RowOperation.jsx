import { Dropdown, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledDropdownLink = styled.span`
  color: inherit;
`;
const RowOperation = (props) => {
  const { onDeleteConfirm, onUpdateClick, permissions = [] } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsAux = [];

    if (permissions.includes("edit") && onUpdateClick) {
      itemsAux.push({
        key: "1",
        label: onUpdateClick && (
          <a onClick={() => onUpdateClick()} href="#">
            Update
          </a>
        ),
      });
    }

    if (permissions.includes("delete")) {
      itemsAux.push({
        key: "2",
        label: (
          <Popconfirm
            title="Do you want to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDeleteConfirm()}
          >
            Delete
          </Popconfirm>
        ),
      });
    }
    setItems(itemsAux);
  }, [permissions]);

  if (items?.length === 0) {
    return null;
  }

  return (
    <Dropdown menu={{ items }}>
      <StyledDropdownLink className="ant-dropdown-link">
        <img src="/assets/icons/dropdown.svg" alt="dropdown" />
      </StyledDropdownLink>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions.data,
  };
};

export default connect(mapStateToProps, null)(RowOperation);
