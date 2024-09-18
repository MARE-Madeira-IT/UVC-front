import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchFunctions, createFunction, updateFunction, deleteFunction } from "../../../../../redux/redux-modules/function/actions";
import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;

`;

function Function(props) {
    const { data, loading, meta, surveyProgramId } = props;

    const [filters, setFilters] = useState({ survey_program: surveyProgramId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})

    useEffect(() => {
        props.fetchFunctions(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchFunctions(pagination.current, filters);
    }

    const handleCancel = () => {
        setCurrent({});
        setVisible(false)
    }

    const handleEdit = (aCurrent) => {
        setCurrent(aCurrent);
        setVisible(true)
    }

    return (
        <Container>
            <TitleAddSection
                title="Function(s)"
                handleClick={() => setVisible(true)}
            />


            <ContentContainer>
                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    current={current}
                    create={props.createFunction}
                    update={props.updateFunction}
                    surveyProgramId={surveyProgramId}
                />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ ...filters,search: e })} size="large" type="search" placeholder="Search by function" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setCurrent={handleEdit}
                    handleDelete={props.deleteFunction}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFunctions: (page, filters) => dispatch(fetchFunctions(page, filters)),
        updateFunction: (id, data) => dispatch(updateFunction(id, data)),
        createFunction: (data) => dispatch(createFunction(data)),
        deleteFunction: (id) => dispatch(deleteFunction(id))

    };
};

const mapStateToProps = (state) => {
    return {
        loading: state._function.loading,
        data: state._function.data,
        meta: state._function.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Function);