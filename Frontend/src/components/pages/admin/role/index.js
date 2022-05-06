import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Input, Row} from "reactstrap";
import {Modal, ModalBody, ModalHeader, ModalFooter } from "react-bootstrap";
import { toast } from 'react-toastify';
import RTable from './../../../table';
import { getAllRoles, saveRole,updateRole } from "../../../../actions/rolesAction";
import FalconCardHeader from './../../../common/FalconCardHeader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "../../../common/ActionButton";
import IconButton from "../../../common/IconButton";
import Flex from '../../../common/Flex'
import SoftBadge from "../../../common/SoftBadge";
import { CloseButton } from "../../../common/Toast";
import RoleForm from "./roleForm";
const RolelistComponent=(props)=>{
    const [loading,setLoading]=useState(false);
    const [roles,setRoles]=useState([]);
    const [search,setSearch]=useState('');
    const [filterData,setFilterData]=useState([]);
    const [show, setShow] = useState(false);
    const [roleRec, setRoleRec]=useState(undefined);
    const handleClose = () => {
        setRoleRec(undefined);
        setShow(false);
    };
    const handleShow = (rec) => {
        if(rec){
            setRoleRec(rec);
            setShow(true);
        }else{
            setRoleRec(undefined);
            setShow(true)
        }        
    }

    useEffect(()=>{
        bindData();
      },[]);
    useEffect(()=>{
        filterContent();
    },[search])
    const bindData=async()=>{
        setSearch('');
        await setLoading(true);
        const res=await getAllRoles();
        await setLoading(false);
        if(res.error){
          toast.error(res.errorMessage);
          await setRoles([]);
          await setFilterData([]);
        }else{
            await setRoles(res.data);
            await setFilterData(res.data);
        }
    }
    const filterContent=()=>{
        if(search.length>0){
            setFilterData(roles.filter(r=>{
                return((r.RoleName||'').toLowerCase()).includes((search||'').toLowerCase())
            }));
        }else{
            setFilterData([...roles]);
        }
    }
    const saveRec=async(data)=>{
        let resp={}
        if(data.RoleId>0){
            resp=await updateRole(data);
        }else{
            resp=await saveRole(data);
        }        
        if(!resp.error){
            toast.success(resp.message);
            await handleClose();
            await bindData();
        }else{
            toast.error(resp.errorMessage);
        }
    }
return (<>
    <Card className="mb-3">
    <CardHeader tag={'h5'}>
            <Row className="flex-between-center">
                <Col>Roles</Col>
                <Col xs="auto">
                <IconButton
                    className="me-2 mb-1"
                    variant="falcon-default"
                    size="sm"
                    icon="plus"
                    transform="shrink-3" onClick={(e)=>{
                        handleShow()
                    }}
                > New Role
                </IconButton>
                </Col>
            </Row>            
        </CardHeader>
        <CardBody className="fs--1 border-top border-200">
            <Row className="flex-between-center mb-2">
                <Col
                sm="auto"
                as={Flex}
                alignItems="center"
                >
                    <Input type="text" placeholder="Search..." value={search} size={'sm'} onChange={({target})=>setSearch(target.value)} />
                </Col>
            </Row>
            <Row>
            <Col>
            <RTable loading={loading} columns={[
                {
                    Header:'Role',
                    accessor:'RoleName'
                },
                {
                    Header:'Status',
                    accessor:'IsActive',
                    Cell:({row})=>(row.original.IsActive? <SoftBadge pill bg='success' className='me-2'>Active</SoftBadge>:<SoftBadge pill bg='danger' className='me-2'>Inactive</SoftBadge> )
                },
                {
                    Header:'Action',
                    id:'action',
                    Cell:({row})=>{
                        return (<>
                            <ActionButton icon="edit" title="Edit" variant="action" className="p-0 me-2" onClick={()=>{
                                handleShow(row.original)
                            }} />
                            <ActionButton icon="trash-alt" title="Delete" variant="action" className="p-0" onClick={()=>{}} />
                            </>);
                        }
                }
            ]} data={filterData} minRows="10" defaultPageSize={10} />
        </Col></Row>            
        </CardBody>
    </Card> 
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <ModalHeader>
          <Modal.Title bsPrefix={'modal-title'} as={'h5'}>{((roleRec||{}).RoleId||0) <=0?'New Role':'Edit Role'}</Modal.Title>
          <ActionButton icon="times" title="Close" variant="action" className="p-0 me-2" onClick={handleClose}/>
        </ModalHeader>
        <ModalBody bsPrefix={'modal-body'}>
            <RoleForm defaultValues={{...(roleRec||{})}} onCancelClick={async()=>{
                handleClose();       
        }} onSubmitClick={async(data)=>{
          saveRec(data);
        }} />
        </ModalBody>
    </Modal>

</>)
}
export default RolelistComponent