import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  createDepth,
  deleteDepth,
  fetchDepths,
  updateDepth,
} from "../../../../../redux/redux-modules/depth/actions";
import TitleAddSection from "../../Common/TitleAddSection";
import FormContainer from "./FormContainer";
import TableContainer from "./TableContainer";

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Container = styled.section`
  width: 100%;
  box-sizing: border-box;
`;

function Depth(props) {
  const { data, loading, meta, surveyProgramId } = props;

  const [filters, setFilters] = useState({ survey_program: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchDepths(1, filters);
  }, [filters]);

  function handlePageChange(pagination) {
    props.fetchDepths(pagination.current, filters);
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
        title="Depth categories"
        handleClick={() => setVisible(true)}
      />

      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          create={props.createDepth}
          update={props.updateDepth}
          surveyProgramId={surveyProgramId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by depth"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          setCurrent={handleEdit}
          handleDelete={props.deleteDepth}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDepths: (page, filters) => dispatch(fetchDepths(page, filters)),
    updateDepth: (id, data) => dispatch(updateDepth(id, data)),
    createDepth: (data) => dispatch(createDepth(data)),
    deleteDepth: (id) => dispatch(deleteDepth(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.depth.loading,
    data: state.depth.data,
    meta: state.depth.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Depth);
