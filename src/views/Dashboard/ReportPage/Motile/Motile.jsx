import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  createMotile,
  deleteMotile,
  fetchMotiles,
  updateMotile,
} from "../../../../../redux/redux-modules/motile/actions";
import { fetchSelectorTaxas } from "../../../../../redux/redux-modules/taxa/actions";
import FormContainer from "./FormContainer";
import TableContainer from "./TableContainer";

import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

function Motile(props) {
  const { data, loading, meta, surveyProgramId } = props;

  const [filters, setFilters] = useState({ survey_program: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchMotiles(1, filters);
  }, [filters]);
  useEffect(() => {
    props.fetchSelectorTaxas({ surveyProgram: surveyProgramId });
  }, []);

  function handlePageChange(pagination) {
    props.fetchMotiles(pagination.current, filters);
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
      <TitleAddSection title="Motile(s)" handleClick={() => setVisible(true)} />

      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          create={props.createMotile}
          update={props.updateMotile}
          surveyProgramId={surveyProgramId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by sample code or site"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          setCurrent={handleEdit}
          handleDelete={props.deleteMotile}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMotiles: (page, filters) => dispatch(fetchMotiles(page, filters)),
    updateMotile: (id, data) => dispatch(updateMotile(id, data)),
    createMotile: (data) => dispatch(createMotile(data)),
    deleteMotile: (id) => dispatch(deleteMotile(id)),
    fetchSelectorTaxas: () => dispatch(fetchSelectorTaxas()),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.motile.loading,
    data: state.motile.data,
    meta: state.motile.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Motile);
