import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import RemoteSelectContainer from "../TaxaCategory/RemoteSelectContainer";

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
  const [selectedIndicatorList, setSelectedIndicatorList] = useState([]);

  const { current, visible, surveyProgramId, taxas } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      let indicators = {};

      Object.keys(values)
        .filter((key) => key.includes("indicators"))
        .map((key) => {
          let indicator = key.split(".")[1];
          indicators[indicator] = values[key];
        });

      if (current) {
        props
          .update(current, {
            indicators,
            survey_program_id: surveyProgramId,
            id: current,
            category_id: values?.category_id,
            name: values.name,
            genus: values.genus,
            species: values.species,
            phylum: values.phylum,
          })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({
            indicators,
            survey_program_id: surveyProgramId,
            validated: true,
            category_id: values?.category_id,
            name: values.name,
            genus: values.genus,
            species: values.species,
            phylum: values.phylum,
          })
          .then(() => {
            handleCancel();
          });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    setSelectedIndicatorList([]);
    form.resetFields();
  };

  useEffect(() => {
    var aIndicators = {};

    if (current) {
      let currentTaxa = taxas.find((el) => el.id === current);

      let currentIndicatorList = [];

      currentTaxa.indicators.map((currentIndicator) => {
        aIndicators["indicators." + currentIndicator.name] =
          currentIndicator.pivot.name;
        currentIndicatorList.push(currentIndicator);
      });

      setSelectedIndicatorList(currentIndicatorList);

      form.setFieldsValue({
        category_id: currentTaxa?.category?.id,
        name: currentTaxa.name,
        genus: currentTaxa.genus,
        species: currentTaxa.species,
        phylum: currentTaxa.phylum,

        ...aIndicators,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit survey program's taxa"
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
          <Col xs={24} md={12}>
            <Form.Item label="Category" name="category_id" rules={requiredRule}>
              <RemoteSelectContainer />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Genus" name="genus" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Species" name="species" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Phylum" name="phylum" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p>Indicator(s)</p>
            <Checkbox.Group
              options={[...props.indicators].map((el) => el.name)}
              onChange={(e) => {
                setSelectedIndicatorList(e);
              }}
              value={selectedIndicatorList}
            />
          </Col>
          <Col span={24}>
            {selectedIndicatorList.length ? (
              <p>Indicator(s) value(s)</p>
            ) : (
              <></>
            )}
          </Col>
          {selectedIndicatorList.map((selectedIndicator, i) => {
            let indicator = props.indicators.find(
              (el) => el.name === selectedIndicator
            );
            return (
              <Col key={i} xs={24} md={12}>
                <Form.Item
                  key={selectedIndicator}
                  label={selectedIndicator}
                  name={"indicators." + selectedIndicator}
                  rules={requiredRule}
                >
                  {indicator.type === "number" ? (
                    <InputNumber style={{ width: "100%" }} />
                  ) : indicator.type === "select" ? (
                    <Select
                      options={indicator.values.map((el) => ({
                        name: el,
                        value: el,
                      }))}
                    />
                  ) : (
                    <Input />
                  )}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.surveyProgram.loading,
    indicators: state.indicator.selector,
    taxas: state.taxa.data,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
