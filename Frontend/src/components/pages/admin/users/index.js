import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, CustomInput, Input, Row } from "reactstrap";
import { toast } from 'react-toastify';
import RTable from './../../../table';
import { getAllUsers } from "../../../../actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "../../../common/ActionButton";
import IconButton from '../../../common/IconButton';
import Flex from "../../../common/Flex";
import SoftBadge from "../../../common/SoftBadge";

const UserlistComponent=()=>{
    const [loading,setLoading]=useState(false);
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [filterData,setFilterData]=useState([])
    useEffect(()=>{
        bindData();
      },[]);
      useEffect(()=>{
        filterContent();
    },[search])
    const bindData=async()=>{
        await setLoading(true);
        const res=await getAllUsers();
        await setLoading(false);
        if(res.error){
          toast.error(res.errorMessage);
          await setUsers([]);
          await setFilterData([]);
        }else{
            await setUsers(res.data);
            await setFilterData(res.data);
        }
    }
    const filterContent=()=>{
        if(search.length>0){
            setFilterData(users.filter(u=>{
                return((u.FirstName||'').toLowerCase().includes((search||'').toLowerCase())
                || (u.MiddleName||'').toLowerCase().includes((search||'').toLowerCase())
                || (u.LastName||'').toLowerCase().includes((search||'').toLowerCase())
                || (u.EmailId||'').toLowerCase().includes((search||'').toLowerCase())
                )
            }));
        }else{
            setFilterData([...users]);
        }
    }
return (<>
    <Card className="mb-3">
        <CardHeader tag={'h5'}>
            <Row className="flex-between-center">
                <Col>Users</Col>
                <Col xs="auto">
                <IconButton
                    className="me-2 mb-1"
                    variant="falcon-default"
                    size="sm"
                    icon="plus"
                    transform="shrink-3"
                > New User
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
            <Row><Col>
            <RTable loading={loading} columns={[
                {
                    Header:'First Name',
                    accessor:'FirstName'
                },
                {
                    Header:'Middle Name',
                    accessor:'MiddleName'
                },
                {
                    Header:'Last Name',
                    accessor:'LastName'
                },
                {
                    Header:'Status',
                    accessor:'isActive',
                    Cell:({row})=>(row.original.isActive? <SoftBadge pill bg='success' className='me-2'>Active</SoftBadge>:<SoftBadge pill bg='danger' className='me-2'>Inactive</SoftBadge> )
                },
                {
                    Header:'Email',
                    accessor:'EmailId'
                },
                {
                    Header:'Action',
                    id:'action',
                    Cell:({row})=>{
                        return (<>
                            <ActionButton icon="edit" title="Edit" variant="action" className="p-0 me-2" onClick={()=>{}} />
                            <ActionButton icon="trash-alt" title="Delete" variant="action" className="p-0" onClick={()=>{}} />
                            </>);
                        }
                }
            ]} data={filterData} minRows="10" defaultPageSize={10} showPagination={true} />
            </Col></Row>
        </CardBody>
    </Card>
    
</>)
}
export default UserlistComponent