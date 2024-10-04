import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  deleteBenthic,
  fetchBenthics,
} from "../../../../../redux/redux-modules/benthic/actions";
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

function Benthic(props) {
  const { data, loading, meta, surveyProgramId } = props;

  const [filters, setFilters] = useState({ survey_program: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchBenthics(1, filters);
  }, [filters]);

  function handlePageChange(pagination) {
    props.fetchBenthics(pagination.current, filters);
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
        title="Benthic data"
        handleClick={() => setVisible(true)}
      />
      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          surveyProgramId={surveyProgramId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by name or email"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          setCurrent={handleEdit}
          handleDelete={props.deleteBenthic}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBenthics: (page, filters) => dispatch(fetchBenthics(page, filters)),
    deleteBenthic: (id) => dispatch(deleteBenthic(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.benthic.loading,
    data: state.benthic.data,
    meta: state.benthic.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Benthic);
