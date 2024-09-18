import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const requiredRule = { required: true };

function FormContainer(props) {
  const [form] = Form.useForm();
  const { current, visible, surveyProgramId, depths } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props
          .update(current, { ...values, survey_program_id: surveyProgramId })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({ ...values, survey_program_id: surveyProgramId })
          .then(() => {
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
      let currentDepth = depths.find((el) => el.id === current);
      form.setFieldsValue({
        name: currentDepth.name,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit survey program's depth categories"
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
            <Form.Item
              label="Depth"
              name="name"
              rules={[{ ...requiredRule, message: "'depth' is required" }]}
            >
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
    loading: state.depth.loading,
    depths: state.depth.data,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
