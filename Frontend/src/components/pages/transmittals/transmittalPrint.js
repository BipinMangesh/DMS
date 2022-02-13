import React, {useState, useEffect} from 'react';
import {Card, CardBody, Button} from 'reactstrap';
import { Preview, print } from 'react-html2pdf';
import moment from 'moment';
const TransmittalPrint=(props)=>{
    const {data}=props;
    const [content, setContent]=useState(data);
    useEffect(()=>{
        setContent(data);
    },[data]);

    return(<>
    <div className='row' style={{fontSize:'12px'}}>
        <div className='col-md-12'>
        <Preview id={'jsx-template'} >
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='row mt-1'>
                                <div className='col-md-2'>WON No.: </div><div className='col-md-10'>{data.wonNo}</div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-2'>WON Title: </div><div className='col-md-10'>{data.wonTitle}</div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-2'>Transmittal No.: </div><div className='col-md-10'>{data.transmittalNo}</div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-2'>Date: </div><div className='col-md-10'>{moment(data.date).format('DD/MM/YYYY')}</div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-2'>From: </div><div className='col-md-10'>{data.from}</div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-2'>To: </div><div className='col-md-10'>{data.to}</div>
                            </div>
                        </div>                        
                    </div>
                    <div className='row d-flex justify-content-center mt-5'>
                        <div className='col-md-12'>
                            <table width={'100%'} className="table table-border">
                                <thead>
                                    <tr>
                                        <th style={{width:'10%'}}>S.No.</th>
                                        <th style={{width:'20%'}} >Doc Number</th>
                                        <th style={{width:'40%'}}>Description</th>
                                        <th style={{width:'10%'}} >Rev</th>
                                        <th style={{width:'10%'}} >Status</th>
                                        <th style={{width:'10%'}} >Type</th>
                                    </tr>
                                </thead>
                        {
                            ((data||{}).transmittalDetails||[]).map((detRec,i)=>{
                                return (<tr>
                                    <td >{i+1}</td>
                                    <td >{detRec.docNumber}</td>
                                    <td>{detRec.description}</td>
                                    <td >{detRec.rev}</td>
                                    <td >{detRec.status}</td>
                                    <td >{detRec.type}</td>
                                </tr>)
                            })
                        }
                        </table>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Preview>
        </div>
        <div className='col-md-12 mt-3 text-center'>
            <Button outline size='sm' onClick={()=>print('a', 'jsx-template')}>Generate Pdf</Button>      
        </div>
    </div>
    </>)
}

export default TransmittalPrint