import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Form, FormGroup, Input, Label, CustomInput, Button} from 'reactstrap';
const LoginForm=(props)=>{
    const {
        userName,
        setUserName,
        password,
        setPassword,
        isCookie,
        setCookie,
        loading,
        onSignInClick
    }=props

    return(<Form onSubmit={onSignInClick}>
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
      </Form>)

}

export default LoginForm