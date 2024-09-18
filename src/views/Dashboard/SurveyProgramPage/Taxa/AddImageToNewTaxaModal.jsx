import { Alert, Button, Modal, Upload } from "antd";
import { connect } from "react-redux";
import { uploadTaxaPhoto } from "../../../../../redux/redux-modules/taxa/actions";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

function AddImageToNewTaxaModal(props) {
  const { taxaId, setTaxaId, uploadTaxaPhoto } = props;
  const [file, setFile] = useState();
  const [error, setError] = useState();

  const submitPhoto = () => {
    const formData = new FormData();
    formData.append("photo", file);

    uploadTaxaPhoto(taxaId, formData)
      .then(() => setTaxaId())
      .catch((err) =>
        setError(
          err?.response?.data?.errors?.photo ??
            err?.response?.statusText ??
            "Error"
        )
      );
  };

  const handleSkip = () => {
    setTaxaId(false);
  };

  return (
    <Modal
      title="Add Taxa Image"
      open={taxaId}
      onOk={submitPhoto}
      onCancel={handleSkip}
      cancelText={"Submit Later"}
      okText="Submit"
    >
      <Upload
        maxCount={1}
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        onRemove={() => setFile()}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>
          Choose an image or drag it here
        </Button>
      </Upload>
      {error && (
        <Alert style={{ marginTop: "20px" }} message={error} type="error" />
      )}
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadTaxaPhoto: (id, data) => dispatch(uploadTaxaPhoto(id, data)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.taxa.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImageToNewTaxaModal);
