import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
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
  const { visible, current, projects, currentWorkspace } = props;

  useEffect(() => {
    if (current) {
      let currentProject = projects.find((el) => el.id === current);

      form.setFieldsValue({
        name: currentProject.name,
        description: currentProject.description,
        geographic_area: currentProject.geographic_area,
        stage: currentProject.stage,
        community_size: currentProject.community_size,
        start_period: currentProject.start_period,
        end_period: currentProject.end_period,
        public: currentProject.public,
      });
    }
  }, [visible]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props
          .update(current, { ...values, workspace_id: currentWorkspace.id })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({ ...values, workspace_id: currentWorkspace.id })
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

  return (
    <CustomModal
      width={720}
      title="Create a new project"
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
              label="Geographic area (as per the United Nations geoscheme)"
              name="geographic_area"
              rules={requiredRule}
            >
              <Select
                placeholder="As per the United Nations geoscheme"
                options={[
                  { value: "Worldwide", label: "Worldwide" },

                  { value: "America", label: "America" },
                  { value: "Northern America", label: "North America" },
                  { value: "South America", label: "South America" },
                  { value: "Central America", label: "Central America" },
                  { value: "Caribbean", label: "Caribbean" },

                  { value: "Africa", label: "Africa" },
                  { value: "Northern Africa", label: "Northern Africa" },
                  { value: "Eastern Africa", label: "Eastern Africa" },
                  { value: "Middle Africa", label: "Middle Africa" },
                  { value: "Southern Africa", label: "Southern Africa" },
                  { value: "Western Africa", label: "Western Africa" },

                  { value: "Europe", label: "Europe" },
                  { value: "Western Europe", label: "Western Europe" },
                  { value: "Eastern Europe", label: "Eastern Europe" },
                  { value: "Southearn Europe", label: "Southearn Europe" },
                  { value: "Northearn Europe", label: "Northearn Europe" },

                  { value: "Asia", label: "Asia" },
                  { value: "Central Asia", label: "Central Asia" },
                  { value: "Eastern Asia", label: "Eastern Asia" },
                  { value: "South-eastern Asia", label: "South-eastern Asia" },
                  { value: "Southern Asia", label: "Southern Asia" },
                  { value: "Western Asia", label: "Western Asia" },

                  { value: "Antarctica", label: "Antarctica" },

                  { value: "Oceania", label: "Oceania" },
                  {
                    value: "Australia and New Zealand",
                    label: "Australia and New Zealand",
                  },
                  { value: "Melanesia", label: "Melanesia" },
                  { value: "Micronesia", label: "Micronesia" },
                  { value: "Polynesia", label: "Polynesia" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Stage" name="stage" rules={requiredRule}>
              <Select
                options={[
                  { value: "Ongoing", label: "Ongoing" },
                  { value: "Completed", label: "Completed" },
                  { value: "Archived", label: "Archived" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Community contributing to the data collection"
              name="community_size"
              rules={requiredRule}
            >
              <Select
                options={[
                  { value: "<10", label: "<10" },
                  { value: "10-50", label: "10-50" },
                  { value: "50-100", label: "50-100" },
                  { value: "100-500", label: "100-500" },
                  { value: ">500", label: ">500" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Period of data colections" name="start_period">
              <DatePicker
                picker="year"
                placeholder="Start date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="  " name="end_period">
              <DatePicker
                picker="year"
                placeholder="End date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              valuePropName="checked"
              label="Is it a public or private survey program?"
              name="public"
            >
              <Checkbox>Public</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.project.loading,
    projects: state.project.selfData,
    user: state.auth.user,
    currentWorkspace: state.workspace.current,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
