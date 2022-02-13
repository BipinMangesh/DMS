import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "flatpickr/dist/themes/material_green.css";
import TransmittalDetails from './transmittalDetails';
const schema = yup.object({
    wonNo: yup.string().required(),
    wonTitle:yup.string().required(),
    transmittalNo:yup.string().required(),
    date:yup.date().required(),
    from:yup.string().required(),
    to:yup.string().required()
  });
  
const TransmittalForm=({ onCancelClick, onSubmitClick, defaultValues})=>{
    const [transmittalDetailsData,setTransmittalDetailsData]=useState((defaultValues||{}).transmittalDetails||[]);
    useEffect(()=>{
        if(Object.keys(defaultValues).length > 0){
        setValue('wonNo',defaultValues.wonNo, { shouldValidate: true, shouldDirty: true });
        setValue('transmittalNo',defaultValues.transmittalNo, { shouldValidate: true, shouldDirty: true });
        setValue('wonTitle',defaultValues.wonTitle, { shouldValidate: true, shouldDirty: true });
        setValue('date',defaultValues.date?moment(defaultValues.date,'YYYY-MM-DD').toDate():undefined, { shouldValidate: true, shouldDirty: true });
        setValue('from',defaultValues.from, { shouldValidate: true, shouldDirty: true });
        setValue('to',defaultValues.to, { shouldValidate: true, shouldDirty: true });
        setTransmittalDetailsData((defaultValues||{}).transmittalDetails);        
        }
    },[defaultValues]);

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        const submitData={...defaultValues, ...data};
        submitData.transmittalDetailData=[...transmittalDetailsData];
        onSubmitClick(submitData);        
    };
    
    return(<>
        <form key="frmMaster" className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-2">
                <label className="form-label" htmlFor='wonNo'>Won No *</label>
                <input className="form-control" id="wonNo" type="text" {...register("wonNo")} />
                {errors.wonNo && <span className='text-danger fs--2'>{errors.wonNo.message}</span>}
            </div>
            <div className="col-md-6">
                <label className="form-label" htmlFor="wonTitle">Won Title *</label>
                <input className="form-control" id="wonTitle" type="text" {...register("wonTitle")} />
                {errors.wonTitle && <span className='text-danger fs--2'>{errors.wonTitle.message}</span>}
            </div>
            <div className="col-md-4">
                <label className="form-label" htmlFor="transmittalNo">Transmittal No *</label>
                <input className="form-control" id="transmittalNo" type="text" placeholder="" {...register("transmittalNo")} />
                {errors.transmittalNo && <span className='text-danger fs--2'>{errors.transmittalNo.message}</span>}
            </div>
            <div className="col-md-2">
                <label className="form-label" htmlFor="date">Date *</label>
                    <Controller id="date"
                        name="checkbox"
                        control={control}
                        {...register("date")}
                        render={({ field }) => <Flatpickr className="form-control" {...field} />}
                    />
                {errors.date && <span className='text-danger fs--2'>{errors.date.message}</span>}
                
            </div>
            <div className="col-md-5">
                <label className="form-label" htmlFor="from">From *</label>
                <input className="form-control" id="from" type="text" {...register("from")} />
                {errors.from && <span className='text-danger fs--2'>{errors.from.message}</span>}
            </div>
            <div className="col-md-5">
                <label className="form-label" htmlFor="to">To *</label>
                <input className="form-control" id="to" type="text" {...register("to")} />
                {errors.to && <span className='text-danger fs--2'>{errors.to.message}</span>}
            </div>
            
            <div className="col-md-12 mt-3 text-right" style={{display:'none'}}>
                <button className="btn btn-primary mr-3" type="submit" id="btnMasterSubmit">Save</button>
                <button className="btn btn-danger" type="button" onClick={(e)=>{onCancelClick(e);}}>Cancel</button>
            </div>
        </form>
        <div className='row mt-3'>
            <div className='col-md-12'>
                <div class="card border mb-3">
                    <div class="card-body position-relative">
                        <div class="row">
                            <div class="col-md-12">
                                <TransmittalDetails 
                                    data={transmittalDetailsData||[]} 
                                    onDeleteRec={async (row)=>{
                                        const idx= transmittalDetailsData.findIndex(rec=>{
                                            return rec.tdRecId==row.original.tdRecId;
                                        });
                                        if(idx!==-1){
                                            transmittalDetailsData.splice(idx,1);
                                            setTransmittalDetailsData([...transmittalDetailsData]);
                                        }

                                    }}
                                    onSubmitDetailsForm={async(data,clearDetails)=>{
                                        if(data.tdRecId){
                                            const idx=transmittalDetailsData.findIndex(rec=>{
                                                return rec.tdRecId==data.tdRecId
                                            })
                                            if(idx>-1){
                                                transmittalDetailsData[idx]={...transmittalDetailsData[idx],...data};
                                                console.log(transmittalDetailsData)
                                                await setTransmittalDetailsData([...transmittalDetailsData]);
                                                await clearDetails()
                                            }

                                        }else{
                                        const maxVal= Math.max.apply(Math, transmittalDetailsData.map((o)=> { return o.tdRecId; }))
                                            const detObj={
                                                description: data.description,
                                                docNumber: data.docNumber,
                                                rev: data.rev,
                                                status: data.status,
                                                tdRecId: (maxVal+1),
                                                transmittalDetailid: 0,
                                                type: data.type
                                            }
                                            transmittalDetailsData.push(detObj);
                                        }
                                        console.log(transmittalDetailsData)
                                        await setTransmittalDetailsData([...transmittalDetailsData]);
                                        await clearDetails()
                                    }}
                                />                                
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div className="col-md-12 mt-3 text-right">
                <button className="btn btn-primary mr-3" type="button" onClick={(e)=>{
                    const submitBtn=document.getElementById('btnMasterSubmit');
                    submitBtn.click(e);
                }}>Save</button>
                <button className="btn btn-danger" type="button" onClick={(e)=>{onCancelClick(e);}}>Cancel</button>
            </div>
        </div>
        
    </>)
}
export default TransmittalForm