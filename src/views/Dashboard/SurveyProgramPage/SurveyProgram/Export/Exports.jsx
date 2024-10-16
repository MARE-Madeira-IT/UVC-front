import { Button, Flex, Modal } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  createExport,
  deleteExport,
  fetchExports,
} from "../../../../../../redux/redux-modules/export/actions";
import ExportForm from "./FormContainer";
import TableContainer from "./TableContainer";
import axiosConfig from "src/axiosConfig";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 20px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const Exports = (props) => {
  const { current, visible, data, loading, meta } = props;
  const [filters, setFilters] = useState();
  const [createExportVisible, setCreateExportVisible] = useState(false);

  const handleCancel = () => {
    setCreateExportVisible(false);
  };

  function handlePageChange(pagination) {
    props.fetchExports(pagination.current, filters);
  }

  useEffect(() => {
    setFilters({ surveyProgram: current });
  }, [current]);

  useEffect(() => {
    if (filters?.surveyProgram) {
      props.fetchExports(1, filters);
    }
  }, [filters]);

  const download = (data) => {
    axiosConfig
      .get(`/exports/${data.id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", data.url);
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  };

  return (
    <>
      <ExportForm
        create={props.createExport}
        loading={loading}
        current={current}
        visible={createExportVisible}
        handleCancel={handleCancel}
      />
      <CustomModal
        footer={
          <Flex vertical={false} gap={10} justify="end">
            <Button type="primary" onClick={() => setCreateExportVisible(true)}>
              Create new
            </Button>
            <Button onClick={props.handleCancel}>Close</Button>
          </Flex>
        }
        width={1280}
        title="Export List"
        open={visible}
        onCancel={props.handleCancel}
        centered
      >
        <TableContainer
          download={download}
          handlePageChange={handlePageChange}
          data={data}
          loading={loading}
          meta={meta}
          handleDelete={props.deleteExport}
        />
      </CustomModal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExports: (page, filters) => dispatch(fetchExports(page, filters)),
    createExport: (data) => dispatch(createExport(data)),
    deleteExport: (id) => dispatch(deleteExport(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state._export.loading,
    data: state._export.data,
    meta: state._export.meta,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exports);
