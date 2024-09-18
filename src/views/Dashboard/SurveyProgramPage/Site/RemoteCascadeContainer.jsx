import { PlusOutlined } from "@ant-design/icons";
import { Button, Cascader } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSelectorLocalities } from "../../../../../redux/redux-modules/locality/actions";

function RemoteCascadeContainer(props) {
  const [openCascader, setOpenCascader] = useState(false);

  const getData = () => {
    props.fetchSelectorLocalities({ survey_program_id: props.surveyProgramId });
  };

  useEffect(() => {
    getData();
    window.addEventListener("focus", getData);

    return () => {
      window.removeEventListener("focus", getData);
    };
  }, []);

  return (
    <Cascader
      onMouseDown={() => setOpenCascader(true)}
      open={openCascader}
      value={props.value}
      showSearch
      fieldNames={{
        label: "name",
        value: "id",
        children: "sites",
      }}
      expandTrigger="hover"
      options={props.data}
      onChange={props.onChange}
      dropdownRender={(menus) => {
        return (
          <>
            <div
              onClick={() => setOpenCascader(false)}
              style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                zIndex: 100,
              }}
            />
            <div style={{ zIndex: 200, position: "relative" }}>
              {menus}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                loading={props.loading}
                style={{ width: "100%", marginTop: "10px" }}
                popupMatchSelectWidth={false}
                onClick={() => {
                  window.open(
                    `/dashboard/surveyPrograms/${props.surveyProgramId}`,
                    "_blank"
                  );
                }}
              >
                NEW
              </Button>
            </div>
          </>
        );
      }}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorLocalities: (filters) =>
      dispatch(fetchSelectorLocalities(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.locality.selector,
    loading: state.locality.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteCascadeContainer);
