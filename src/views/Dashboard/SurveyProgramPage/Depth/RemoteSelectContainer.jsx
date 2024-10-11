import { Select } from 'antd'
import React, { useEffect } from 'react'
import { fetchSelectorDepths } from '../../../../../redux/redux-modules/depth/actions'
import { connect } from 'react-redux'

function RemoteSelectContainer(props) {

    useEffect(() => {
        props.fetchSelectorDepths({ survey_program: props.surveyProgramId })
    }, [])


    return (
        <Select
            value={props.value}
            showSearch
            fieldNames={{
                label: "name",
                value: "id"
            }}
            onChange={props.onChange}
            options={props.data}
        />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelectorDepths: (filters) => dispatch(fetchSelectorDepths(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.depth.selector,
        loading: state.depth.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteSelectContainer);