import { useEffect } from "react";
import { connect } from "react-redux";
import axiosConfig from "src/axiosConfig";
import styled from "styled-components";
import {
  fetchProjectInvites,
  fetchSelfProjects,
  respondToInvite,
} from "../../../redux/redux-modules/project/actions";
import Project from "./ProjectPage/Project/Project";

const Container = styled.section`
  width: 100%;
  display: flex;
  margin: 50px 0px;
  box-sizing: border-box;
`;

const UserDataContainer = styled.div`
  width: 30%;
  padding: 0px 50px;
  box-sizing: border-box;

  .profile {
    margin-top: 50px;
    width: 90%;
    border-radius: 50%;
  }

  .name {
    font-weight: bold;
    font-size: clamp(20px, 3vw, 30px);
    margin-bottom: 0px;
  }
`;

const Notification = styled.div`
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 20px;

  p {
    margin: 0px;
  }

  .date {
    opacity: 0.6;
    font-size: 12px;
    margin: 5px 0px 10px 0px;
  }

  div {
    display: flex;
    justify-content: space-between;
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

function Dashboard(props) {
  const { user, invites } = props;

  useEffect(() => {
    axiosConfig.defaults.headers.common["project"] = null;
    props.fetchProjectInvites();
  }, []);

  const handleInvite = (id, status) => {
    props.respondToInvite(id, { status: status }).then(() => {
      props.fetchSelfProjects();
    });
  };

  return (
    <Container>
      <UserDataContainer>
        <img
          className="profile"
          src={import.meta.env.VITE_API + user.photo}
          alt="profile picture"
        />
        <p className="name">{user.userable.user.name}</p>
        <p>{user.email}</p>
        <br />
        <h3>Notification(s)</h3>
        {invites?.length > 0
          ? invites?.map((invite) => (
              <Notification key={invite.id}>
                <p>
                  You have been invited to the project {invite.project.name}
                </p>
                <p className="date">{invite.created_at}</p>
                <div>
                  <span onClick={() => handleInvite(invite.id, 1)}>Accept</span>
                  <span onClick={() => handleInvite(invite.id, 2)}>
                    Decline
                  </span>
                </div>
              </Notification>
            ))
          : "You don't have any notifications right now."}
      </UserDataContainer>
      <Project />
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelfProjects: () => dispatch(fetchSelfProjects()),
    fetchProjectInvites: () => dispatch(fetchProjectInvites()),
    respondToInvite: (id, data) => dispatch(respondToInvite(id, data)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    projects: state.project.selfData,
    invites: state.project.invites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
