import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchIndicators, createIndicator, updateIndicator, deleteIndicator } from "../../../../../redux/redux-modules/indicator/actions";
import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;

`;

function Indicator(props) {
    const { data, loading, meta, surveyProgramId } = props;

    const [filters, setFilters] = useState({ surveyProgram: surveyProgramId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState()

    useEffect(() => {
        props.fetchIndicators(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchIndicators(pagination.current, filters);
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
                title="Indicator(s)"
                handleClick={() => setVisible(true)}
            />


            <ContentContainer>
                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    current={current}
                    create={props.createIndicator}
                    update={props.updateIndicator}
                    surveyProgramId={surveyProgramId}
                />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ ...filters,search: e })} size="large" type="search" placeholder="Search by indicator" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setCurrent={handleEdit}
                    handleDelete={props.deleteIndicator}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchIndicators: (page, filters) => dispatch(fetchIndicators(page, filters)),
        updateIndicator: (id, data) => dispatch(updateIndicator(id, data)),
        createIndicator: (data) => dispatch(createIndicator(data)),
        deleteIndicator: (id) => dispatch(deleteIndicator(id))

    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.indicator.loading,
        data: state.indicator.data,
        meta: state.indicator.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicator);