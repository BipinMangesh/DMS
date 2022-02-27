import React, { useState } from "react";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageHeader from '../../../components/common/PageHeader';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Modal, ModalFooter,
    ModalHeader, ModalBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import ReactFlow, {Handle, Controls} from 'react-flow-renderer';
import {projects} from './testProjects';
import './projectflowchart.css';

const ProjectFlowChart=()=>{
    const [selectedProject, setSelectedProject]=useState(undefined);
    
    const applyCardStyle=(data)=>{
        let classNames='';
        if(data.completionDate!==''){
            return classNames="bg-success"
        }
        else if(data.started!=="" && data.completionDate==='' && moment(data.targetDate,'MM/DD/YYYY')>=moment()){
            return classNames="bg-400";

        }
        else if(data.started===""){
            return classNames="bg-yellow";

        } else if(moment(data.targetDate,'MM/DD/YYYY')<moment()){
            return classNames="bg-danger";

        } else{
            return classNames="light";

        }
    }
      const CustomNode = ({data}) => (
        <>
          <Handle type="target" position="top"/>
          <Card className={applyCardStyle(data)}>
              <CardBody className="p-2">
                <div className="flex-1 fs--1">
                    <h5 className="fs-0">{data.activity}</h5>
                    <p className="mb-0"><span>Owner: <a>{data.activityOwner}</a></span><br/>
                        <span>Started On: <span className="fs-0 fw-semi-bold">{data.started}</span></span><br/>
                        <span>Completed Date: <span className="fs-0 fw-semi-bold">{data.completionDate}</span></span><br />
                        <span>Target Date: <span className="fs-0 fw-semi-bold">{data.targetDate}</span></span>
                    </p>                      
                </div>
              </CardBody>
          </Card>
          <Handle type="source" position="bottom" />
        </>
      );
    const nodeTypes = {
        customnode: CustomNode,
      };
return(
    <>
    <PageHeader
      title="Project Flow Chart"
      className="mb-2"
    />
     <Card>
         <CardHeader className="bg-light">
            <div className="row">
                <label className="col-sm-2 col-form-label" htmlFor="projectSelect">Project </label>
                <div className="col-sm-8">
                    <select className="form-select form-select-sm form-control" 
                    id="projectSelect" value={(selectedProject||{}).projectId} onChange={async(e)=>{
                       await setSelectedProject(undefined);
                        const pro=projects.find(pr=>{
                            return pr.projectId==e.target.value;
                        });
                        await setSelectedProject({...pro});
                    }
                        }>
                        <option value="">Select Project</option>
                        {
                            projects.map((p,i)=>{
                                return <option key={i} value={p.projectId}>{p.projectName}</option>
                            })
                        }
                    </select>
                </div>
            </div>
         </CardHeader>
      <CardBody>          
          <div className="row">
            <div className="col-md-12">
                <div style={{ height: '100vh' }}>
                   {
                       !selectedProject?<div className="text-center"><p className="fs-1">No data available.</p></div>:
                       <ReactFlow
                       selectNodesOnDrag={false} defaultZoom={0.5}
                       nodeTypes={nodeTypes} elements={[...((selectedProject||{}).elements||[])]} >
                           <Controls />
                       </ReactFlow>
                   } 
                </div>
            </div>
          </div>
      </CardBody>
    </Card>
 
    </>
)
}
export default ProjectFlowChart