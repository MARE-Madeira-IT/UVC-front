import { Select } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSelectorReports } from "../../../../../redux/redux-modules/report/actions";
import styled from "styled-components";

const CustomSelect = styled(Select)`
  .ant-select-selection-overflow {
    max-height: 100px;
  }
`;

function RemoteSelectContainer(props) {
  useEffect(() => {
    props.fetchSelectorReports({ surveyProgram: props.surveyProgramId });
  }, []);

  const labelRender = (props) => {
    const { label, value } = props;

    return (
      <span>
        {label} (#{value})
      </span>
    );
  };

  return (
    <CustomSelect
      maxTagCount={props.maxTagCount}
      mode={props.mode}
      value={props.value}
      labelRender={labelRender}
      optionFilterProp="code"
      showSearch
      fieldNames={{
        label: "code",
        value: "id",
      }}
      options={props.data}
      onChange={props.onChange}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorReports: (filters) => dispatch(fetchSelectorReports(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.report.selector,
    loading: state.report.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteSelectContainer);
