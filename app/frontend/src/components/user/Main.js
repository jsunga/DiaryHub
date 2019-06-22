import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button,Table } from 'semantic-ui-react'
import NavBar from '../main/NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  @media (max-width: 845px) {
    width: 350px;
  }
`

const Workout = styled.div`
  margin-top: 30px;
`

const Header = styled.div`
  background-color: #24292e;
  height: 40px;
  color: white;
  font-size: 20px;
  padding-top: 9px;
  padding-left: 15px;
  border-radius: 6px 6px 0px 0px;
`

const Wrapper = styled.div`
  border: 1px solid grey;
`

const Body = styled.div`
  display: flex;
  flex-direction: row:
`

const Left = styled.div`
  width: 266px;
`

const Middle = styled.div`
  width: 266px;
`

const Right = styled.div`
  width: 266px;
`

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px;
`

const Number = styled.div`
  text-align: center;
  font-size: 30px;
  color: green;
  padding: 5px;
`

const Footer = styled.div`
  margin-top: 10px;
`

export default class Main extends Component {

  state ={
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    user_details: [],
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = () => {
    axios.get(`/food/${this.state.user_id}`)
    .then(res => {
      this.setState({ user_details: res.data })
    })
    .catch(() => {
      console.log('error getting user details')
    })
  }

  reset = () => {
    axios.post('/food/reset', {
      user_id: this.state.user_id,
      goal: this.state.user_details.goal,
    })
      .then(() => {
        this.getUserDetails()
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  addFood = () => {
    if (this.state.user_details.goal !== 0) {
      this.props.history.push('/addfood')
    } else {
      console.log('set goal first before you add food')
    }
  }

  render() {
    const { user_details } = this.state
    
    if (this.state.isAuth !== 'true') {
      return <Redirect to="/" />
    }

    return (
      <>
        <NavBar />
        <Container>
          <Header>Daily Summary</Header>
          <Wrapper>
          <Body>
            <Left>
              <Title>Goal</Title>
              <Number>{user_details.goal}</Number>
            </Left>
            <Middle>
              <Title>Calories Remaning</Title>
              <Number>{user_details.remaining_calories}</Number>
            </Middle>
            <Right>
              <Title>Calories Eaten</Title>
              <Number>{user_details.calories}</Number>
            </Right>
          </Body>
          <Footer>
            <Button.Group widths='3'>
              <Button onClick={this.addFood}>Add Food</Button>
              <Button onClick={() => {this.props.history.push('/goal')}}>Set Goal</Button>
              <Button onClick={this.reset}>Reset</Button>
            </Button.Group>
          </Footer>
          </Wrapper>
        <Workout>
        <h1 style={{textAlign: 'center'}}>Workout</h1>
        <Table color='black'celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Exercise Name</Table.HeaderCell>
              <Table.HeaderCell>Sets</Table.HeaderCell>
              <Table.HeaderCell>Reps</Table.HeaderCell>
              <Table.HeaderCell>Weight</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {user_details.workouts !== undefined && Object.keys(user_details.workouts).map((item) => 
            <Table.Row key={item}>
              <Table.Cell>{user_details.workouts[item].exercise_name}</Table.Cell>
              <Table.Cell>{user_details.workouts[item].sets}</Table.Cell>
              <Table.Cell>{user_details.workouts[item].reps}</Table.Cell>
              <Table.Cell>{user_details.workouts[item].weight}lbs</Table.Cell>
            </Table.Row>)
            }
          </Table.Body>
        </Table>
        </Workout>
        </Container>
      </>
    )

  }
}