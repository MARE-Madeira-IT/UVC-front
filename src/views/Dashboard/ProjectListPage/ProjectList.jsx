import { Empty } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchProjects } from "../../../../redux/redux-modules/project/actions";
import { fetchWorkspacesSelector } from "../../../../redux/redux-modules/workspace/actions";
import ProjectFilters from "./ProjectFilters";

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

const Buttons = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0px;
    border: 1px solid #044582;
    background-color: #044582;
    color: white;

    img {
      width: 15px;
    }
  }

  .secundary {
    background-color: white;
    color: #044582;
  }
`;

const Project = styled.div`
  width: 100%;
  padding: 20px 20px 10px 20px;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(123, 123, 123, 0.2);
  margin-bottom: 30px;

  .title {
    display: flex;
    justify-content: space-between;

    h3 {
      margin-top: 0px;
    }
  }

  .links {
    margin-left: 30px;
    align-items: flex-start;
    gap: 10px;
  }

  .charateristics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

function ProjectList(props) {
  const { data } = props;
  const [filters, setFilters] = useState({});

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    props.fetchProjects(filters);
  };

  return (
    <Container>
      <ProjectFilters
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
      />
      <ListContainer>
        <h2>Survey Program(s)</h2>

        {data?.length === 0 ? (
          <Empty />
        ) : (
          data.map((project) => (
            <Project key={project.id}>
              <div className="title">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <Buttons className="links">
                  <a
                    href={
                      "mailto:" +
                      project.contact +
                      "?subject=[Underwater Survey] " +
                      project.name
                    }
                  >
                    <button className="secundary">
                      <img src="/assets/icons/contact.svg" alt="contact" />{" "}
                      Contact
                    </button>
                  </a>
                  {project.public ? (
                    <button>
                      <img src="/assets/icons/download.svg" alt="download" />{" "}
                      Download
                    </button>
                  ) : (
                    <></>
                  )}
                </Buttons>
              </div>

              <div className="charateristics">
                <div className="charateristic">
                  <h4>Stage</h4>
                  <p>{project.stage}</p>
                </div>
                <div className="charateristic">
                  <h4>Community size</h4>
                  <p>{project.community_size}</p>
                </div>
                <div className="charateristic">
                  <h4>Period</h4>
                  <p>
                    {moment(project.start_period).format("YYYY")} /{" "}
                    {project.end_period
                      ? moment(project.end_period).format("YYYY")
                      : "---"}
                  </p>
                </div>
                <div className="charateristic">
                  <h4>Geographic area</h4>
                  <p>{project.geographic_area}</p>
                </div>
                <div className="charateristic">
                  <h4>Created</h4>
                  <p>{moment(project.created_at).format("DD/MM/YYYY")}</p>
                </div>
                <div className="charateristic">
                  <h4>Last updated</h4>
                  <p>{moment(project.updated_at).format("DD/MM/YYYY")}</p>
                </div>
              </div>
            </Project>
          ))
        )}
      </ListContainer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: (filters) => dispatch(fetchProjects(filters)),
    fetchWorkspacesSelector: (filters) =>
      dispatch(fetchWorkspacesSelector(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.project.data,
    loading: state.project.loading,
    workspaceSelectors: state.workspace.selector,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
