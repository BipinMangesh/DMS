import React,{useState} from 'react';
import { Col, Row, Card, CardBody, Form, FormGroup, Input, Label, CustomInput, Button, CardHeader} from 'reactstrap';
import Background from './../../common/Background';
import Flex from './../../common/Flex';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { Link  } from 'react-router-dom';
import {loginUser} from './../../../actions/authAction';
import {useAuthDispatch, useAuthState} from './../../../context';
import bgImg from './../../../assets/img/generic/14.jpg';
import LoginForm from './loginForm';

const Login=(props)=>{
  const bgProps={ 
    image: bgImg, 
    position: '50% 20%' 
  };
    const [userName, setUserName]=useState('');
    const [password, setPassword]=useState('');
    const [isCookie, setIsCookie]=useState(false);
    const dispatch = useAuthDispatch();
    const {loading}=useAuthState();

    const onSignInClick=async(e)=>{
        e.preventDefault()
        const result=await loginUser(dispatch,{userName,password});
        if(!result.error){
          props.history.push('/dashboard');
        }else{
          toast.error(result.errorMessage);
        }
    }
    const setCookie=(event)=> {
        const target = event.target;
        const value = target.checked;
        if (value) {
            let cookie = new Cookies();
            cookie.set('userName', this.state.userName, {path: '/', maxAge: 31536000});
            setIsCookie(true);
        }else{
            setIsCookie(false);
        }
    }


    return (
    <div className="container-fluid">
      <Row className="min-vh-100 bg-100" style={{overflow:'hidden'}}>
        <Col xs={6} className="d-none d-lg-block position-relative">
          {bgProps && <Background {...bgProps} />}
        </Col>
        <Col sm={10} md={6} className="px-sm-0 align-self-center mx-auto py-5">
          <Row className="g-0 justify-content-center">
            <Col lg={9} xl={8} className="col-xxl-6">
              <Card>
                <CardHeader className="bg-shape bg-circle-shape text-center p-2">
                  <Link className="text-white light font-sans-serif fw-bolder fs-4 z-index-1 position-relative"
                    to="/"
                  >
                  MMS
                  </Link>
                </CardHeader>
                <CardBody className="p-4">
                  <Flex align="center" justify="between">
                    <h3>Login</h3>
                    <p className="mb-0 fs--1">
                      <span className="font-weight-semi-bold">New User? </span>
                      <Link to="/authentication/split/register">Create account</Link>
                    </p>
                  </Flex>
                  <LoginForm {...{userName,setUserName,password,setPassword, isCookie, setCookie, setIsCookie, loading, onSignInClick}} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

      )

}
export default withRouter(Login)