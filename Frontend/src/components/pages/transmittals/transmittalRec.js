import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Card, CardBody, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import {getTransmittalRec, clearRecord, saveAndUpdateTransmittal} from './../../../actions/transmittalAction';
import TransmittalForm from './transmittalForm';
import {useTransmittalState, useTransmittalDispatch} from '../../../context/transmittalContext';

const TransmittalRec=(props)=>{
  const {id}= useParams() ;
  
  const {loading,rec}=useTransmittalState();
  const dispatch=useTransmittalDispatch();
  useEffect(()=>{
    if(id==0){
      clearRecord(dispatch)
    }else{
      bindRec(id);       
    }
  },[]);

  const bindRec=async(id)=>{
    const res=await getTransmittalRec(dispatch,id);
    if(res.error){
      toast.error(res.errorMessage)
    }
  }
  const saveRec=async(data)=>{
    const reqData=data;
    if(id==0){
      reqData.transmittalid=0;
    }
    const resp=await saveAndUpdateTransmittal(reqData);
    if(!resp.error){
      toast.success(resp.message);
      props.history.push('/transmittals');
    }else{
      toast.error(resp.errorMessage);
    }
  }
  
return(<>
 <PageHeader
      title="Transmittals Rec"
      className="mb-2"
    />
     <Card>
      <CardBody>
        <TransmittalForm defaultValues={{...(rec||{})}} onCancelClick={async()=>{
          await clearRecord(dispatch);
          props.history.push('/transmittals');
        }} onSubmitClick={async(data)=>{
          saveRec(data);
        }} />
      </CardBody>
    </Card>
</>
)
}

export default TransmittalRec;