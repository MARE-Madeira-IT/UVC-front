import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSelectorFunctions } from "../../../../../redux/redux-modules/function/actions";
import {
  createReport,
  deleteReport,
  fetchReports,
  updateReport,
} from "../../../../../redux/redux-modules/report/actions";
import TitleAddSection from "../../Common/TitleAddSection";
import FormContainer from "./FormContainer";
import TableContainer from "./TableContainer";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 50px 0px;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
`;

function Report(props) {
  const { data, loading, meta, surveyProgramId, permissions } = props;
  const [filters, setFilters] = useState({ survey_program: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchReports(1, filters);
    props.fetchSelectorFunctions(filters);
  }, [filters]);

  function handlePageChange(pagination) {
    props.fetchReports(pagination.current, filters);
  }

  const handleCancel = () => {
    setCurrent();
    setVisible(false);
  };

  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  return (
    <Container>
      <TitleAddSection
        permissions={permissions}
        title="Survey(s)"
        handleClick={() => setVisible(true)}
      />

      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          create={props.createReport}
          update={props.updateReport}
          surveyProgramId={surveyProgramId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by locality or site"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          setCurrent={handleEdit}
          handleDelete={props.deleteReport}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReports: (id, filters) => dispatch(fetchReports(id, filters)),
    updateReport: (id, data) => dispatch(updateReport(id, data)),
    createReport: (data) => dispatch(createReport(data)),
    deleteReport: (id) => dispatch(deleteReport(id)),
    fetchSelectorFunctions: (filters) =>
      dispatch(fetchSelectorFunctions(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.report.loading,
    data: state.report.data,
    meta: state.report.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
