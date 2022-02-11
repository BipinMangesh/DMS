import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
const TransmittalList=loadable(()=>import('./transmittalList'));
const TransmittalRec=loadable(()=>import('./transmittalRec'));
const Transmittals=(props)=>{
return(<>
    <Switch>
      <Route path="/transmittals/record/:id" component={TransmittalRec} />
      <Route path="/transmittals/" component={TransmittalList} />
     
    </Switch>
 
</>)
}

export default Transmittals