import { Col, Form, Input, Modal, Row } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";

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
  const { visible, current, surveyPrograms, currentProject } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props
          .update(current, { ...values, project_id: currentProject.id })
          .then(() => {
            handleCancel();
          });
      } else {
        props.create({ ...values, project_id: currentProject.id }).then(() => {
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
    if (current) {
      let currentSurveyProgram = surveyPrograms.find((el) => el.id === current);

      form.setFieldsValue({
        name: currentSurveyProgram.name,
        description: currentSurveyProgram.description,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title={`${current ? "Edit a" : "Create a new"} survey program`}
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
    >
      <Form
        initialValues={{ public: true }}
        style={{ margin: "30px auto" }}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Title" name="name" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={requiredRule}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.surveyProgram.loading,
    surveyPrograms: state.surveyProgram.selfData,
    currentProject: state.project.current,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
