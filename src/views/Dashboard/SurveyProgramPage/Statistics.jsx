import { message } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dimensions } from "src/helper";
import styled from "styled-components";
import { fetchSurveyProgramStatistics } from "../../../../redux/redux-modules/surveyProgram/actions";

const Container = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const Statistic = styled.div`
  flex-basis: calc(25% - 30px);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  padding: 10px 20px 0px 20px;
  box-sizing: border-box;

  h3 {
    font-weight: 400;
  }

  .value {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    p {
      font-size: clamp(30px, 3vw, 50px);
      font-weight: bold;
      line-height: 100%;
      margin: 0px;
    }

    img {
      width: 50%;
    }
  }

  @media (max-width: ${dimensions.md}) {
    flex-basis: calc(50% - 30px);
    margin: 15px 0px;
  }

  @media (max-width: ${dimensions.xs}) {
    flex-basis: 100%;
    margin: 15px 0px;
  }
`;

function Statistics(props) {
  const { data } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    props.fetchSurveyProgramStatistics(props.surveyProgramId).catch((err) => {
      if (err.response.status === 403) {
        messageApi.open({
          type: "error",
          content: "You don't have access to this survey program",
        });
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <Container>
      {contextHolder}
      <Statistic>
        <h3>Members</h3>
        <div className="value">
          <p>{data.members}</p>
          <img src="/assets/icons/users.svg" alt="users" />
        </div>
      </Statistic>

      <Statistic>
        <h3>Reports</h3>
        <div className="value">
          <p>{data.reports}</p>
          <img src="/assets/icons/reports.svg" alt="users" />
        </div>
      </Statistic>

      <Statistic>
        <h3>Sites</h3>
        <div className="value">
          <p>{data.sites}</p>
          <img src="/assets/icons/sites.svg" alt="users" />
        </div>
      </Statistic>

      <Statistic>
        <h3>Taxa</h3>
        <div className="value">
          <p>{data.taxa}</p>
          <img src="/assets/icons/taxa.svg" alt="users" />
        </div>
      </Statistic>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSurveyProgramStatistics: (id) =>
      dispatch(fetchSurveyProgramStatistics(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.surveyProgram.loading,
    data: state.surveyProgram.statistics,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
