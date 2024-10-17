import { DeleteFilled, EditFilled, UserOutlined } from "@ant-design/icons";
import { Empty, Input, Popconfirm, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  createProject,
  deleteProject,
  fetchSelfProjects,
  handleProjectUsers,
  setCurrentProject,
  updateProject,
} from "../../../../redux/redux-modules/project/actions";
import { setCurrentWorkspace } from "../../../../redux/redux-modules/workspace/actions";
import MembersFormContainer from "../Common/MembersFormContainer";
import TitleAddSection from "../Common/TitleAddSection";
import FormContainer from "./FormContainer";
import ListContainer from "./ListContainer";

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

const ProjectContainer = styled.div`
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

function ProjectPage(props) {
  const [searchParams] = useSearchParams();

  const { data, currentWorkspace, meta, loading, workspaces } = props;

  const [current, setCurrent] = useState();
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    workspace: [parseInt(searchParams.get("workspace_id"))],
  });
  const [membersVisible, setMembersVisible] = useState(false);

  useEffect(() => {
    props.fetchSelfProjects(1, filters);
  }, [filters]);

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
    let workspaceId = parseInt(searchParams.get("workspace_id"));
    props.fetchSelfProjects(null, filters);
    // axiosConfig.defaults.headers.common["workspace"] = workspaceId;

    if (!currentWorkspace) {
      props.setCurrentWorkspace(
        workspaces?.find((el) => el.id === workspaceId)
      );
    }
  }, []);

  function handlePageChange(page) {
    props.fetchSelfProjects(page, filters);
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
        create={props.createProject}
        update={props.updateProject}
      />
      <ListSection>
        <h1 style={{ fontSize: "1.725rem", textDecoration: "underline" }}>
          {currentWorkspace?.name}
        </h1>
        <TitleAddSection
          forceShow
          title="Project(s)"
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
            Component={(item) => {
              return (
                <ProjectContainer key={item.id}>
                  <div className="header">
                    <h3>{item.name}</h3>

                    <div className="links-container">
                      <Link
                        onClick={() => {
                          props.setCurrentProject(item);
                        }}
                        to={`/dashboard/surveyPrograms?workspace_id=${currentWorkspace.id}&project_id=${item.id}`}
                      >
                        <button>
                          <p>Survey Programs</p>
                          <img src="/assets/icons/link.svg" alt="" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <Row justify="space-between" align="bottom">
                    <div className="team">
                      {item.users.map((member) => (
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
                        {item?.permissions?.includes("admin") && (
                          <button onClick={() => handleMembers(item.id)}>
                            <p>Members</p>
                            <UserOutlined />
                          </button>
                        )}
                        {item?.permissions?.includes("admin") && (
                          <button onClick={() => handleEdit(item.id)}>
                            <p>Edit</p>
                            <EditFilled />
                          </button>
                        )}

                        {item?.permissions?.includes("admin") && (
                          <Popconfirm
                            title="Do you want to delete?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => props.deleteProject(item.id)}
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
                </ProjectContainer>
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
    fetchSelfProjects: (page, filters) =>
      dispatch(fetchSelfProjects(page, filters)),
    updateProject: (id, data) => dispatch(updateProject(id, data)),
    createProject: (data) => dispatch(createProject(data)),
    deleteProject: (data) => dispatch(deleteProject(data)),
    handleUsers: (id, data) => dispatch(handleProjectUsers(id, data)),
    setCurrentWorkspace: (workspace) =>
      dispatch(setCurrentWorkspace(workspace)),
    setCurrentProject: (workspace) => dispatch(setCurrentProject(workspace)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.project.selfData,
    workspaces: state.workspace.selfData,
    meta: state.project.selfMeta,
    loading: state.project.loading,
    currentWorkspace: state.workspace.current,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
