import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
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
  const [removeIds, setRemoveIds] = useState([]);
  const [sites, setSites] = useState([]);

  const { current, visible, surveyProgramId, localities } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      var formData = {
        name: values.name,
        code: values.code,
        survey_program_id: surveyProgramId,
        sites: values.sites,
        removeIDs: removeIds,
      };
      if (current) {
        // formData = handleArrayToFormData(formData, removeIds, "removeIds")

        props.update(current, formData).then(() => {
          handleCancel();
        });
      } else {
        props.create(formData).then(() => {
          handleCancel();
        });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  const handleSiteRemove = (e, remove, restField) => {
    if (current && sites.length > restField.fieldKey) {
      setRemoveIds([...removeIds, sites[restField.fieldKey].id]);
    }
    remove(e);
  };

  useEffect(() => {
    if (current) {
      let currentLocality = localities.find((el) => el.id === current);

      var aSites = [];
      currentLocality.sites.map((currentSite) => {
        aSites.push({
          name: currentSite.name,
          latitude: currentSite.latitude,
          longitude: currentSite.longitude,
          code: currentSite.code,
          id: currentSite.id,
        });
      });
      setSites(aSites);

      form.setFieldsValue({
        name: currentLocality.name,
        code: currentLocality.code,
        sites: aSites,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit survey program's sites and localities"
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
            <Form.Item label="Locality" name="name" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Code" name="code" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p style={{ fontWeight: "semibold" }}>Site(s)</p>
            <Form.List name="sites">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, i) => (
                    <SiteItem
                      key={i}
                      field={field}
                      handleSiteRemove={handleSiteRemove}
                      remove={remove}
                      form={form}
                    />
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add site
                    </Button>
                  </Form.Item>
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
    loading: state.surveyProgram.loading,
    localities: state.locality.data,
  };
};

export default connect(mapStateToProps, null)(FormContainer);

function SiteItem({ field, handleSiteRemove, remove, form }) {
  const { name, key, ...restField } = field;
  const [latitude, setLatitude] = useState(32.606889622);
  const [longitude, setLongitude] = useState(-16.8109375);

  const handlePositionChange = (e) => {
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);

    form.setFieldValue(["sites", field.key, "latitude"], e.lngLat.lat);
    form.setFieldValue(["sites", field.key, "longitude"], e.lngLat.lng);
  };

  const handleLatitude = (e) => {
    if (e.target.value < 90 && e.target.value > -90) {
      setLatitude(e.target.value);
    }
  };
  const handleLongitude = (e) => {
    setLongitude(e.target.value);
  };

  return (
    <div
      key={key}
      style={{
        marginBottom: "20px",
        borderBottom: "1px solid grey",
        paddingBottom: "20px",
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Name*"
            {...restField}
            name={[name, "name"]}
            rules={requiredRule}
          >
            <Input placeholder="Site Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Code*"
            {...restField}
            name={[name, "code"]}
            rules={requiredRule}
          >
            <Input placeholder="Site code" />
          </Form.Item>
        </Col>
        <Col span={0}>
          <Form.Item {...restField} name={[name, "id"]}>
            <InputNumber style={{ display: "none" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Row align="middle" type="flex" gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Latitude*"
                {...restField}
                name={[name, "latitude"]}
                rules={requiredRule}
              >
                <Input
                  disabled
                  onChange={debounce(handleLatitude, 600)}
                  placeholder="Latitude"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Longitude*"
                {...restField}
                name={[name, "longitude"]}
                rules={requiredRule}
              >
                <Input
                  disabled
                  onChange={debounce(handleLongitude, 600)}
                  placeholder="Longitude"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} md={24}>
              <Map
                mapboxAccessToken="pk.eyJ1IjoidGlnZXJ3aGFsZSIsImEiOiJjanBncmNscnAwMWx3M3ZxdDF2cW8xYWZvIn0.LVgciVtYclOed_hZ9oXY2g"
                initialViewState={{
                  latitude: latitude,
                  longitude: longitude,
                  zoom: 7,
                }}
                style={{
                  height: "350px",
                  width: "100%",
                }}
                mapStyle="mapbox://styles/tigerwhale/cjpgrt1sccjs92sqjfnuixnxc"
                onClick={handlePositionChange}
              >
                {!isNaN(latitude) && !isNaN(longitude) && (
                  <Marker
                    draggable
                    latitude={latitude}
                    color="red"
                    longitude={longitude}
                    onDragEnd={handlePositionChange}
                  />
                )}
              </Map>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Button
          style={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          danger
          onClick={() => handleSiteRemove(name, remove, restField)}
        >
          <MinusCircleOutlined />
        </Button>
      </Row>
    </div>
  );
}
