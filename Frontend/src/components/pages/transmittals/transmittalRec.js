import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import RTable from '../../table';
import {getAllTransmittals} from '../../../actions/transmittalAction'
import {useTransmittalState, useTransmittalDispatch} from '../../../context/transmittalContext';
import Flex from '../../../components/common/Flex';
import {data} from './testData'

const TransmittalRec=(props)=>{
  const {loading,data}=useTransmittalState();
  const dispatch=useTransmittalDispatch();
  useEffect(()=>{
   // getAllTransmittals(dispatch);
  },[]);

  const onEditClick=(row)=>{
    console.log(row)    
  }
  
  const columns = React.useMemo(
    () => [
      
          {
            Header: 'Won No',
            accessor: 'wonNo',
          },
          {
            Header: 'Won Title',
            accessor: 'wonTitle',
          },
          {
            Header: 'Transmittal No',
            accessor: 'transmittalNo',
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
          
          {
            Header: 'From',
            accessor: 'from',
          },
          {
            Header: 'To',
            accessor: 'to',
          },
          {
            Header: 'Action',
            id: 'action',
            Cell:({row})=>{              
              return (<>
              <ButtonGroup>
                <Button outline size='sm' onClick={()=>onEditClick(row)}><FontAwesomeIcon icon='pencil-alt' /> </Button>  
                <Button outline size='sm'><FontAwesomeIcon icon='print' /></Button>           
                </ButtonGroup></>)
            }
          }
    ],
    []
  )
return(<>
 <PageHeader
      title="Transmittals Rec"
      className="mb-2"
    />
     <Card>
      <CardBody>
        
      </CardBody>
      <CardFooter className="d-flex align-items-center bg-light">
        
      </CardFooter>
    </Card>


</>
    

)
}

export default TransmittalRec;