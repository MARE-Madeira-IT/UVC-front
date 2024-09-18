import { Select } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function ExternalRemoteSelectContainer(props) {

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


const mapStateToProps = (state) => {
    return {
        data: state.substrate.selector,
        loading: state.substrate.loading,
    };
};

export default connect(
    mapStateToProps,
    null
)(ExternalRemoteSelectContainer);