import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  max-width: 600px;
  padding: 10px;
  margin: auto;
  margin-top: 5%;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 15px;
  text-align: center;
`

const Wrapper = styled.div`
  border: 1px solid #dbdbdb;
  padding: 15px;
  border-radius: 4px;
`

export default class Register extends Component {

  state = {
    isAuth: localStorage.getItem('isAuth'),
    username: '',
    firstname: '',
    lastname: '',
    password: '',
  }

  register = e => {
    e.preventDefault()
    const { username, firstname, lastname, password } = this.state
    if (username.length !== 0 && firstname.length !== 0 && lastname.length !== 0 && password.length !== 0) {
      axios.post('/user/register', {
        username,
        firstname,
        lastname,
        password,
      })
        .then(res => {
          axios.get('/counter')
            .then(() => {
              localStorage.setItem('user_id', res.data.user_id)
              localStorage.setItem('isAuth', res.data.isAuth)
              this.props.history.push('/home')
            })
            .catch(err => {
              console.log(err)
              localStorage.setItem('user_id', res.data.user_id)
              localStorage.setItem('isAuth', res.data.isAuth)
              this.props.history.push('/home')
            })
        })
        .catch(err => {
          if (err.response.status === 400) {
            alert('username already exists')
          } else {
            alert('submission error')
          }
        })
    } else {
      alert('no empty fields!')
    }
  }

  render() {

    if (this.state.isAuth === 'true') {
      return <Redirect to="/home" />
    } 

    return (
      <>
        <NavBar />
        <Container>
          <Form onSubmit={this.register}>
            <Title>Create an account</Title>
            <Wrapper>
              <Form.Field>
                <label>Username</label>
                <Form.Input
                  maxLength="20" 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='Username' 
                  onChange={(e) => {this.setState({username: e.target.value})}}
                />
              </Form.Field>
              <Form.Field>
                <label>First Name</label>
                <Form.Input
                  maxLength="20" 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='First Name' 
                  onChange={(e) => {this.setState({firstname: e.target.value})}}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <Form.Input
                  maxLength="20" 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='Last Name' 
                  onChange={(e) => {this.setState({lastname: e.target.value})}}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input
                  maxLength="20" 
                  fluid icon='lock' 
                  iconPosition='left' 
                  placeholder='Password' 
                  type='password' 
                  onChange={(e) => {this.setState({password: e.target.value})}}
                />
              </Form.Field>
            </Wrapper>
            <Button style={{marginTop: '10px'}}color='black' fluid size='large'>Login</Button>
          </Form>
        </Container>
      </>
    )
  }
}