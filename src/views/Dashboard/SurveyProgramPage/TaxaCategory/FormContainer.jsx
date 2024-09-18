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
  const { current, visible, surveyProgramId, taxaCategories } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props.update(current, { ...values, survey_program_id: surveyProgramId }).then(() => {
          handleCancel();
        });
      } else {
        props.create({ ...values, survey_program_id: surveyProgramId }).then(() => {
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
      let currentCategory = taxaCategories.find((el) => el.id === current);
      form.setFieldsValue({
        name: currentCategory.name,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit survye program's taxa categories"
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
          <Col xs={24} md={24}>
            <Form.Item label="Taxa category" name="name" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.taxa_category.loading,
    taxaCategories: state.taxa_category.data,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
