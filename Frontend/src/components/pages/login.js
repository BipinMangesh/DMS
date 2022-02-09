import React,{useState} from 'react';
import { Col, Row, Card, CardBody, Form, FormGroup, Input, Label, CustomInput, Button } from 'reactstrap';
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { Link  } from 'react-router-dom';
import moment from 'moment';
import Section from '../common/Section';
import Logo from '../navbar/Logo';
import {loginUser} from '../../actions/authAction';
import {useAuthDispatch, useAuthState} from '../../context';

const Login=(props)=>{
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

    const renderLogin=()=>{
        return <Form onSubmit={onSignInClick}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            placeholder={'Email'}
            value={userName}
            onChange={e=>setUserName(e.target.value)}
            type="email" required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            placeholder={'Password'}
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type="password" required
          />
        </FormGroup>
        <Row className="justify-content-between align-items-center">
          <Col xs="auto">
            <CustomInput
              id="customCheckRemember"
              label="Remember me"
              checked={isCookie}
              onChange={setCookie}
              type="checkbox"
            />
          </Col>
          <Col xs="auto">
            <Link className="fs--1" to={`/forgotPassword`}> 
              Forget Password?
            </Link>
          </Col>
        </Row>
        <FormGroup>
          <Button color="primary" block className="mt-3" 
          disabled={loading}
          >
            Login
          </Button>
        </FormGroup>
      </Form>
      }


    return (
        <Section className="py-0">
          <Row className="flex-center min-vh-75 py-6"> 
            <Col sm={12} md={12} lg={12} xl={12}><Logo /></Col>            
            <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">               
              <Card>
                <CardBody className="fs--1 font-weight-normal p-5">
                  <>
                    <Row className="text-left justify-content-between">
                      <Col xs="auto">
                        <h5 className="pb-2">Login</h5>
                      </Col>
                    </Row>
                      {
                        renderLogin()
                      }                 
                  </>
                </CardBody>
              </Card>                                
            </Col>
          </Row>
        </Section>
        )

}
export default withRouter(Login)