import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import { getImportStatus } from "../../../../../redux/redux-modules/surveyProgram/actions";
import FormImportSection from "./FormImportSection";
import ImportProgress from "./ImportProgress";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }

  .import_description {
    p {
      margin-top: 0px;
    }

    span.required {
      color: #f34747;
      font-weight: 900;
    }
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState();
  const [fetchProgressId, setFetchProgressId] = useState();
  const {
    visible,
    current,
    surveyPrograms,
    currentProject,
    loading,
    importStatus,
  } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        props
          .update(current, {
            ...values,
            project_id: currentProject.id,
          })
          .then(() => {
            handleCancel();
          });
      } else {
        if (values.file) {
          values.file = values?.file[0]?.originFileObj;
        }
        props
          .create({
            ...values,
            project_id: currentProject.id,
          })
          .then((res) => {
            if (values.import) {
              setFetchProgressId(res.value.data.data.id);
            } else {
              handleCancel();
            }
          });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    setErrors([]);
    form.resetFields();
    setFetchProgressId();
  };

  const getProgress = (id) =>
    props.getImportStatus(id).then((res) => {
      if (res?.value?.data?.errors) {
        setErrors(res.value.data.errors);
      } else if (!res?.value?.data?.start_date) {
        handleCancel();
      }
    });

  useEffect(() => {
    let interval;
    if (fetchProgressId) {
      interval = setInterval(() => {
        getProgress(fetchProgressId);
      }, 2500);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => interval && clearInterval(interval);
  }, [fetchProgressId]);

  useEffect(() => {
    if (current) {
      let currentSurveyProgram = surveyPrograms.find((el) => el.id === current);

      form.setFieldsValue({
        name: currentSurveyProgram.name,
        description: currentSurveyProgram.description,
      });
    }
  }, [visible]);

  const importXLSX = Form.useWatch("import", form);

  return (
    <CustomModal
      width={720}
      title={`${current ? "Edit a" : "Create a new"} survey program`}
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
      footer={
        <div
          style={{
            gap: "10px",
            display: "flex",
            marginLeft: "auto",
            width: "fit-content",
          }}
        >
          <Button disabled={loading || fetchProgressId} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleOk}
            loading={loading || fetchProgressId}
            type="primary"
          >
            OK
          </Button>
        </div>
      }
    >
      {fetchProgressId && importStatus?.start_date ? (
        <ImportProgress
          setFetchProgressId={setFetchProgressId}
          importStatus={importStatus}
        />
      ) : (
        <Form
          initialValues={{ public: true }}
          style={{ margin: "30px auto" }}
          layout="vertical"
          requiredMark
          form={form}
        >
          <Row gutter={16}>
            {!(fetchProgressId && importStatus?.start_date) && (
              <>
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
                {!current && (
                  <Col span={24}>
                    <Form.Item label="Import" name="import">
                      <Switch />
                    </Form.Item>
                  </Col>
                )}
              </>
            )}

            {importXLSX && (
              <FormImportSection setErrors={setErrors} errors={errors} />
            )}
          </Row>
        </Form>
      )}
    </CustomModal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getImportStatus: (id) => dispatch(getImportStatus(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.surveyProgram.loading,
    surveyPrograms: state.surveyProgram.selfData,
    currentProject: state.project.current,
    importStatus: state.surveyProgram.importStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
