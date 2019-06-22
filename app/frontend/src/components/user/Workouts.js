import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Table } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import NavBar from '../main/NavBar'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  max-width: 625px;
  margin: 0 auto;
  margin-top: 32px;
  padding: 12px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
`

const Wrapper = styled.div`
  max-width: 625px;
  margin: 0 auto;
  margin-top: 32px;
  padding: 12px;
`


class Workouts extends Component {

    state ={
        user_id: localStorage.getItem('user_id'),
        isAuth: localStorage.getItem('isAuth'),
        user_details: [],
        exercise_name: '',
        sets: '',
        reps: '',
        weight: '',
      }

      componentDidMount() {
        this.getUserDetails()
      }
    
      getUserDetails = () => {
        axios.get(`/workout/${this.state.user_id}`)
        .then(res => {
          this.setState({ user_details: res.data })
        })
        .catch(() => {
          console.log('error getting user details')
        })
      }

      changeExerciseName = e => {
        this.setState({exercise_name: e.target.value})
      }

      changeSets = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
          this.setState({sets: e.target.value})
        }
      }

      changeReps = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
          this.setState({reps: e.target.value})
        }
      }

      changeWeight = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
          this.setState({weight: e.target.value})
        }
      }

      workouts = e => {
        e.preventDefault()
        const { user_id, exercise_name, sets, reps, weight } = this.state
        if (exercise_name.length !== 0 && sets.length !== 0 && reps.length !== 0 & weight.length !== 0) {
          axios.post('/workout/add', {
            user_id,
            exercise_name,
            sets,
            reps,
            weight,
          })
            .then(() => {
              this.getUserDetails()
              this.setState({
                exercise_name: '',
                sets: '',
                reps: '',
                weight: '',
              })
            })
            .catch(err => {
              console.log(err.response.data)
            })
      } else {
          alert('non-empty fields')
      }
    }

    render() {
        const { user_details } = this.state

        if (this.state.isAuth !== 'true') {
            return <Redirect to="/" />
        }

        return(
        <>
            <NavBar />
            <Container>
                <Grid>
                    <Grid.Column style={{ width: '630px' }}>
                    <Header as='h2' color='blue' textAlign='center'>ADD WORKOUT!</Header>
                    <Form size='large' onSubmit={this.workouts}>
                    <Segment stacked>
                    <StyledLabel>Exercise Name</StyledLabel>
                    <Form.Input 
                        fluid icon='child' 
                        iconPosition='left' 
                        maxLength="20" 
                        placeholder='name'
                        value={this.state.exercise_name}
                        onChange={(e) => {this.changeExerciseName(e)}}
                    />
                    <StyledLabel>Sets</StyledLabel>
                    <Form.Input 
                        fluid icon='clock' 
                        iconPosition='left' 
                        maxLength="5" 
                        placeholder='#'
                        value={this.state.sets}
                        onChange={(e) => {this.changeSets(e)}}
                    />
                    <StyledLabel>Reps</StyledLabel>
                    <Form.Input 
                        fluid icon='hotjar' 
                        iconPosition='left' 
                        maxLength="5" 
                        placeholder='#'
                        value={this.state.reps}
                        onChange={(e) => {this.changeReps(e)}}
                    />
                    <StyledLabel>Weight</StyledLabel>
                    <Form.Input 
                        fluid icon='hotjar' 
                        iconPosition='left' 
                        maxLength="5" 
                        placeholder='lbs'
                        value={this.state.weight}
                        onChange={(e) => {this.changeWeight(e)}}
                    />
                    
                    <Button color='blue' fluid size='large'>SUBMIT</Button>
                    </Segment>
                    </Form>
                    </Grid.Column>
                </Grid>

                <Wrapper>
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
                      {user_details.workouts !== undefined  && Object.keys(user_details.workouts).map((item) => 
                      <Table.Row key={item}>
                        <Table.Cell>{user_details.workouts[item].exercise_name}</Table.Cell>
                        <Table.Cell>{user_details.workouts[item].sets}</Table.Cell>
                        <Table.Cell>{user_details.workouts[item].reps}</Table.Cell>
                        <Table.Cell>{user_details.workouts[item].weight}</Table.Cell>
                      </Table.Row>)
                      }
                    </Table.Body>
                  </Table>
                </Wrapper>

            </Container>
        </>
        )
    }
}

export default Workouts