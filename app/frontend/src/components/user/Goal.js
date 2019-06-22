import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import NavBar from '../main/NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 100px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
`

export default class Goal extends Component {

  state ={
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    calories: '',
  }

  setGoal = e => {
    e.preventDefault()
    axios.post('/food/setgoal', {
      user_id: this.state.user_id,
      goal: this.state.calories,
    })
      .then(() => {
        this.props.history.push('/home')
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  changeCalories = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({calories: e.target.value})
    }
  }

  render() {

    if (this.state.isAuth !== 'true') {
      return <Redirect to="/" />
    }

    return (
      <>
        <NavBar/>
        <Container>
        <Grid>
          <Grid.Column style={{ width: '300px' }}>
          <Header as='h2' color='black' textAlign='center'>Set Goal</Header>
          <Form size='large' onSubmit={this.setGoal}>
            <Segment stacked>
              <StyledLabel>Calories</StyledLabel>
              <Form.Input 
                fluid icon='hotjar' 
                iconPosition='left' 
                placeholder='Food Calories' 
                value={this.state.calories}
                onChange={(e) => {this.changeCalories(e)}}
                maxLength="5"
              />
              <Button color='black' fluid size='large'>Submit</Button>
            </Segment>
          </Form>
          </Grid.Column>
        </Grid>
        </Container>
      </>
    )

  }
}
