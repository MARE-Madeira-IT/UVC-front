import { PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Flex, Input, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createTaxa,
  fetchSelectorTaxas,
} from "../../../../../redux/redux-modules/taxa/actions";
import AddImageToNewTaxaModal from "./AddImageToNewTaxaModal";

function RemoteCascadeContainer(props) {
  const [openCascader, setOpenCascader] = useState(false);
  const [photoUploadTaxaId, setPhotoUploadTaxaId] = useState(false);
  const [newTaxaName, setNewTaxaName] = useState();
  const [createTaxaError, setCreateTaxaError] = useState();
  const [newTaxaCategoryId, setNewTaxaCategoryId] = useState(1);
  const {
    data,
    onChange,
    value,
    surveyProgramId,
    categories,
    species,
    loading,
    disabled,
    loadTaxas = true,
  } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (loadTaxas) {
      props.fetchSelectorTaxas({
        surveyProgram: surveyProgramId,
      });
    }
  }, []);

  const updateList = () => {
    let optionsAux;
    if (categories) {
      optionsAux = [...data]
        .filter((el) => el?.taxas?.length > 0)
        .filter((el) => categories.includes(el.name));
    } else {
      optionsAux = [...data].filter((el) => el?.taxas?.length > 0);
    }

    if (species) {
      optionsAux = [...optionsAux].map((el) => ({
        ...el,
        taxas: el?.taxas.filter((taxa) => species.includes(taxa.name)),
      }));
    }

    setOptions(optionsAux);
  };

  useEffect(() => {
    if (!loading) {
      updateList();
    }
  }, [species, categories, data, loading]);

  useEffect(() => {
    if (value && options?.length > 0) {
      let possibleIds = [];
      if (options[0]?.taxas) {
        options.forEach((cat) => {
          possibleIds = [...possibleIds, ...cat.taxas.map((taxa) => taxa.id)];
        });
      } else {
        possibleIds = options.map((taxa) => taxa.id);
      }
      if (!possibleIds.includes(value[1])) {
        onChange(null);
      }
    }
  }, [options, value]);

  return (
    <>
      <Cascader
        disabled={disabled}
        open={openCascader}
        onMouseDown={() => setOpenCascader(true)}
        value={options?.length === 1 && value ? value[1] : value}
        showSearch
        fieldNames={{
          label: "name",
          value: "id",
          children: "taxas",
        }}
        expandTrigger="hover"
        options={options?.length === 1 ? options[0].taxas : options}
        onChange={(e) => {
          setOpenCascader(false);
          if (options?.length === 1) {
            onChange([options[0]?.id, ...e]);
          } else {
            onChange(e);
          }
        }}
        onSearch={() => setOpenCascader(true)}
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
                <Flex>
                  <Select
                    defaultValue={1}
                    onChange={(e) => setNewTaxaCategoryId(e)}
                    options={data}
                    fieldNames={{ label: "name", value: "id" }}
                    dropdownRender={(menu) => (
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {menu}
                      </div>
                    )}
                  />
                  <Tooltip
                    open={createTaxaError}
                    trigger={null}
                    title="Name taken"
                    color="#ff4949"
                  >
                    <Input
                      style={{
                        borderColor: createTaxaError ? "#ff4949" : null,
                      }}
                      placeholder="Create new"
                      onChange={(e) => setNewTaxaName(e.target.value)}
                    />
                  </Tooltip>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    loading={props.loading}
                    style={{ aspectRatio: 1, flexShrink: 0 }}
                    popupMatchSelectWidth={false}
                    onClick={async () => {
                      try {
                        let res = await props.createTaxa({
                          name: newTaxaName,
                          genus: newTaxaName,
                          survey_program_id: surveyProgramId,
                          category_id: newTaxaCategoryId,
                        });

                        await props.fetchSelectorTaxas({
                          surveyProgram: surveyProgramId,
                        });

                        onChange(
                          options[0]?.taxas
                            ? [newTaxaCategoryId, res?.value?.data?.data?.id]
                            : [res?.value?.data?.data?.id]
                        );
                        setOpenCascader(false);

                        //Open popup to insert photo
                        setPhotoUploadTaxaId(res?.value?.data?.data?.id);
                        setCreateTaxaError(null);
                      } catch (err) {
                        setCreateTaxaError(err);
                      }
                    }}
                  />
                </Flex>
              </div>
            </>
          );
        }}
      />
      <AddImageToNewTaxaModal
        taxaId={photoUploadTaxaId}
        setTaxaId={setPhotoUploadTaxaId}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorTaxas: (filters) => dispatch(fetchSelectorTaxas(filters)),
    createTaxa: (data) => dispatch(createTaxa(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.taxa.selector,
    state: state.taxa,
    loading: state.taxa.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteCascadeContainer);
