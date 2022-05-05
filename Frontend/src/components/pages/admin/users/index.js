import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";
import { toast } from 'react-toastify';
import RTable from './../../../table';
import { getAllUsers } from "../../../../actions/userAction";
import FalconCardHeader from './../../../common/FalconCardHeader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserlistComponent=()=>{
    const [loading,setLoading]=useState(false);
    const [users,setUsers]=useState([]);
    const [filterData,setFilterData]=useState([])
    useEffect(()=>{
        bindData();
      },[]);
    const bindData=async()=>{
        await setLoading(true);
        const res=await getAllUsers();
        await setLoading(false);
        if(res.error){
          toast.error(res.errorMessage);
          await setUsers([]);
        }else{
            await setUsers(res.data);
        }
    }
return (<>
    <Card className="mb-3">
        <FalconCardHeader title="Users" />
        <CardBody className="fs--1">
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
                    accessor:'IsActive'
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
                            <ButtonGroup>
                              <Button outline size='sm' onClick={()=>{}}><FontAwesomeIcon icon='pencil-alt' /> </Button>
                              <Button outline size='sm' onClick={()=>{}}><FontAwesomeIcon icon='trash' /></Button> 
                            </ButtonGroup></>);
                        }
                }
            ]} data={users} minRows="10" defaultPageSize={10} />
            
        </CardBody>
    </Card>
    
</>)
}
export default UserlistComponent