import React, { useEffect } from 'react';
import { Card, CardBody, CardFooter } from 'reactstrap';
import PageHeader from '../../../components/common/PageHeader';
import RTable from '../../table'
import Flex from '../../../components/common/Flex';
import {data} from './testData'

const Transmittals=(props)=>{
  const columns = React.useMemo(
    () => [
      
          {
            Header: 'First Name',
            accessor: 'first_name',
          },
          {
            Header: 'Last Name',
            accessor: 'last_name',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          
          {
            Header: 'IP Address',
            accessor: 'ip_address',
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
        <RTable columns={columns} loading={false} data={data} />
      </CardBody>
      <CardFooter className="d-flex align-items-center bg-light">
        
      </CardFooter>
    </Card>


</>
    

)
}

export default Transmittals