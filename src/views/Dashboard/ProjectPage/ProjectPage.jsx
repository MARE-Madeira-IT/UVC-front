import { EditFilled } from "@ant-design/icons";
import { Empty, Select } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { fetchSelfProjects } from "../../../../redux/redux-modules/project/actions";
import { fetchSurveyProgramInvites } from "../../../../redux/redux-modules/surveyProgram/actions";
import FormContainer from "./FormContainer";
import { fetchWorkspacesSelector } from "../../../../redux/redux-modules/workspace/actions";
import axiosConfig from "src/axiosConfig";

const Container = styled.section`
  width: 100%;
  display: flex;
  margin: 50px 0px;
  box-sizing: border-box;
`;

const ListContainer = styled.section`
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
  }
`;

function ProjectPage(props) {
  const [searchParams] = useSearchParams();

  const { data, currentWorkspace } = props;

  const [current, setCurrent] = useState();
  const [visible, setVisible] = useState(false);

  const handleEdit = (aCurrent) => {
    setCurrent(aCurrent);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrent();
  };

  useEffect(() => {
    let workspaceId = parseInt(searchParams.get("workspace_id"));
    props.fetchSelfProjects({
      workspace: [parseInt(searchParams.get("workspace_id"))],
    });
    axiosConfig.defaults.headers.common["workspace"] = workspaceId;
  }, []);

  return (
    <Container>
      <FormContainer
        current={current}
        visible={visible}
        handleCancel={handleCancel}
        create={props.createWorkspace}
        update={props.updateWorkspace}
      />
      <ListContainer>
        <h1 style={{ fontSize: "1.725rem", textDecoration: "underline" }}>
          {currentWorkspace?.name}
        </h1>
        <h2>Project(s)</h2>

        {data?.length === 0 ? (
          <Empty />
        ) : (
          data?.map((project, i) => (
            <ProjectContainer key={i}>
              <div className="header">
                <h3>{project.name}</h3>

                <div className="links-container">
                  <Link
                    to={"/dashboard/surveyPrograms?project_id=" + project.id}
                  >
                    <button>
                      <p>Projects</p>
                      <img src="/assets/icons/link.svg" alt="" />
                    </button>
                  </Link>
                  <button onClick={() => handleEdit(project.id)}>
                    <p>Edit</p>
                    <EditFilled />
                  </button>
                </div>
              </div>
              <p>{project.description}</p>

              <div className="team">
                {project.users.map((member) => (
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
            </ProjectContainer>
          ))
        )}
      </ListContainer>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelfProjects: (filters) => dispatch(fetchSelfProjects(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.project.selfData,
    currentWorkspace: state.workspace.current,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
