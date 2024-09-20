import { Button, Checkbox, Col, Form, Input, Modal, Row, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  const { visible, current, workspaces, user } = props;

  useEffect(() => {
    if (current) {
      let currentWorkspace = workspaces.find((el) => el.id === current);

      let users = currentWorkspace.users.map((el) => ({
        id: el.id,
        email: el.email,
        show: !!el.permissions.find((el) => el.name === "show"),
        create: !!el.permissions.find((el) => el.name === "create"),
        edit: !!el.permissions.find((el) => el.name === "edit"),
      }));

      form.setFieldsValue({
        name: currentWorkspace.name,
        description: currentWorkspace.description,
        geographic_area: currentWorkspace.geographic_area,
        stage: currentWorkspace.stage,
        community_size: currentWorkspace.community_size,
        start_period: currentWorkspace.start_period,
        end_period: currentWorkspace.end_period,
        public: currentWorkspace.public,
        users: users,
      });
    }
  }, [visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props.update(current, values).then(() => handleCancel());
      } else {
        props.create(values).then(() => handleCancel());
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  return (
    <CustomModal
      width={720}
      title="Create a new workspace"
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

          <Col span={24}>
            <Form.Item
              valuePropName="checked"
              label="Is it a public or private workspace?"
              name="public"
            >
              <Checkbox>Public</Checkbox>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="users">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} justify="space-between">
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          label="Email"
                          name={[name, "email"]}
                          rules={requiredRule}
                        >
                          <Input
                            disabled={
                              form.getFieldValue(["users", name, "email"]) ===
                              user.email
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item name={[name, "show"]} label="Ver">
                          <Switch
                            defaultChecked={true}
                            defaultValue={true}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item name={[name, "create"]} label="Create">
                          <Switch
                            disabled={
                              form.getFieldValue(["users", name, "email"]) ===
                              user.email
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item name={[name, "edit"]} label="Edit">
                          <Switch
                            disabled={
                              form.getFieldValue(["users", name, "email"]) ===
                              user.email
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={2}>
                        <Button
                          disabled={
                            form.getFieldValue(["users", name, "email"]) ===
                            user.email
                          }
                          style={{
                            width: "100%",
                            marginBottom: "24px",
                            marginTop: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          danger
                          onClick={() => {
                            remove(name);
                          }}
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
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.workspace.loading,
    workspaces: state.workspace.selfData,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
