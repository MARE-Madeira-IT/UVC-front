import { Empty } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  acceptInvite,
  fetchAllInvites,
} from "../../../redux/redux-modules/auth/actions";
import { fetchSelfWorkspaces } from "../../../redux/redux-modules/workspace/actions";
import ListContainer from "./ListContainer";
import Workspace from "./Workspace/Workspace";

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
  const { user, invites, invitesMeta, loading } = props;

  useEffect(() => {
    // axiosConfig.defaults.headers.common["survey_program"] = null;
    props.fetchAllInvites();
  }, []);

  const handleInvite = (id, type, status) => {
    props.acceptInvite(id, type, { status: status }).then(() => {
      props.fetchSelfWorkspaces();
    });
  };

  function handlePageChange(page) {
    props.fetchAllInvites(page);
  }

  function makeMessage(item) {
    if (item.type === "surveyProgram") {
      return `You have been invited to the survey program ${item?.name}`;
    }

    if (item.type === "project") {
      return `You have been invited to the project ${item?.name}`;
    }

    if (item.type === "workspace") {
      return `You have been invited to the workspace ${item?.name}`;
    }
  }

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

        {invites?.length > 0 ? (
          <ListContainer
            handlePageChange={handlePageChange}
            data={invites}
            loading={loading}
            meta={invitesMeta}
            Component={(item) => {
              return (
                <Notification key={item.id}>
                  <p>{makeMessage(item)}</p>
                  <p className="date">{item.created_at}</p>
                  <div>
                    <span onClick={() => handleInvite(item.id, item.type, 1)}>
                      Accept
                    </span>
                    <span onClick={() => handleInvite(item.id, item.type, 2)}>
                      Decline
                    </span>
                  </div>
                </Notification>
              );
            }}
          />
        ) : (
          <Empty
            description="You don't have any notifications right now."
            imageStyle={{ maxHeight: "60px" }}
          />
        )}
      </UserDataContainer>
      <Workspace />
      {/* <SurveyProgram /> */}
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelfWorkspaces: () => dispatch(fetchSelfWorkspaces()),
    fetchAllInvites: (page) => dispatch(fetchAllInvites(page)),
    acceptInvite: (id, type, data) => dispatch(acceptInvite(id, type, data)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    surveyPrograms: state.surveyProgram.selfData,
    invites: state.auth.invites,
    loading: state.auth.loading,
    invitesMeta: state.auth.invitesMeta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
