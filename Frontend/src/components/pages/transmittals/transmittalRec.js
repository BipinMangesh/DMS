import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, CardBody, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import {getTransmittalRec, clearRecord} from './../../../actions/transmittalAction';
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
      getTransmittalRec(dispatch,id);
    }
  },[]);
  
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
        }} onSubmitClick={async()=>{

        }} />
      </CardBody>
    </Card>
</>
)
}

export default TransmittalRec;