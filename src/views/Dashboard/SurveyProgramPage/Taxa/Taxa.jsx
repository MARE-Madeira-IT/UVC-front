import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchIndicatorSelector } from "../../../../../redux/redux-modules/indicator/actions";
import {
  createTaxa,
  deleteTaxa,
  fetchTaxas,
  updateTaxa,
} from "../../../../../redux/redux-modules/taxa/actions";
import TitleAddSection from "../../Common/TitleAddSection";
import FormContainer from "./FormContainer";
import TableContainer from "./TableContainer";

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

function Taxa(props) {
  const { data, loading, meta, surveyProgramId, indicators } = props;

  const [filters, setFilters] = useState({ survey_program: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchTaxas(1, filters);
  }, [filters]);

  useEffect(() => {
    props.fetchIndicatorSelector(filters);
  }, []);

  const handleCancel = () => {
    setCurrent();
    setVisible(false);
  };

  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  function handlePageChange(pagination) {
    props.fetchTaxas(pagination.current, filters);
  }

  return (
    <Container>
      <TitleAddSection
        title="Survey Program taxa"
        handleClick={() => setVisible(true)}
      />

      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          create={props.createTaxa}
          update={props.updateTaxa}
          surveyProgramId={surveyProgramId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by species, genus, phylum or category"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          indicators={indicators}
          setCurrent={handleEdit}
          handleDelete={props.deleteTaxa}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTaxas: (page, filters) => dispatch(fetchTaxas(page, filters)),
    fetchIndicatorSelector: (filters) =>
      dispatch(fetchIndicatorSelector(filters)),
    updateTaxa: (id, data) => dispatch(updateTaxa(id, data)),
    createTaxa: (data) => dispatch(createTaxa(data)),
    deleteTaxa: (id) => dispatch(deleteTaxa(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.taxa.loading,
    data: state.taxa.data,
    meta: state.taxa.meta,
    indicators: state.indicator.selector,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxa);
