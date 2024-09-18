import { Input, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchUsers } from "../../../../../redux/redux-modules/user/actions";
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

function Members({ data, loading, meta, fetchUsers, surveyProgramId, permissions }) {
  const [filters, setFilters] = useState({ surveyProgram: surveyProgramId });
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetchUsers(1, filters);
  }, [filters]);

  function handlePageChange(pagination) {
    fetchUsers(pagination.current, filters);
  }

  const handleEdit = (aCurrent) => {
    setCurrentUser(aCurrent);
    setVisible(true);
  };

  return (
    <Container>
      <TitleAddSection
        title="Member(s)"
        hideAdd={!permissions.includes("admin")}
        handleClick={() => setVisible(true)}
      />
      <ContentContainer>
        <FormContainer
          currentUser={currentUser}
          visible={visible}
          setVisible={setVisible}
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
          data={[...data]}
          loading={loading}
          meta={meta}
          setVisible={setVisible}
          setCurrentUser={handleEdit}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, filters) => dispatch(fetchUsers(page, filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    data: state.user.data,
    meta: state.user.meta,
    permissions: state.permissions.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
