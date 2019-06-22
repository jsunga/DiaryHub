import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios';

const Container = styled.div`
  background-color: #24292e;
  width: 100%;
  height: 75vh;
`

const Nav = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  max-width: 1000px;
  text-align: right;
  @media (max-width: 650px) {
    margin-right: 20px;
  }
`

const Wrapper = styled.div`
  width: 490px;
  margin: 0 auto;
  margin-top: 100px;
  @media (max-width: 650px) {
    width: 380px;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 6em;
  text-align: center;
`

const Description = styled.div`
  color: white;
  font-size: 2em;
  padding-bottom: 30px;
  @media (max-width: 650px) {
    display: none;
  }
`

const Footer = styled.div`
  background-color: #ededed;
  padding: 20px;
`

const Disclaimer = styled.h1`
  text-align: center;
  font-size: 25px;
`

const Para = styled.p`
  font-size: 20px;
  text-align: center;
  width: 50%
  margin: 0 auto;
  @media (max-width: 650px) {
    width: 85%;
  }
`

export default class Landing extends Component {

  state = {
    isAuth: localStorage.getItem('isAuth'),
    counter: '',
  }

  componentDidMount() {
    axios.get('/counter/get')
      .then(res => {
        this.setState({ counter: res.data })
      })
  }

  render() {

    if (this.state.isAuth === 'true' ) {
      return <Redirect to="/home" />
    }

    return (
      <>
        <Container>
          <Nav>
            <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/login')}} inverted>Log In</Button>
            <Button style={{margin: '5px'}} onClick={() => {this.props.history.push('/register')}} inverted>Sign Up</Button>
          </Nav>
          <Wrapper>
            <Title>Diary Hub</Title>
            <Description>Reach your fitness goals with the help of</Description>
            <Description>Diary Hub. Manage and log your foods,</Description>
            <Description>workouts, and measurements</Description>
          </Wrapper>
        </Container>
        <Footer>
          <Disclaimer>DISCLAIMER</Disclaimer>
          <Para>Diary Hub is a website <b>NOT</b> intended for commercial purposes. We do not ask for any type of payment in any shape or form. 
            This website is for educational purposes only and only stimulates a website where users can log their foods and workouts. 
            The information on this website is fictional. Any similarities are completely coincidental.</Para>
          <Para><b>Registered Users: {this.state.counter}</b></Para>
        </Footer>
      </>
    )

  }
}