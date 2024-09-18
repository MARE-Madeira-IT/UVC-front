import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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
  const { current, visible, surveyProgramId, indicators } = props;

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
      let currentIndicator = indicators.find((el) => el.id === current);

      form.setFieldsValue({
        name: currentIndicator.name,
        type: currentIndicator.type,
        values: currentIndicator.values,
      });
    }
  }, [visible]);

  const typeWatch = Form.useWatch("type", form);

  return (
    <CustomModal
      width={720}
      title="Edit taxa's indicators"
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
            <Row xs={24} gutter={20}>
              <Col xs={12}>
                <Form.Item
                  label="Indicator"
                  name="name"
                  rules={[
                    { ...requiredRule, message: "'indicator' is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label="Type"
                  name="type"
                  initialValue={"text"}
                  rules={[{ ...requiredRule, message: "'type' is required" }]}
                >
                  <Select
                    options={[
                      { value: "text", label: "text" },
                      { value: "number", label: "number" },
                      { value: "select", label: "select" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            {typeWatch === "select" && (
              <Form.List initialValue={[]} name="values">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Row gutter={10} key={index}>
                        <Col style={{ padding: 0 }} xs={22}>
                          <Form.Item {...field}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={2}>
                          <Button
                            disabled={fields?.length <= 1}
                            style={{
                              width: "100%",
                              marginBottom: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            danger
                            onClick={() => remove(field.name)}
                          >
                            <MinusCircleOutlined />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Col xs={24}>
                      <Form.Item>
                        <Button
                          style={{ width: "100%" }}
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add item
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Form.List>
            )}
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    indicators: state.indicator.data,
    loading: state.indicator.loading,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
