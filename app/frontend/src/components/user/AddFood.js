import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Table, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import NavBar from '../main/NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  max-width: 630px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
`

const Wrapper = styled.div`
  max-width: 630px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
`

const URL = 'ws://localhost:8080'

class AddFood extends Component {

  state ={
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    user_details: [],
    calories: '',
    carbs: '',
    proteins: '',
    fats: '',
    message: '',
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.getUserDetails()
    this.ws.onopen = () => {
      console.log('connected')
    }
    this.ws.onclose = () => {
      console.log('disconnected')
    }
    this.ws.onmessage = msg => {
      this.setState({
        message: msg.data
      })
    }
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

  addFood = e => {
    const { user_id, calories, carbs, proteins, fats } = this.state
    e.preventDefault()

    if (this.state.user_details.goal === 0) {
      alert('Set goal before you add food!')
    } else {

    if (calories.length !== 0 && carbs.length !== 0 & proteins.length !== 0 & fats.length !== 0) {
      axios.post('/food/add', {
        user_id,
        calories,
        carbs,
        proteins,
        fats,
      })
        .then(() => {
          this.ws.send('Successfully Added Food')
          this.getUserDetails()
          this.setState({
            calories: '',
            carbs: '',
            proteins: '',
            fats: '',
            message: 'Successfully Added Food'
          })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    } else {
      alert('no empty fields!')
    }

    }
  }

  changeCalories = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({calories: e.target.value})
    }
  }

  changeCarbs = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({carbs: e.target.value})
    }
  } 

  changeProteins = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({proteins: e.target.value})
    }
  }

  changeFats = e => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({fats: e.target.value})
    }
  }

  message = () => {
    if (this.state.message === '') {
      return null
    } else {
      setTimeout(() => this.setState({message:''}), 3000)
      return (
        <Message>
          <Message.Header>{this.state.message}</Message.Header>
        </Message>
      )
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
      {this.message()}
      <Container>
      <Grid>
        <Grid.Column style={{ width: '630px' }}>
        <Header as='h2' color='black' textAlign='center'>Add Food</Header>
        <Form size='large' onSubmit={this.addFood}>
          <Segment stacked>
          <StyledLabel>Calories</StyledLabel>
          <Form.Input 
            fluid icon='hotjar' 
            iconPosition='left' 
            placeholder='kcal'
            maxLength="5" 
            value={this.state.calories}
            onChange={(e) => {this.changeCalories(e)}}
          />
          <StyledLabel>Carbs</StyledLabel>
          <Form.Input 
            fluid icon='food' 
            iconPosition='left' 
            placeholder='grams'
            maxLength="3" 
            value={this.state.carbs}
            onChange={(e) => {this.changeCarbs(e)}}
          />
          <StyledLabel>Proteins</StyledLabel>
          <Form.Input 
            fluid icon='food' 
            iconPosition='left' 
            placeholder='grams'
            maxLength="3" 
            value={this.state.proteins}
            onChange={(e) => {this.changeProteins(e)}}
          />
          <StyledLabel>Fats</StyledLabel>
          <Form.Input 
            fluid icon='food' 
            iconPosition='left' 
            placeholder='grams'
            maxLength="3" 
            value={this.state.fats}
            onChange={(e) => {this.changeFats(e)}}
          />
          <Button color='black' fluid size='large'>Submit</Button>
          </Segment>
        </Form>
        </Grid.Column>
      </Grid>
      </Container>
      <Wrapper>
      <h1 style={{textAlign: 'center'}}>Totals</h1>
      <Table color='black'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Calories</Table.HeaderCell>
            <Table.HeaderCell>Carbs</Table.HeaderCell>
            <Table.HeaderCell>Proteins</Table.HeaderCell>
            <Table.HeaderCell>Fats</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{user_details.calories}kcal</Table.Cell>
            <Table.Cell>{user_details.carbs}g</Table.Cell>
            <Table.Cell>{user_details.proteins}g</Table.Cell>
            <Table.Cell>{user_details.fats}g</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </Wrapper>
      </>
    )

  }
}

export default AddFood