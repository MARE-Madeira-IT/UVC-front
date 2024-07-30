import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'
import styled from "styled-components";
import { connect } from "react-redux";


const CustomModal = styled(Modal)`
    .ant-modal-body {
        padding: 30px 60px;
    } 
`;

const requiredRule = { required: true };

function FormContainer(props) {
    const [form] = Form.useForm();
    const { current, visible, projectId } = props

    const handleOk = () => {
        form.validateFields().then(values => {
            if (current.id) {
                props.update(current.id, { ...values, project_id: projectId }).then(() => {
                    handleCancel();
                });
            } else {
                props.create({ ...values, project_id: projectId }).then(() => {
                    handleCancel();
                });
            }


        });

    };

    const handleCancel = () => {
        props.handleCancel();
        form.resetFields();
    };



    useEffect(() => {
        if (current.id) {
            form.setFieldsValue({
                name: current.name,
            });
        }

    }, [visible])

    return (
        <CustomModal
            width={720}
            title="Edit project's depth categories"
            open={visible}
            onCancel={handleCancel}
            centered
            onOk={handleOk}
        >


            <Form style={{ margin: "30px auto" }} layout="vertical" requiredMark form={form}>
                <Row gutter={16}>
                    <Col xs={24} md={24}>
                        <Form.Item label="Depth" name="name" rules={[{ ...requiredRule, message: "'depth' is required" }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>


        </CustomModal >
    )
}



const mapStateToProps = (state) => {
    return {
        loading: state.depth.loading,
    };
};

export default connect(mapStateToProps, null)(FormContainer);