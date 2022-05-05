import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useModulesState } from "../../../context/modulesContext";

import RolelistComponent from "./role";
const Admin =()=>{
    const moduleStateObj =useModulesState();
    return(
        <Switch>
            <Route path="/admin/roles" exact component={RolelistComponent} />
            <Route path="/admin/rolerights" exact component={()=><div>Role rights</div>} />
            <Route path="/admin/users" exact component={()=><div>Users</div>} />
            <Route path="/admin/userrecords" exact component={()=><div>userrecord</div>} />
            <Route path="/" component={()=><div>Users</div>} />
        </Switch>


    )
}

export default Admin
