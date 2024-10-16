import { Col, DatePicker, Form, Modal } from "antd";
import styled from "styled-components";
import SurveySelectContainer from "../../../ReportPage/Report/RemoteSelectContainer";
import RemoteSelectContainer from "../../Depth/RemoteSelectContainer";
import RemoteCascadeContainer from "../../Site/RemoteCascadeContainer";
import TaxaRemoteCascadeContainer from "../../Taxa/RemoteCascadeContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const { RangePicker } = DatePicker;

const FormContainer = (props) => {
  const [form] = Form.useForm();
  const { visible, current, loading } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      props
        .create({ ...values, survey_program_id: current })
        .then(() => handleCancel());
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  return (
    <CustomModal
      width={720}
      title="Export"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
      loading={loading}
    >
      <Form
        initialValues={{ public: true }}
        style={{ margin: "30px auto" }}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Col xs={24} md={24}>
          <Form.Item label="Samples" name="reports">
            <SurveySelectContainer
              maxTagCount="responsive"
              mode="multiple"
              surveyProgramId={current}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item label="Species" name="taxas">
            <TaxaRemoteCascadeContainer
              create={false}
              maxTagCount="responsive"
              multiple
              selectCat
              mode="multiple"
              surveyProgramId={current}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item label="Depths" name="depths">
            <RemoteSelectContainer mode="multiple" surveyProgramId={current} />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item label="Date" name="dates">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item label="Localities and Sites" name="sites">
            <RemoteCascadeContainer
              create={false}
              maxTagCount="responsive"
              multiple
              selectCat
              surveyProgramId={current}
            />
          </Form.Item>
        </Col>
      </Form>
    </CustomModal>
  );
};

export default FormContainer;
