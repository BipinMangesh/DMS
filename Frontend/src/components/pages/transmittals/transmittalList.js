import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import RTable from '../../table';
import {getAllTransmittals, clearRecord} from '../../../actions/transmittalAction'
import {useTransmittalState, useTransmittalDispatch} from '../../../context/transmittalContext';
import Flex from '../../../components/common/Flex';
import {data} from './testData'

const TransmittalList=(props)=>{
  const {loading,data}=useTransmittalState();
  const dispatch=useTransmittalDispatch();
  useEffect(()=>{
    getAllTransmittals(dispatch);
  },[]);

  const onEditClick=(row)=>{
    clearRecord(dispatch)
    props.history.push(`/transmittals/record/${row.original.transmittalid}`);
  }
  const onNewClick=()=>{
    clearRecord(dispatch)
    props.history.push(`/transmittals/record/${0}`);
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
      title="Transmittals"
      className="mb-2"
    />
     <Card>
      <CardBody>
          <div className="row mb-2">
            <div className="col col-md-4">
              
            </div>
            <div className="col col-md-8 text-right">
              <button className="btn btn-falcon-default btn-sm me-1 mb-1" type="button" onClick={()=>onNewClick()}>
                New
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RTable columns={columns} loading={loading} data={data||[]} />
            </div>
          </div>
      </CardBody>
      <CardFooter className="d-flex align-items-center bg-light">
        
      </CardFooter>
    </Card>


</>
    

)
}

export default TransmittalList