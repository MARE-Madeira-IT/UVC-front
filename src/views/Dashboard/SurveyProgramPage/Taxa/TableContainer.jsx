import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Badge, Button, Flex, Image, Popover } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchTaxas,
  updateValidation,
} from "../../../../../redux/redux-modules/taxa/actions";
import RowOperation from "../../Common/RowOperation";
import TableComponent from "../../Common/TableComponent";
import AddImageToNewTaxaModal from "./AddImageToNewTaxaModal";

const Container = styled.div`
  width: 100%;

  .editable-row {
    cursor: pointer;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }

  .ant-badge > .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }
`;

const ValidateButtonContainer = styled.div`
  .ant-btn.validate-unvalidated {
    background-color: green;
    color: white;
  }

  .ant-btn.validate-unvalidated:hover {
    color: green;
    border-color: green;
    background-color: white;
  }

  .ant-btn.validate-validated {
    background-color: red;
    color: white;
  }

  .ant-btn.validate-validated:hover {
    color: red;
    border-color: red;
    background-color: white;
  }
`;

const colorDecoder = {
  admin: "gold",
  validator: "cyan",
};

const TaxaBadge = ({ validated, has_photo }) => {
  if (validated) {
    return <Badge color={"green"} size="large" />;
  }
  if (has_photo) {
    return <Badge color={"yellow"} size="large" />;
  }
  return <Badge color={"red"} size="large" />;
};

const TaxaPhotoColumn = ({ photo_url, taxa_id, loading }) => {
  const [photoUploadTaxaId, setPhotoUploadTaxaId] = useState();

  if (photo_url) {
    return <Image width={130} src={photo_url} />;
  } else
    return (
      <>
        <AddImageToNewTaxaModal
          taxaId={photoUploadTaxaId}
          setTaxaId={setPhotoUploadTaxaId}
        />
        <Button
          loading={loading}
          onClick={() => setPhotoUploadTaxaId(taxa_id)}
          icon={<UploadOutlined />}
        >
          Add Image
        </Button>
      </>
    );
};

function TableContainer({
  loading,
  data,
  meta,
  indicators,
  handlePageChange,
  setCurrent,
  handleDelete,
  ...props
}) {
  const [indicatorColumns, setIndicatorColumns] = useState([]);
  let columns = [
    {
      title: "#",
      dataIndex: "id",
      fixed: "left",
      width: 80,
    },
    {
      title: "",
      dataIndex: "validated",
      width: 80,
      fixed: "left",
      render: (validated, rest) => {
        return (
          <Popover
            content={
              <Flex vertical gap={"10px"} align="center">
                {validated
                  ? null
                  : rest.photo_url
                  ? "Taxa has image"
                  : "Taxa doesn't have image"}
                <ValidateButtonContainer>
                  <Button
                    loading={loading}
                    onClick={() =>
                      props.updateValidation(rest.id, { validated: !validated })
                    }
                    className={
                      validated ? "validate-validated" : "validate-unvalidated"
                    }
                    icon={validated ? <CloseOutlined /> : <CheckOutlined />}
                  >
                    {validated ? "Remove validation" : "Validate"}
                  </Button>
                </ValidateButtonContainer>
              </Flex>
            }
          >
            <div>
              <TaxaBadge
                validated={validated}
                loading={loading}
                has_photo={rest.photo_url != null}
              />
            </div>
          </Popover>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      fixed: "left",
      render: (category) => category.name,
    },
    {
      title: "Image",
      dataIndex: "photo_url",
      width: 170,
      fixed: "left",
      render: (photo_url, { id }) => (
        <TaxaPhotoColumn photo_url={photo_url} taxa_id={id} />
      ),
    },
    {
      title: "Name",
      width: 150,
      fixed: "left",
      dataIndex: "name",
    },
    {
      title: "Genus",
      width: 150,
      dataIndex: "genus",
    },
    {
      title: "Species",
      width: 150,
      dataIndex: "species",
    },
    {
      title: "Phylum",
      width: 150,
      dataIndex: "phylum",
    },
  ];

  const operationColumns = [
    {
      title: "",
      dataIndex: "Operation",
      fixed: "right",
      width: 50,
      render: (_, record) => (
        <RowOperation
          deleteRow
          updateRow
          onUpdateClick={() => setCurrent(record.id)}
          onDeleteConfirm={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    let newColumns = [];
    if (indicators.length) {
      let newChildren = [];
      indicators.map((indicator) => {
        newChildren.push({
          title: indicator.name,
          dataIndex: "indicators",
          width: 150,
          render: (indicators) =>
            indicators.map(
              (value) => value.name === indicator.name && value.pivot.name
            ),
        });
      });

      newColumns.push({
        title: "Indicators(s)",
        children: newChildren,
      });
    }

    setIndicatorColumns(newColumns);
  }, [indicators]);

  return (
    <Container>
      <TableComponent
        scroll={{ x: 1500 }}
        loading={loading}
        data={data}
        columns={[...columns, ...indicatorColumns, ...operationColumns]}
        meta={meta}
        handlePageChange={(aPage) => handlePageChange(aPage)}
      />
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTaxas: (page, filters) => dispatch(fetchTaxas(page, filters)),
    updateValidation: (id, data) => dispatch(updateValidation(id, data)),
  };
};

export default connect(null, mapDispatchToProps)(TableContainer);
