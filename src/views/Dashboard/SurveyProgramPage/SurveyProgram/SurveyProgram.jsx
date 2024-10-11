import {
  DeleteFilled,
  EditFilled,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Empty, Input, Popconfirm, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import axiosConfig from "src/axiosConfig";
import styled from "styled-components";
import { setCurrentProject } from "../../../../../redux/redux-modules/project/actions";
import {
  createSurveyProgram,
  deleteSurveyProgram,
  fetchSelfSurveyPrograms,
  handleSurveyProgramUsers,
  updateSurveyProgram,
} from "../../../../../redux/redux-modules/surveyProgram/actions";
import { setCurrentWorkspace } from "../../../../../redux/redux-modules/workspace/actions";
import MembersFormContainer from "../../Common/MembersFormContainer";
import FormContainer from "./FormContainer";
import ListContainer from "./ListContainer";
import TitleAddSection from "../../Common/TitleAddSection";

const Container = styled.section`
  width: 100%;
  display: flex;
  margin: 50px 0px;
  box-sizing: border-box;
`;

const ListSection = styled.section`
  width: 100%;
  box-sizing: border-box;
`;

const SurveyProgramContainer = styled.div`
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  .team {
    display: flex;
    align-items: flex-start;
    gap: 50px;
    margin: 20px 0px;
    flex-wrap: wrap;
  }

  .team-member {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 50px;
      height: auto;
      border-radius: 50%;
    }

    p {
      margin: 0px;
    }

    .role {
      opacity: 0.5;
    }
  }

  .links-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    button {
      cursor: pointer;
      background-color: #0c4c88;
      padding: 8px;
      box-sizing: border-box;
      border: 0px;
      box-shadow: 0px;
      display: flex;
      gap: 15px;
      color: white;
      flex-direction: row;
      align-items: center;

      p {
        margin: 0;
      }

      img {
        width: 12px;
      }

      svg {
        color: white;
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

function SurveyProgram(props) {
  const [searchParams] = useSearchParams();

  const {
    data,
    currentWorkspace,
    meta,
    loading,
    workspaces,
    projects,
    currentProject,
  } = props;

  const [current, setCurrent] = useState();
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    project: [parseInt(searchParams.get("project_id"))],
  });
  const [membersVisible, setMembersVisible] = useState(false);

  const handleMembers = (aCurrent) => {
    setCurrent(aCurrent);
    setMembersVisible(true);
  };
  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setMembersVisible(false);
    setCurrent();
  };

  useEffect(() => {
    props.fetchSelfSurveyPrograms(1, filters);
  }, [filters]);

  useEffect(() => {
    let workspaceId = parseInt(searchParams.get("workspace_id"));
    let projectId = parseInt(searchParams.get("project_id"));
    props.fetchSelfSurveyPrograms(1, filters);
    axiosConfig.defaults.headers.common["workspace"] = workspaceId;

    if (!currentWorkspace) {
      props.setCurrentWorkspace(
        workspaces?.find((el) => el.id === workspaceId)
      );
    }
    if (!currentProject) {
      props.setCurrentProject(projects?.find((el) => el.id === projectId));
    }
  }, []);

  function handlePageChange(page) {
    props.fetchSelfSurveyPrograms(page, filters);
  }

  return (
    <Container>
      <MembersFormContainer
        current={current}
        visible={membersVisible}
        data={data}
        handleCancel={handleCancel}
        handleUsers={props.handleUsers}
      />

      <FormContainer
        current={current}
        visible={visible}
        handleCancel={handleCancel}
        create={props.createSurveyProgram}
        update={props.updateSurveyProgram}
      />
      <ListSection>
        <h1 style={{ fontSize: "1.725rem", textDecoration: "underline" }}>
          {currentWorkspace?.name} - {currentProject?.name}
        </h1>
        <TitleAddSection
          forceShow
          title="Survey Program(s)"
          handleClick={() => setVisible(true)}
        />
        <Row style={{ marginBottom: "20px" }}>
          <Input.Search
            onSearch={(e) => setFilters({ ...filters, search: e })}
            size="large"
            type="search"
            placeholder="Search"
          />
        </Row>
        {data?.length === 0 ? (
          <Empty />
        ) : (
          <ListContainer
            handlePageChange={handlePageChange}
            data={data}
            loading={loading}
            meta={meta}
            Component={(surveyProgram) => {
              return (
                <SurveyProgramContainer key={surveyProgram?.id}>
                  <div className="header">
                    <h3>{surveyProgram?.name}</h3>

                    <div className="links-container">
                      <Link
                        to={
                          "/dashboard/surveyProgram/" +
                          surveyProgram.id +
                          "/reports"
                        }
                      >
                        <button>
                          <p>Metadata</p>
                          <img src="/assets/icons/edit.svg" alt="" />
                        </button>
                      </Link>
                      <Link
                        to={"/dashboard/surveyPrograms/" + surveyProgram.id}
                      >
                        <button>
                          <p>Survey Program</p>
                          <img src="/assets/icons/link.svg" alt="" />
                        </button>
                      </Link>
                      <Link
                        to={`${
                          import.meta.env.VITE_API
                        }/api/export/${surveyProgram.id}`}
                      >
                        <button>
                          <p>Export</p>
                          <FileOutlined />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <p>{surveyProgram?.description}</p>
                  <Row justify="space-between" align="bottom">
                    <div className="team">
                      {surveyProgram?.users?.map((member) => (
                        <div key={member.id} className="team-member">
                          <img
                            src={"https://wave-labs.org/" + member.photo}
                            alt="profile picture"
                          />
                          <div className="details">
                            <p className="name">{member.userable.user.name}</p>
                            {/* <p className='role'>{member.role}</p> */}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Row>
                      <div className="links-container">
                        {surveyProgram?.permissions?.includes("admin") && (
                          <button
                            onClick={() => handleMembers(surveyProgram.id)}
                          >
                            <p>Members</p>
                            <UserOutlined />
                          </button>
                        )}
                        {surveyProgram?.permissions?.includes("admin") && (
                          <button onClick={() => handleEdit(surveyProgram.id)}>
                            <p>Edit</p>
                            <EditFilled />
                          </button>
                        )}

                        {surveyProgram?.permissions?.includes("admin") && (
                          <Popconfirm
                            title="Do you want to delete?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() =>
                              props.deleteSurveyProgram(surveyProgram.id)
                            }
                          >
                            <button style={{ backgroundColor: "#f34747" }}>
                              Delete
                              <DeleteFilled />
                            </button>
                          </Popconfirm>
                        )}
                      </div>
                    </Row>
                  </Row>
                </SurveyProgramContainer>
              );
            }}
          />
        )}
      </ListSection>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelfSurveyPrograms: (page, filters) =>
      dispatch(fetchSelfSurveyPrograms(page, filters)),
    updateSurveyProgram: (id, data) => dispatch(updateSurveyProgram(id, data)),
    createSurveyProgram: (data) => dispatch(createSurveyProgram(data)),
    deleteSurveyProgram: (id) => dispatch(deleteSurveyProgram(id)),
    handleUsers: (id, data) => dispatch(handleSurveyProgramUsers(id, data)),
    setCurrentWorkspace: (workspace) =>
      dispatch(setCurrentWorkspace(workspace)),
    setCurrentProject: (project) => dispatch(setCurrentProject(project)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.surveyProgram.selfData,
    meta: state.surveyProgram.selfMeta,
    loading: state.surveyProgram.loading,
    currentWorkspace: state.workspace.current,
    workspaces: state.workspace.selfData,
    currentProject: state.project.current,
    projects: state.project.selfData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyProgram);
