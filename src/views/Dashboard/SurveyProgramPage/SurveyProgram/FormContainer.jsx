import {
  Button,
  Col,
  Collapse,
  Flex,
  Form,
  Input,
  Modal,
  Progress,
  Row,
  Switch,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { getImportStatus } from "../../../../../redux/redux-modules/surveyProgram/actions";

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

const ErrorsContainer = styled.div`
  margin-top: 15px;
  background-color: #fafafa;
  padding: 5px;
  max-height: 200px;
  overflow-y: auto;
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
      } else {
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
    if (importStatus?.start_date == null) {
      setFetchProgressId(null);
    }
  }, [importStatus]);

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
          <Button onClick={handleCancel}>Cancel</Button>
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
          {!current && (
            <Col span={24}>
              <Form.Item label="Import" name="import">
                <Switch />
              </Form.Item>
            </Col>
          )}

          {importXLSX && (
            <Col span={24}>
              <div className="import_description">
                {fetchProgressId && importStatus?.start_date ? (
                  <Flex gap="small" vertical>
                    {Object.keys(importStatus).map(
                      (key, i) =>
                        key !== "errors" &&
                        key !== "start_date" && (
                          <div key={i}>
                            <p>{key}</p>
                            <Progress
                              percent={Math.round(
                                importStatus[key]?.current_row &&
                                  importStatus[key]?.total_rows
                                  ? (importStatus[key]?.current_row /
                                      importStatus[key]?.total_rows) *
                                      100
                                  : 0
                              )}
                            />
                          </div>
                        )
                    )}
                  </Flex>
                ) : (
                  <>
                    <p>
                      The import XLSX file should follow a specific
                      <a
                        href={`${
                          import.meta.env.VITE_API
                        }/templates/UW_SurveyProgram_Import.xlsx`}
                      >
                        {" "}
                        template
                      </a>
                      .
                    </p>
                    <p>
                      <span className="required">
                        Content should be copied to a new xlsx file
                      </span>
                    </p>
                    <p>All column names are not case-sensitive.</p>
                    <p>
                      Extra columns except for the ones in front of
                      &quot;Indicators&quot; and/or &quot;Functions&quot; will
                      be ignored.
                    </p>

                    <p>There should be 5 pages:</p>
                    <Collapse
                      accordion
                      items={[
                        {
                          key: 1,
                          label: (
                            <>
                              <b>DIVE_SITE_METADATA </b> with:
                            </>
                          ),
                          children: (
                            <div>
                              <ul>
                                <li>SAMPLE#</li>
                                <li>
                                  Date <span className="required">*</span>: date
                                  (YYYYMMDD)
                                </li>
                                <li>
                                  Locality<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Locality Code
                                  <span className="required">*</span>: text
                                </li>
                                <li>
                                  Site<span className="required">*</span>: text
                                </li>
                                <li>
                                  Site Code<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Daily_dive#<span className="required">*</span>
                                  : integer
                                </li>
                                <li>
                                  Transect#<span className="required">*</span>:
                                  integer
                                </li>
                                <li>
                                  Depth category
                                  <span className="required">*</span>: text
                                </li>
                                <li>
                                  Depth#<span className="required">*</span>:
                                  integer
                                </li>
                                <li>
                                  Time#<span className="required">*</span>:
                                  integer
                                </li>
                                <li>
                                  Replica<span className="required">*</span>:
                                  integer
                                </li>
                                <li>
                                  Latitude<span className="required">*</span>:
                                  decimal
                                </li>
                                <li>
                                  Longitude<span className="required">*</span>:
                                  decimal
                                </li>
                                <li>Heading: integer</li>
                                <li>Heading direction: decimal</li>
                                <li>Site area: text</li>
                                <li>Distance: decimal</li>
                                <li>
                                  Functions: There should always be a column
                                  named &quot;Functions&quot; - every column in
                                  front of it is considered a survey program
                                  function.
                                </li>
                              </ul>
                              <p
                                style={{
                                  margin: "0 0 0 auto",
                                  width: "fit-content",
                                }}
                              >
                                <span className="required">*</span> Required
                              </p>
                            </div>
                          ),
                        },
                        {
                          key: 2,
                          label: (
                            <>
                              <b>BENTHIC_DB </b> with:
                            </>
                          ),
                          children: (
                            <div>
                              <ul>
                                <li>
                                  SAMPLE#<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  P##<span className="required">*</span>:
                                  integer
                                </li>
                                <li>
                                  Substrate<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Taxa<span className="required">*</span>: text
                                </li>
                                <li>Notes</li>: text
                              </ul>
                              <p
                                style={{
                                  margin: "0 0 0 auto",
                                  width: "fit-content",
                                }}
                              >
                                <span className="required">*</span> Required
                              </p>
                            </div>
                          ),
                        },
                        {
                          key: 3,
                          label: (
                            <>
                              <b>BENTHIC_TAXAS</b> with:
                            </>
                          ),
                          children: (
                            <div>
                              <ul>
                                <li>
                                  Category<span className="required">*</span>:
                                  (Macroinvertebrate, Substrate, Algae, Fish,
                                  Litter or Other)
                                </li>
                                <li>
                                  Species<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Genus<span className="required">*</span>: text
                                </li>
                                <li>Phylum: text</li>
                                <li>
                                  Indicators: There should always be a column
                                  named &quot;Indicators&quot; - every column in
                                  front of it is considered a taxa indicator.
                                </li>
                              </ul>
                              <p
                                style={{
                                  margin: "0 0 0 auto",
                                  width: "fit-content",
                                }}
                              >
                                <span className="required">*</span> Required
                              </p>
                            </div>
                          ),
                        },
                        {
                          key: 4,
                          label: (
                            <>
                              <b>MOTILE_DB </b>with:
                            </>
                          ),
                          children: (
                            <div>
                              <ul>
                                <li>
                                  SAMPLE#<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Survey type<span className="required">*</span>
                                  : (fish, macroinvertebrates, cryptic or
                                  dom_urchin)
                                </li>
                                <li>
                                  Taxa<span className="required">*</span>: text
                                </li>
                                <li>Size Category: text</li>
                                <li>Size: number</li>
                                <li>
                                  Ntotal<span className="required">*</span>:
                                  number
                                </li>
                                <li>Notes: text</li>
                              </ul>
                              <p
                                style={{
                                  margin: "0 0 0 auto",
                                  width: "fit-content",
                                }}
                              >
                                <span className="required">*</span> Required
                              </p>
                            </div>
                          ),
                        },
                        {
                          key: 5,
                          label: (
                            <>
                              <b>MOTILE_TAXAS </b>with:
                            </>
                          ),
                          children: (
                            <div>
                              <ul>
                                <li>
                                  Category<span className="required">*</span>:
                                  (Macroinvertebrate, Substrate, Algae, Fish,
                                  Litter or Other)
                                </li>
                                <li>
                                  Species<span className="required">*</span>:
                                  text
                                </li>
                                <li>
                                  Genus<span className="required">*</span>: text
                                </li>
                                <li>Phylum: text</li>
                                <li>
                                  Indicators: There should always be a column
                                  named &quot;Indicators&quot; - every column in
                                  front of it is considered a taxa indicator.
                                </li>
                              </ul>
                              <p
                                style={{
                                  margin: "0 0 0 auto",
                                  width: "fit-content",
                                }}
                              >
                                <span className="required">*</span> Required
                              </p>
                            </div>
                          ),
                        },
                      ]}
                    />
                    <Form.Item
                      rules={requiredRule}
                      name="file"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => {
                        setErrors([]);
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e?.fileList;
                      }}
                      noStyle
                    >
                      <Dragger
                        style={{ marginTop: "20px" }}
                        multiple={false}
                        accept=".xlsx"
                      >
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                      </Dragger>
                    </Form.Item>
                  </>
                )}

                {errors?.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <p>Errors ({errors.length}):</p>
                    <ErrorsContainer>
                      {errors.map((el, i) => (
                        <p key={i}>{el}</p>
                      ))}
                    </ErrorsContainer>
                  </div>
                )}
              </div>
            </Col>
          )}
        </Row>
      </Form>
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
