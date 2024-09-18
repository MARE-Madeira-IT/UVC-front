import { Col, message, Row } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosConfig from "src/axiosConfig";
import styled from "styled-components";
import { fetchPermissions } from "../../../../redux/redux-modules/permissions/actions";
import Benthic from "./Benthic/Benthic";
import Motile from "./Motile/Motile";
import Report from "./Report/Report";
import ReportMap from "./ReportMap";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 100px 0px;
`;

function ReportPage(props) {
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
      <Row gutter={64}>
        <Col span={24}>
          <Report surveyProgramId={id} />
        </Col>
        <Col span={24}>
          <ReportMap surveyProgramId={id} />
        </Col>
        <Col span={24}>
          <Motile surveyProgramId={id} />
        </Col>
        <Col span={24}>
          <Benthic surveyProgramId={id} />
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPermissions: (id) => dispatch(fetchPermissions(id)),
  };
};

export default connect(null, mapDispatchToProps)(ReportPage);
