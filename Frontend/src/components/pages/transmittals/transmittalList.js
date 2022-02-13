import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Modal, ModalFooter,
  ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import RTable from '../../table';
import {getAllTransmittals, clearRecord, deleteTransmittal} from '../../../actions/transmittalAction'
import {useTransmittalState, useTransmittalDispatch} from '../../../context/transmittalContext';
import Flex from '../../../components/common/Flex';
import {data} from './testData'
import TransmittalPrint from './transmittalPrint';

const TransmittalList=(props)=>{
  const {loading,data}=useTransmittalState();
  const [modal, setModal] = useState(false);
  const [pdfObj,setPdfObject]=useState({});
  const dispatch=useTransmittalDispatch();
  useEffect(()=>{
    bindData();
  },[]);
  const toggle = () => {setModal(!modal);
    setPdfObject({});
  };

  const bindData=async()=>{
    const res=await getAllTransmittals(dispatch);
    if(res.error){
      toast.error(res.errorMessage)
    }
  }

  const onEditClick=(row)=>{
    clearRecord(dispatch)
    props.history.push(`/transmittals/record/${row.original.transmittalid}`);
  }
  const onNewClick=()=>{
    clearRecord(dispatch)
    props.history.push(`/transmittals/record/${0}`);
  }
  const onDeleteClick=async(row)=>{
    const resp=await deleteTransmittal(row.original.transmittalid);
    if(resp.status==200){
      toast.success(resp.message);
      bindData();      
    }else{
      toast.error(resp.errorMessage);
    }
  }
  const pdfDownload=async(row)=>{
    setPdfObject(row.original);
    setModal(true);
  }
  const columns = [
      
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
                <Button outline size='sm' onClick={()=>onDeleteClick(row)}><FontAwesomeIcon icon='trash' /></Button> 
                <Button outline size='sm' onClick={()=>pdfDownload(row)}><FontAwesomeIcon icon='print' /></Button>         
                </ButtonGroup></>)
            }
          }
    ];
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
    </Card>
    <Modal centered
    scrollable isOpen={modal} style={{maxWidth:'80vw'}} >
      <ModalHeader toggle={toggle}>        
      </ModalHeader>
      <ModalBody>
        <TransmittalPrint data={pdfObj} />        
      </ModalBody>
    </Modal>


</>
    

)
}

export default TransmittalList