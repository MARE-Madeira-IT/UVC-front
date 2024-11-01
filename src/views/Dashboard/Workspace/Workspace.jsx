import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createWorkspace,
  deleteWorkspace,
  fetchSelfWorkspaces,
  handleWorkspaceUsers,
  setCurrentWorkspace,
  updateWorkspace,
} from "../../../../redux/redux-modules/workspace/actions";
import styled from "styled-components";
import TitleAddSection from "../Common/TitleAddSection";
import FormContainer from "./FormContainer";
import { EditFilled, UserOutlined, DeleteFilled } from "@ant-design/icons";
import ListContainer from "./ListContainer";
import MembersFormContainer from "../Common/MembersFormContainer";
import { Input, Popconfirm, Row } from "antd";

const ContentContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Container = styled.section`
  width: 100%;
  box-sizing: border-box;
`;

const WorkspaceContainer = styled.div`
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);

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

function Workspace(props) {
  const { workspaces, loading, selfMeta } = props;

  const [visible, setVisible] = useState(false);
  const [membersVisible, setMembersVisible] = useState(false);
  const [current, setCurrent] = useState();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    props.fetchSelfWorkspaces(1, filters);
  }, [filters]);

  useEffect(() => {
    props.fetchSelfWorkspaces(1, filters);
  }, []);

  const handleCancel = () => {
    setVisible(false);
    setMembersVisible(false);
    setCurrent();
  };

  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  const handleMembers = (aCurrent) => {
    setCurrent(aCurrent);
    setMembersVisible(true);
  };

  function handlePageChange(page) {
    props.fetchSelfWorkspaces(page, filters);
  }

  return (
    <Container>
      <ContentContainer>
        {/* <MembersFormContainer
          current={current}
          visible={membersVisible}
          data={workspaces}
          handleCancel={handleCancel}
          handleUsers={props.handleUsers}
        /> */}

        <FormContainer
          current={current}
          visible={visible}
          handleCancel={handleCancel}
          create={props.createWorkspace}
          update={props.updateWorkspace}
        />

        <TitleAddSection
          forceShow
          title="Workspace(s)"
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
        <ListContainer
          handlePageChange={handlePageChange}
          data={workspaces}
          loading={loading}
          meta={selfMeta}
          Component={(item) => {
            return (
              <WorkspaceContainer key={item.id}>
                <div className="header">
                  <h3>{item.name}</h3>

                  <div className="links-container">
                    <Link
                      onClick={() => props.setCurrentWorkspace(item)}
                      to={"/dashboard/projects?workspace_id=" + item.id}
                    >
                      <button onClick={null}>
                        <p>Projects</p>
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
                      {/* {item?.permissions?.includes("admin") && (
                        <button onClick={() => handleMembers(item.id)}>
                          <p>Members</p>
                          <UserOutlined />
                        </button>
                      )} */}
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
                          onConfirm={() => props.deleteWorkspace(item.id)}
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
              </WorkspaceContainer>
            );
          }}
        />
      </ContentContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelfWorkspaces: (page, filters) =>
      dispatch(fetchSelfWorkspaces(page, filters)),
    updateWorkspace: (id, data) => dispatch(updateWorkspace(id, data)),
    deleteWorkspace: (id, data) => dispatch(deleteWorkspace(id, data)),
    createWorkspace: (data) => dispatch(createWorkspace(data)),
    handleUsers: (id, data) => dispatch(handleWorkspaceUsers(id, data)),
    setCurrentWorkspace: (workspace) =>
      dispatch(setCurrentWorkspace(workspace)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.workspace.loading,
    workspaces: state.workspace.selfData,
    selfMeta: state.workspace.selfMeta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
