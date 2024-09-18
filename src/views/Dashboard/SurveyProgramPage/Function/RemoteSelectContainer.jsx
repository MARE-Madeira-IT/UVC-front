import { Select } from 'antd'
import React, { useEffect } from 'react'
import { fetchSelectorFunctions } from '../../../../../redux/redux-modules/function/actions'
import { connect } from 'react-redux'

function RemoteSelectContainer(props) {

    useEffect(() => {
        props.fetchSelectorFunctions({ survey_program_id: props.surveyProgramId })
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
        fetchSelectorFunctions: (filters) => dispatch(fetchSelectorFunctions(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state._function.selector,
        loading: state._function.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteSelectContainer);