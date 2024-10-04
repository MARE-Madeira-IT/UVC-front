import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import RemoteSelectContainer from "../../SurveyProgramPage/Depth/RemoteSelectContainer";
import RemoteCascadeContainer from "../../SurveyProgramPage/Site/RemoteCascadeContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const [sample, setSample] = useState([
    undefined, //locality code
    undefined, //site code
    undefined, //"Time" + time
    undefined, //"D" + depth.id
    undefined, //"R" + replica
  ]);

  const { current, visible, surveyProgramId, reports } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      let initFunctions = [];
      props.functions.map((f) => {
        initFunctions.push({
          function_id: f.id,
          value: values["function_" + f.name],
        });
      });

      var formData = {
        ...values,
        survey_program_id: surveyProgramId,
        site_id: values.site[1],
        functions: initFunctions,
      };

      if (current) {
        props.update(current, formData).then(() => {
          handleCancel();
        });
      } else {
        props.create(formData).then(() => {
          handleCancel();
        });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    let isReady = true;
    let string = "";
    sample.map((field, index) => {
      field == undefined && (isReady = false);
      string = string + field;
      if (field && index != sample.length - 1) {
        string = string + "_";
      }
    });

    if (isReady) {
      form.setFieldValue("code", string);
    }
  }, [sample]);

  useEffect(() => {
    if (current) {
      let currentReport = reports.find((el) => el.id === current);
      let initFunctions = {};
      currentReport.functions.map((f) => {
        initFunctions["function_" + f.name] = f.pivot.user;
      });

      form.setFieldsValue({
        date: moment(currentReport.date),
        code: currentReport.code,
        site: [currentReport.site.locality.id, currentReport.site.id],
        depth_id: currentReport.depth.id,
        heading: currentReport.heading,
        heading_direction: currentReport.heading_direction,
        site_area: currentReport.site_area,
        distance: currentReport.distance,
        daily_dive: currentReport.daily_dive,
        transect: currentReport.transect,
        time: currentReport.time,
        replica: currentReport.replica,
        surveyed_area: currentReport.surveyed_area,
        n: currentReport.n,

        ...initFunctions,
      });

      setSample([
        currentReport.site.locality.code,
        currentReport.site.code,
        "Time" + currentReport.time, //"Time" + time
        "D" + currentReport.depth.id, //"D" + depth.id
        "D" + currentReport.replica, //"R" + replica
      ]);
    }
  }, [visible]);

  const handleSiteAndLocality = (e) => {
    const locality = props.localities.find((element) => element.id == e[0]);
    const site = locality.sites.find((element) => element.id == e[1]);

    let newSample = [...sample];
    newSample[0] = locality.code;
    newSample[1] = site.code;

    setSample(newSample);
  };

  const handleDepth = (e) => {
    const depth = props.depths.find((element) => element.id == e);

    handleSampleChange("D" + depth.id, 3);
  };

  const handleSampleChange = (value, index) => {
    let newSample = [...sample];
    newSample[index] = value;

    setSample(newSample);
  };

  return (
    <CustomModal
      width={1280}
      title="Create surveys"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
    >
      <Form
        style={{ margin: "30px auto" }}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="Sample" name="code" rules={requiredRule}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Date" name="date" rules={requiredRule}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              label="Locality and Site"
              name="site"
              rules={requiredRule}
            >
              <RemoteCascadeContainer
                onChange={handleSiteAndLocality}
                surveyProgramId={surveyProgramId}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Depth" name="depth_id" rules={requiredRule}>
              <RemoteSelectContainer
                onChange={handleDepth}
                surveyProgramId={surveyProgramId}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="Heading" name="heading">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Heading direction" name="heading_direction">
              <Select
                options={[
                  { value: "F", label: "F" },
                  { value: "R", label: "R" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="Site area" name="site_area">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Distance" name="distance">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={12} md={6}>
            <Form.Item
              label="Daily dive#"
              name="daily_dive"
              rules={requiredRule}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Transect#" name="transect" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Time#" name="time" rules={requiredRule}>
              <InputNumber
                onChange={(e) => handleSampleChange("Time" + e, 2)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Replica#" name="replica" rules={requiredRule}>
              <InputNumber
                onChange={(e) => handleSampleChange("R" + e, 4)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item
              label="Surveyed area"
              name="surveyed_area"
              rules={requiredRule}
            >
              <Select
                options={[
                  { value: 100, label: 100 },
                  { value: 200, label: 200 },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <h3>Dive team functions</h3>
            <Row gutter={16}>
              {props.functions.map((f) => (
                <Col key={f.id} xs={12} md={6}>
                  <Form.Item
                    label={f.name}
                    name={"function_" + f.name}
                    rules={requiredRule}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.report.loading,
    localities: state.locality.selector,
    depths: state.depth.selector,
    reports: state.report.data,
    functions: state._function.selector,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
