import { Col, DatePicker, Form, Modal } from "antd";
import queryString from "query-string";
import { useState } from "react";
import axiosConfig from "src/axiosConfig";
import styled from "styled-components";
import SurveySelectContainer from "../../ReportPage/Report/RemoteSelectContainer";
import RemoteSelectContainer from "../Depth/RemoteSelectContainer";
import RemoteCascadeContainer from "../Site/RemoteCascadeContainer";
import TaxaRemoteCascadeContainer from "../Taxa/RemoteCascadeContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const { RangePicker } = DatePicker;

const ExportModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { visible, current } = props;

  const handleOk = () => {
    setLoading(true);
    form.validateFields().then((values) => {
      axiosConfig
        .get(
          `/surveyPrograms/${current}/export?${queryString.stringify(values, {
            arrayFormat: "index",
          })}`,
          {
            responseType: "blob",
            timeout: 60000,
          }
        )
        .then((response) => {
          const href = URL.createObjectURL(response.data);

          const link = document.createElement("a");
          link.href = href;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(href);

          handleCancel();
        });
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
    setLoading(false);
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
          <Form.Item label="Samples" name="report_id">
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
          <Form.Item label="Depths" name="depth_id">
            <RemoteSelectContainer mode="multiple" surveyProgramId={current} />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item label="Date" name="date">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item label="Localities and Sites" name="site">
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

export default ExportModal;
