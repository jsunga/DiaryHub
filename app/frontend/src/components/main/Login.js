import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  max-width: 630px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 10px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
`

export default class Login extends Component {

  state = {
    isAuth: localStorage.getItem('isAuth'),
    username: '',
    password: '',
  }

  login = () => {
    axios.post('/user/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then(res => {
        if (res.data === 'login invalid') {
          alert('Please check your Username and Password!\nAnd check it again!')
        } else {
          localStorage.setItem('user_id', res.data.user_id)
          localStorage.setItem('isAuth', res.data.isAuth)
          this.props.history.push('/home')
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }
  render() {

    if (this.state.isAuth === 'true') {
      return <Redirect to="/home" />
    } 

    return (
      <>
      <NavBar />
      <Container>
      <Grid>
        <Grid.Column style={{ width: '630px' }}>
          <Header as='h2' color='black' textAlign='center'>Log-in to your account</Header>
          <Form size='large' onSubmit={this.login}>
            <Segment stacked>
              <StyledLabel>Username</StyledLabel>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} />
              <StyledLabel>Password</StyledLabel>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} />
              <Button color='black' fluid size='large'>Login</Button>
            </Segment>
          </Form>
          <Message style={{textAlign: 'right'}}>New to us? <Link to="/register" style={{ paddingLeft: '5px'}}>Create an account</Link></Message>
        </Grid.Column>
      </Grid>
      </Container>
      </>
    )
  }
}