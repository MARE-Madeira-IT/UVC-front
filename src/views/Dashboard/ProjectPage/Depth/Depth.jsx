import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchDepths, createDepth, updateDepth, deleteDepth } from "../../../../../redux/redux-modules/depth/actions";
import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;

`;

function Depth(props) {
    const { data, loading, meta, projectId } = props;

    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})

    useEffect(() => {
        props.fetchDepths(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchDepths(pagination.current, filters);
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
                title="Depth categories"
                handleClick={() => setVisible(true)}
            />


            <ContentContainer>
                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    current={current}
                    create={props.createDepth}
                    update={props.updateDepth}
                    projectId={projectId}
                />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ ...filters, search: e })} size="large" type="search" placeholder="Search by depth" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setCurrent={handleEdit}
                    handleDelete={props.deleteDepth}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepths: (page, filters) => dispatch(fetchDepths(page, filters)),
        updateDepth: (id, data) => dispatch(updateDepth(id, data)),
        createDepth: (data) => dispatch(createDepth(data)),
        deleteDepth: (id) => dispatch(deleteDepth(id))

    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.depth.loading,
        data: state.depth.data,
        meta: state.depth.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Depth);