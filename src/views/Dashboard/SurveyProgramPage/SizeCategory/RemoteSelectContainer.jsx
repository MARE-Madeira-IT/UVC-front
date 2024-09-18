import { Select } from "antd";
import React, { useEffect } from "react";
import { fetchSelectorSizeCategories } from "../../../../../redux/redux-modules/size_category/actions";
import { connect } from "react-redux";

function RemoteSelectContainer(props) {
  useEffect(() => {
    props.fetchSelectorSizeCategories();
  }, []);

  return (
    <Select
      onChange={(e) => props.onChange(e)}
      value={props.value}
      showSearch
      fieldNames={{
        label: "name",
        value: "id",
      }}
      options={props.data}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorSizeCategories: (filters) =>
      dispatch(fetchSelectorSizeCategories(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.size_category.selector,
    loading: state.size_category.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteSelectContainer);
