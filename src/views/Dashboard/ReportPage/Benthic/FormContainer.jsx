import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import { fetchSelectorSubstrates } from "../../../../../redux/redux-modules/substrate/actions";
import { fetchSelectorTaxas } from "../../../../../redux/redux-modules/taxa/actions";
import RemoteCascadeContainer from "../../SurveyProgramPage/Taxa/RemoteCascadeContainer";

import {
  createBenthic,
  updateBenthic,
} from "../../../../../redux/redux-modules/benthic/actions";
import SubstrateRemoteSelectContainer from "../../SurveyProgramPage/Substrate/ExternalRemoteSelectContainer";
import ReportRemoteSelectContainer from "../Report/RemoteSelectContainer";
import moment from "moment";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const {
    current,
    visible,
    surveyProgramId,
    create,
    update,
    loading,
    taxas,
    benthics,
  } = props;
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current) {
        update(current, { ...values, survey_program_id: surveyProgramId }).then(
          () => {
            handleCancel();
          }
        );
      } else {
        create({ ...values, survey_program_id: surveyProgramId })
          .then(() => {
            handleCancel();
          })
          .catch((err) => {
            message.error({
              content: err?.response?.data?.message,
              key: "benthics-already-exist",
            });
          });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    setPage(1);
    form.resetFields();
  };

  const handleFill = () => {
    let fill = true;
    let values = form.getFieldsValue();
    let benthicsBeforeFill = values.benthics;
    let benthicsAfterFill = [];
    let substrate = null,
      taxa = [];

    let other_taxa = taxas.find((el) => el.name === "Other");
    let bare_taxa = other_taxa?.taxas?.find((el) => el.name === "Bare");

    if (!other_taxa || !bare_taxa) {
      fill = false;
      message.error({
        content: "You need to create the Other/Bare taxa first",
        key: "no-bare-taxa",
      });
    }

    let bare = [other_taxa.id, bare_taxa.id];

    benthicsBeforeFill.forEach((benthic) => {
      let row = {};
      if (benthic.substrate_id) {
        substrate = benthic.substrate_id;
        row.substrate_id = benthic.substrate_id;
      } else {
        if (substrate) {
          row.substrate_id = substrate;
        } else {
          fill = false;
          message.error({
            content: "You need to fill P##1's substrate",
            key: "first-substrate-error",
          });
        }
      }

      if (benthic.taxa_id?.length > 0) {
        taxa = benthic.taxa_id;
        row.taxa_id = benthic.taxa_id;
      } else {
        if (taxa?.length > 0) {
          row.taxa_id = taxa;
        } else {
          //other - Bare
          row.taxa_id = bare;
        }
      }
      row.notes = benthic.notes;
      row.p = benthic.p;

      benthicsAfterFill.push(row);
    });
    if (fill) {
      form.setFieldsValue({
        benthics: benthicsAfterFill,
      });
    }
  };

  useEffect(() => {
    props.fetchSelectorSubstrates({ survey_program_id: surveyProgramId });
    props.fetchSelectorTaxas({ surveyProgram: surveyProgramId });
  }, []);

  useEffect(() => {
    if (visible && taxas) {
      if (current) {
        const benthic = benthics.find((el) => el.report_id === current);

        var newBenthics = benthic.children.map((benthic) => {
          return {
            substrate_id: benthic?.substrate_id,
            notes: benthic?.notes,
            p: benthic?.p,
            taxa_id: benthic?.taxa?.id
              ? [benthic?.taxa?.category?.id, benthic?.taxa?.id]
              : undefined,
          };
        });

        form.setFieldsValue({
          benthics: newBenthics,
          report_id: benthic.report_id,
        });
      } else {
        // Init p## field for 100 transects
        let a = new Array(20).fill(1).map((_, i) => ({ p: i + 1 }));

        form.setFieldValue("benthics", a);
      }
    }
  }, [visible, current, taxas]);

  const benthicsWatch = Form.useWatch("benthics", form);

  //THIS IS A FEATURE THAT LOADS THE 100 POINTS OF BENTHICS ON BOTTOM SCROLL REACH
  // const handleScroll = (e) => {
  //   const { scrollHeight, scrollTop, clientHeight } = e.target;

  //   if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
  //     //Reached bottom of page
  //     let benthics = form.getFieldsValue().benthics;

  //     if (benthics?.length < 100) {
  //       let a = new Array(20)
  //         .fill(1)
  //         .map((_, i) => ({ p: benthics?.length + i + 1 }));

  //       form.setFieldValue("benthics", [...benthics, ...a]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   let el = document.getElementsByClassName("ant-modal-wrap")[0];
  //   if (visible && el) {
  //     el.addEventListener("scroll", handleScroll);

  //     return () => {
  //       el.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, [visible]);

  return (
    <CustomModal
      destroyOnClose
      width={1200}
      title="Fill the benthic data"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
      footer={[
        <Button
          key="fill"
          disabled={benthicsWatch ? !benthicsWatch[0].substrate_id : true}
          onClick={handleFill}
        >
          Fill
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button loading={loading} key="link" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form style={{ margin: "50px auto" }} layout="vertical" form={form}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label="Sample" name="report_id" rules={requiredRule}>
              <ReportRemoteSelectContainer surveyProgramId={surveyProgramId} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="benthics">
              {(fields) => (
                <>
                  {fields
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} justify="space-between">
                        <Col span={3}>
                          <Form.Item
                            {...restField}
                            label="P##"
                            name={[name, "p"]}
                            rules={requiredRule}
                          >
                            <Input disabled />
                          </Form.Item>
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            {...restField}
                            label="Substrate"
                            name={[name, "substrate_id"]}
                            rules={requiredRule}
                          >
                            <SubstrateRemoteSelectContainer
                              surveyProgramId={surveyProgramId}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            rules={requiredRule}
                            label="Taxa"
                            name={[name, "taxa_id"]}
                          >
                            <RemoteCascadeContainer
                              loadTaxas={false}
                              categories={["Macroinvertebrate", "Algae", "Other"]}
                              surveyProgramId={surveyProgramId}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            label="Notes"
                            name={[name, "notes"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  <Pagination
                    showSizeChanger={false}
                    current={page}
                    onChange={(e) => setPage(e)}
                    total={fields?.length}
                  />
                </>
              )}
            </Form.List>
          </Col>

          {/* {current.id ?

                        : Array(100).map((benthic) => (
                            <Col xs={24} md={12}>
                                <Form.Item label="Email*" name="p##" rules={[{ ...requiredRule, message: "'email' is required" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        ))
                    } */}
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.benthic.loading,
    taxas: state.taxa.selector,
    benthics: state.benthic.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorTaxas: (filters) => dispatch(fetchSelectorTaxas(filters)),
    fetchSelectorSubstrates: (filters) =>
      dispatch(fetchSelectorSubstrates(filters)),
    update: (id, data) => dispatch(updateBenthic(id, data)),
    create: (data) => dispatch(createBenthic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
