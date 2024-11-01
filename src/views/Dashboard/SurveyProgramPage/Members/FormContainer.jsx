import { Col, Form, Input, message, Modal, Row, Switch } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateSurveyProgramMember,
  inviteSurveyProgramMember,
} from "../../../../../redux/redux-modules/surveyProgramUser/actions";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const requiredRule = { required: true };

function FormContainer({
  visible,
  setVisible,
  inviteMember,
  surveyProgramId,
  currentUser,
  updateMember,
  users,
}) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const create = () => {
    form.validateFields().then((values) => {
      if (currentUser) {
        updateMember(currentUser, values)
          .then(() => {
            handleCancel();
          })
          .catch((error) => {
            messageApi.error(error?.response?.data?.message, 5);
          });
      } else {
        inviteMember({ ...values, survey_program_id: surveyProgramId })
          .then(() => {
            handleCancel();
          })
          .catch((error) => {
            messageApi.error(error?.response?.data?.message, 5);
          });
      }
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    if (currentUser) {
      const user = users.find((el) => el.id === currentUser);

      form.setFieldsValue({
        email: user.email,
        show: user?.permissions?.filter((el) => el.name === "show")?.length > 0,
        create:
          user?.permissions?.filter((el) => el.name === "create")?.length > 0,
        edit: user?.permissions?.filter((el) => el.name === "edit")?.length > 0,
      });
    }
  }, [visible]);

  return (
    <>
      {contextHolder}
      <CustomModal
        width={720}
        title="Invite a member to the survey program"
        open={visible}
        onCancel={handleCancel}
        centered
        onOk={create}
      >
        <Form style={{ margin: "50px auto" }} layout="vertical" form={form}>
          <Row gutter={32}>
            <Col span={24}>
              <Form.Item
                label="Invite a member through the registration email"
                name="email"
                rules={[{ ...requiredRule, message: "'email' is required" }]}
              >
                <Input placeholder="example@underwater-survey.org" />
              </Form.Item>
              <h4>Permissions</h4>
              <Row style={{ maxWidth: "250px" }}>
                <Col span={8}>
                  <Form.Item name="show" label="Ver">
                    <Switch
                      defaultChecked={true}
                      defaultValue={true}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="create" label="Create">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="edit" label="Edit">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    inviteMember: (data) => dispatch(inviteSurveyProgramMember(data)),
    updateMember: (id, data) => dispatch(updateSurveyProgramMember(id, data)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.surveyProgram.loading,
    users: state.surveyProgramUser.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
