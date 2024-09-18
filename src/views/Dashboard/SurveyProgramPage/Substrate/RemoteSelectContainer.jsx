import { Select } from 'antd'
import React, { useEffect } from 'react'
import { fetchSelectorSubstrates } from '../../../../../redux/redux-modules/substrate/actions'
import { connect } from 'react-redux'

function RemoteSelectContainer(props) {

    useEffect(() => {
        props.fetchSelectorSubstrates({ survey_program_id: props.surveyProgramId })
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
        fetchSelectorSubstrates: (filters) => dispatch(fetchSelectorSubstrates(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.substrate.selector,
        loading: state.substrate.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteSelectContainer);