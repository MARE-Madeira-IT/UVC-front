import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createTaxaCategory,
  deleteTaxaCategory,
  fetchTaxaCategories,
  updateTaxaCategory,
} from "../../../../../redux/redux-modules/taxa_category/actions";
import styled from "styled-components";
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

function TaxaCategory(props) {
  const { data, loading, meta, projectId, indicators } = props;

  const [filters, setFilters] = useState({ project: projectId });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();

  useEffect(() => {
    props.fetchTaxaCategories(1, filters);
  }, [filters]);

  const handleCancel = () => {
    setCurrent();
    setVisible(false);
  };

  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  function handlePageChange(pagination) {
    props.fetchTaxaCategories(pagination.current, filters);
  }

  return (
    <Container>
      <TitleAddSection
        title="Project taxa"
        handleClick={() => setVisible(true)}
      />

      <ContentContainer>
        <FormContainer
          visible={visible}
          handleCancel={handleCancel}
          current={current}
          create={props.createTaxaCategory}
          update={props.updateTaxaCategory}
          projectId={projectId}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search by category"
          />
        </Row>
        <TableContainer
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          indicators={indicators}
          setCurrent={handleEdit}
          handleDelete={props.deleteTaxaCategory}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTaxaCategories: (page, filters) =>
      dispatch(fetchTaxaCategories(page, filters)),
    updateTaxaCategory: (id, data) => dispatch(updateTaxaCategory(id, data)),
    createTaxaCategory: (data) => dispatch(createTaxaCategory(data)),
    deleteTaxaCategory: (id) => dispatch(deleteTaxaCategory(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.taxa_category.loading,
    data: state.taxa_category.data,
    meta: state.taxa_category.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxaCategory);
