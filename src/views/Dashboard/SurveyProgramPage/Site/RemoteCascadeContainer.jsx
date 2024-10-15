import { PlusOutlined } from "@ant-design/icons";
import { Button, Cascader } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSelectorLocalities } from "../../../../../redux/redux-modules/locality/actions";

function RemoteCascadeContainer(props) {
  const {
    fetchSelectorLocalities,
    surveyProgramId,
    maxTagCount,
    multiple,
    value,
    selectCat,
    data,
    loading,
    create = true,
  } = props;
  const [openCascader, setOpenCascader] = useState(false);

  const getData = () => {
    fetchSelectorLocalities({ survey_program: surveyProgramId });
  };

  useEffect(() => {
    getData();
    window.addEventListener("focus", getData);

    return () => {
      window.removeEventListener("focus", getData);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [surveyProgramId]);

  return (
    <Cascader
      maxTagCount={maxTagCount}
      multiple={multiple}
      onMouseDown={() => setOpenCascader(true)}
      open={openCascader}
      value={value}
      showSearch
      changeOnSelect={selectCat}
      fieldNames={{
        label: "name",
        value: "id",
        children: "sites",
      }}
      expandTrigger="hover"
      options={data}
      onChange={(e) => {
        if (!multiple) {
          setOpenCascader(false);
        }
        props.onChange(e);
      }}
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
              {create && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  loading={loading}
                  style={{ width: "100%", marginTop: "10px" }}
                  popupMatchSelectWidth={false}
                  onClick={() => {
                    window.open(
                      `/dashboard/surveyPrograms/${surveyProgramId}`,
                      "_blank"
                    );
                  }}
                >
                  NEW
                </Button>
              )}
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
