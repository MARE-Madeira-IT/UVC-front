import { Col, message, Row } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPermissions } from "../../../../redux/redux-modules/permissions/actions";
import Depth from "./Depth/Depth";
import Function from "./Function/Function";
import Indicator from "./Indicator/Indicator";
import Locality from "./Locality/Locality";
import Members from "./Members/Members";
import Statistics from "./Statistics";
import Taxa from "./Taxa/Taxa";
import axiosConfig from "src/axiosConfig";

const Container = styled.section`
  width: 100%;
  margin: 50px 0px;
  box-sizing: border-box;
`;

function SurveyProgramPage(props) {
  let { id } = useParams();
  const { fetchPermissions } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    axiosConfig.defaults.headers.common["survey_program"] = id;

    fetchPermissions(id).catch((err) => {
      if (err.response.status === 403) {
        messageApi.open({
          type: "error",
          content: "You don't have access to this survey program",
        });
        navigate("/dashboard");
      }
    });
  }, [id]);

  return (
    <Container>
      {contextHolder}
      {/* TODO: DEPTHS, SUBTRATES AND FUNCTIONS TABLES */}
      <Row>
        <Statistics surveyProgramId={id} />
      </Row>
      <Row gutter={64}>
        <Col md={24} lg={12}>
          <Members surveyProgramId={id} />
        </Col>
        <Col md={24} lg={12}>
          <Locality surveyProgramId={id} />
        </Col>
      </Row>
      <Row>
        <Taxa surveyProgramId={id} />
      </Row>
      <Row gutter={64}>
        <Col md={24} lg={8}>
          <Indicator surveyProgramId={id} />
        </Col>
        <Col md={24} lg={8}>
          <Depth surveyProgramId={id} />
        </Col>
        <Col md={24} lg={8}>
          <Function surveyProgramId={id} />
        </Col>
      </Row>
      {/* <Row gutter={64}> */}
      {/* <Col md={24} lg={12}>
          <TaxaCategory surveyProgramId={id} />
        </Col> */}
      {/* </Row> */}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPermissions: (id) => dispatch(fetchPermissions(id)),
  };
};

export default connect(null, mapDispatchToProps)(SurveyProgramPage);
