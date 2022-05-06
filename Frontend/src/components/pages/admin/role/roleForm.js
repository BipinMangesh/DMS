import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Col, Input, Row } from 'reactstrap';
const schema = yup.object({
    RoleName: yup.string().required('Role Name is a required'),
    IsActive:yup.bool().default(true),
  });

const RoleForm=({ onCancelClick, onSubmitClick, defaultValues})=>{
    useEffect(()=>{
        if(Object.keys(defaultValues).length > 0){
            setValue('RoleName',defaultValues.RoleName, { shouldValidate: true, shouldDirty: true });
            setValue('IsActive',defaultValues.IsActive, );     
        }
    },[defaultValues]);
    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        const submitData={...defaultValues, ...data};
        onSubmitClick(submitData);        
    };
    return(<>
        <form key="frmRole" className="g-3" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                    <label className="form-label" htmlFor='RoleName'>Role Name *</label>
                    <input className="form-control form-control-sm" id="RoleName" type="text" {...register("RoleName")} />
                    {errors.RoleName && <span className='text-danger fs--2'>{errors.RoleName.message}</span>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="form-label" htmlFor="IsActive">Is Active</label>
                    <select className="form-control form-control-sm" id="IsActive"{...register("IsActive")}>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </Col>
            </Row>
            <Row className='flex-between-center mt-3'>
            <Col xs={'auto'}>
                    <button className="btn btn-danger btn-sm" type="button" onClick={(e)=>{onCancelClick(e);}}>Cancel</button>
                </Col>
                <Col xs={'auto'}>
                    <button className="btn btn-primary btn-sm" type="submit">Save</button>                    
                </Col>
            </Row>
        </form>
    </>)

}

export default RoleForm
  

