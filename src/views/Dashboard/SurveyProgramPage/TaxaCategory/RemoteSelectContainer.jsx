import { Select } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSelectorTaxaCategories } from "../../../../../redux/redux-modules/taxa_category/actions";

function RemoteSelectContainer(props) {
  useEffect(() => {
    props.fetchSelectorCategories({ survey_program: props.surveyProgramId });
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
    fetchSelectorCategories: (filters) =>
      dispatch(fetchSelectorTaxaCategories(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.taxa_category.selector,
    loading: state.taxa_category.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteSelectContainer);
