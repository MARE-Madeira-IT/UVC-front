import React from "react";
import { Avatar, Popconfirm, Tag } from 'antd';
import styled from "styled-components";
import TableComponent from "../../Common/TableComponent";
import RowOperation from "../../Common/RowOperation";
import { Children } from "react";


const Container = styled.div`
    width: 100%;
    
.editable-row {
    cursor: pointer;
}
    .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
        display: none;
    }
`;

const colorDecoder = {
    "admin": "gold",
    "validator": "cyan",
}

function TableContainer({ loading, data, meta, handlePageChange, setCurrent, handleDelete }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            fixed: 'left',
            width: 50,
        },
        {
            title: 'Sample',
            dataIndex: 'code',
            fixed: 'left',
            width: 250,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: 150,
        },
        {
            title: 'Locality',
            dataIndex: 'site',
            render: (site) => site.locality.name + " (" + site.locality.code + ")",
            width: 150,
        },
        {
            title: 'Site',
            dataIndex: 'site',
            render: (site) => site.name + " (" + site.code + ")",
            width: 150,
        },
        {
            title: 'Daily dive#',
            dataIndex: 'daily_dive',
            width: 150,
        },
        {
            title: 'Transect#',
            dataIndex: 'transect',
            width: 120,
        },
        {
            title: 'Time#',
            dataIndex: 'time',
            width: 120,
        },
        {
            title: 'Replica#',
            dataIndex: 'replica',
            width: 120,
        },
        {
            title: 'Depth',
            dataIndex: 'depth',
            render: (depth) => depth.name + " (" + depth.id + "#)",
            width: 150,
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            width: 150,
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            width: 150,
        },
        {
            title: 'Heading',
            dataIndex: 'heading',
            width: 150,
        },
        {
            title: 'Heading direction',
            dataIndex: 'heading_direction',
            width: 150,
        },
        {
            title: 'Dominant substrate',
            dataIndex: 'dom_substrate',
            width: 150,
        },
        {
            title: 'Site area',
            dataIndex: 'site_area',
            width: 150,
        },
        {
            title: 'Distance',
            dataIndex: 'distance',
            width: 150,
        },
        {
            title: 'Dive team',
            dataIndex: 'users',
            children: [
                {
                    title: 'FISH',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[0].pivot.user,
                },
                {
                    title: 'CRYPTIC',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[1].pivot.user,

                },
                {
                    title: 'MACROINV.',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[2].pivot.user,

                },
                {
                    title: 'DOM_URCHIN',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[3].pivot.user,

                },
                {
                    title: 'BENTHIC',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[4].pivot.user,

                },
                {
                    title: 'PHOTO',
                    dataIndex: 'functions',
                    width: 150,
                    render: (functions) => functions[5].pivot.user,

                },
            ]
        },
        {
            title: '',
            dataIndex: 'Operation',
            width: 50,
            fixed: "right",
            render: (_, record) =>
                <RowOperation
                    deleteRow
                    updateRow
                    onUpdateClick={() => setCurrent(record)}
                    onDeleteConfirm={() => handleDelete(record.id)}
                />
        },
    ];


    return (
        <Container>
            <TableComponent
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={(aPage) => handlePageChange(aPage)}
                scroll={{ x: 1500 }}
            />
        </Container>
    )
}

export default TableContainer;
