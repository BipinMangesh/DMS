import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import RTable from '../../table';

const detailSchema = yup.object({
    docNumbe: yup.string().required(),
    description:yup.string().required(),
    rev:yup.string().required(),
    status:yup.string().required(),
    type:yup.string().required()
  });
const TransmittalDetails=(props)=>{
    const [loading, setLoading]=useState(false);
    const [selectedRow,setSelectedRow]=useState({});
    const {data,onDeleteRec, onSubmitDetailsForm}=props;
    const {  register: register2, handleSubmit:handleSubmit2, setValue:setValue2, reset:reset2, formState: { errors: errors2 } } = useForm({
        mode: "all",
        resolver: yupResolver(detailSchema)
    });

    const onEditClick=(row)=>{
        const {original}=row;
        setValue2('docNumbe',original.docNumbe, { shouldValidate: true, shouldDirty: true });
        setValue2('description',original.description, { shouldValidate: true, shouldDirty: true });
        setValue2('rev',original.rev, { shouldValidate: true, shouldDirty: true });
        setValue2('status',original.status, { shouldValidate: true, shouldDirty: true });
        setValue2('type',original.type, { shouldValidate: true, shouldDirty: true });
        setSelectedRow({...original});
    }
    const onSubmitDetails=(data)=>{
        onSubmitDetailsForm({...selectedRow,...data},()=>{
            clearDetails();            
        });
    }
    const onDeleteClick=(row)=>{
        if(onDeleteRec){
            onDeleteRec(row)
        }
    }
    const clearDetails=()=>{
        reset2({ 
            docNumbe: '',
            description:'',
            rev:'',
            status:'',
            type:''
        });
        setSelectedRow({});
    }
    const columns = [{
                Header: 'Doc No.',
                accessor: 'docNumbe',
              },
              {
                Header: 'Description',
                accessor: 'description',
              },
              {
                Header: 'Rev',
                accessor: 'rev',
              },
              {
                Header: 'Status',
                accessor: 'status',
              },
              
              {
                Header: 'Type',
                accessor: 'type',
              },
              {
                Header: 'Action',
                id: 'action',
                Cell:({row})=>{              
                  return (<>
                    <ButtonGroup>
                        <Button outline size='sm' type='button' onClick={()=>onEditClick(row)}><FontAwesomeIcon icon='pencil-alt' /> </Button>  
                        <Button outline size='sm' type='button' onClick={()=>{
                            onDeleteClick(row)
                            }
                        }> <FontAwesomeIcon icon={'trash'} /></Button>           
                    </ButtonGroup></>)
                }
              }
            ];

    return(<>
         <form key="frmDetails" className=" g-2" onSubmit={handleSubmit2(onSubmitDetails)}>
            <div className='row mb-2'>
                <div className="col-md-2">
                    <input className="form-control" size={'sm'} id="docNumbe" type="text" placeholder='Doc No *' {...register2("docNumbe")} />
                    {errors2.docNumbe && <span className='text-danger fs--2'>{errors2.docNumbe.message}</span>}
                </div>
                <div className="col-md-4">
                    <input className="form-control" size={'sm'} id="description" type="text" placeholder='Description *' {...register2("description")} />
                    {errors2.description && <span className='text-danger fs--2'>{errors2.description.message}</span>}
                </div>
                <div className="col-md-3">
                    <input className="form-control" size={'sm'} id="rev" type="text" placeholder="Rev *" {...register2("rev")} />
                    {errors2.rev && <span className='text-danger fs--2'>{errors2.rev.message}</span>}
                </div>
                <div className="col-md-3">
                    <input className="form-control" size={'sm'} id="status" type="text" placeholder="Status *" {...register2("status")} />
                    {errors2.status && <span className='text-danger fs--2'>{errors2.status.message}</span>}
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-md-2">
                    <select className="form-control" size={'sm'} id="type" type="text" placeholder="Type *" {...register2("type")}>
                        <option value=''></option>
                        <option value='ORIGINALS'>ORIGINALS</option>
                    </select>
                    {errors2.type && <span className='text-danger fs--2'>{errors2.type.message}</span>}
                </div>
                <div className="col-md-10 text-right">
                    <button className="btn btn-outline-primary mr-2" type="submit">Save</button>
                    <button className="btn btn-outline-danger"  type="button" onClick={() => {                        
                        clearDetails();
                    }}>Cancel</button>
                </div>
            </div>
            
        </form> 
        <RTable columns={columns} loading={loading} data={data||[]} />
        </>
    );
}
export default TransmittalDetails