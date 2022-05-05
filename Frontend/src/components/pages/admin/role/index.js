import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";
import { toast } from 'react-toastify';
import RTable from './../../../table';
import { getAllRoles } from "../../../../actions/rolesAction";
import FalconCardHeader from './../../../common/FalconCardHeader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RolelistComponent=()=>{
    const [loading,setLoading]=useState(false);
    const [roles,setRoles]=useState([]);
    const [filterData,setFilterData]=useState([])
    useEffect(()=>{
        bindData();
      },[]);
    const bindData=async()=>{
        await setLoading(true);
        const res=await getAllRoles();
        await setLoading(false);
        if(res.error){
          toast.error(res.errorMessage);
          await setRoles([]);
        }else{
            await setRoles(res.data);
        }
    }
return (<>
    <Card className="mb-3">
        <FalconCardHeader title="Roles" />
        <CardBody className="fs--1">
            <RTable loading={loading} columns={[
                {
                    Header:'Role',
                    accessor:'RoleName'
                },
                {
                    Header:'Status',
                    accessor:'IsActive'
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
            ]} data={roles} minRows="10" defaultPageSize={10} />
            
        </CardBody>
    </Card>
    
</>)
}
export default RolelistComponent