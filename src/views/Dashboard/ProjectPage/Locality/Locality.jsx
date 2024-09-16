import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchLocalities, createLocality, updateLocality, deleteLocality } from "../../../../../redux/redux-modules/locality/actions";
import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;

`;

function Locality(props) {
    const { data, loading, meta, projectId } = props;

    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState()

    useEffect(() => {
        props.fetchLocalities(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchLocalities(pagination.current, filters);
    }

    const handleCancel = () => {
        setCurrent();
        setVisible(false)
    }

    const handleEdit = (aCurrent) => {
        setCurrent(aCurrent);
        setVisible(true)
    }

    return (
        <Container>
            <TitleAddSection
                title="Site(s) and localities"
                handleClick={() => setVisible(true)}
            />


            <ContentContainer>
                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    current={current}
                    create={props.createLocality}
                    update={props.updateLocality}
                    projectId={projectId}
                />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ ...filters,search: e })} size="large" type="search" placeholder="Search by locality or site" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setCurrent={handleEdit}
                    handleDelete={props.deleteLocality}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalities: (page, filters) => dispatch(fetchLocalities(page, filters)),
        updateLocality: (id, data) => dispatch(updateLocality(id, data)),
        createLocality: (data) => dispatch(createLocality(data)),
        deleteLocality: (id) => dispatch(deleteLocality(id))

    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.locality.loading,
        data: state.locality.data,
        meta: state.locality.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locality);