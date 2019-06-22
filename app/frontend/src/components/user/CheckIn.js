import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components';
import NavBar from '../main/NavBar'
import { Form, Button, Grid, Table } from 'semantic-ui-react';
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
  max-width: 630px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
`

class CheckIn extends Component {

  state ={
    user_id: localStorage.getItem('user_id'),
    isAuth: localStorage.getItem('isAuth'),
    user_details: [],
    weight: '',
    chest_width: '',
    waist_width: '',
    hip_width: '',
    mile_time: '',
    bench_weight: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = () => {
    axios.get(`/checkin/${this.state.user_id}`)
    .then(res => {
      this.setState({ user_details: res.data })
    })
    .catch(() => {
      console.log('error getting user details')
    })
  }


  checkin = e => {
    e.preventDefault()
    const { user_id, weight, chest_width, waist_width, hip_width, mile_time, bench_weight } = this.state
    

    if (weight !== 0 && chest_width !== 0 && waist_width !== 0 & hip_width !== 0) {
      axios.post('/checkin/add', {
        user_id,
        weight,
        chest_width,
        waist_width,
        hip_width,
        mile_time, //optional
        bench_weight,
      })
        .then(() => {
          this.getUserDetails()
          this.setState({
            weight: '',
            chest_width: '',
            waist_width: '',
            hip_width: '',
            mile_time: '',
            bench_weight: '',
          })
        })
        .catch(err => {
          console.log(err.response.data)
        })
  } else {
      alert('fill out mandatory fields')
  }
}

changeWeight = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({weight: e.target.value})
  }
}

changeChestWidth = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({chest_width: e.target.value})
  }
} 

changeWaistWidth = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({waist_width: e.target.value})
  }
}

changeHipWidth = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({hip_width: e.target.value})
  }
}
changeMileTime = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({mile_time: e.target.value})
  }
}
changeBenchWeight = e => {
  const regex = /^[0-9\b]+$/;
  if (e.target.value === '' || regex.test(e.target.value)) {
    this.setState({bench_weight: e.target.value})
  }
}

  render() {
    const { user_details } = this.state

    if (this.state.isAuth !== 'true') {
      return <Redirect to="/" />
    }
    return (
      <>
    <NavBar/>
      <Container>
        <Grid>
          <Grid.Column style={{ width: '630px' }}>
            <Header as='h2' color='black' textAlign='center'>Check In</Header>
             <Form size='large' onSubmit={this.checkin}>
             <StyledLabel>Weight*</StyledLabel>
              <Form.Input 
                fluid icon='weight' 
                iconPosition='left' 
                placeholder='Enter your weight (lbs)' 
                value={this.state.weight}
                onChange={(e) => {this.changeWeight(e)}}
                maxLength="3"
              />
            <Header as='h2' color='black' textAlign='center'>Width Measurement (inches)</Header>
            <StyledLabel>Chest</StyledLabel>
              <Form.Input 
                fluid icon='male' 
                iconPosition='left' 
                placeholder='Enter your chest width' 
                value={this.state.chest_width}
                onChange={(e) => {this.changeChestWidth(e)}}
                maxLength="3"
              />
            <StyledLabel>Waist</StyledLabel>
              <Form.Input 
                fluid icon='child' 
                iconPosition='left' 
                placeholder='Enter your waist width' 
                value={this.state.waist_width}
                onChange={(e) => {this.changeWaistWidth(e)}}
                maxLength="9"
              />
              <StyledLabel>Hip</StyledLabel>
              <Form.Input 
                fluid icon='street view' 
                iconPosition='left' 
                placeholder='Enter your hip width' 
                value={this.state.hip_width}
                onChange={(e) => {this.changeHipWidth(e)}}
                maxLength="9"
              />
            <StyledLabel>Mile Time</StyledLabel>
              <Form.Input 
                fluid icon='clock outline' 
                iconPosition='left' 
                placeholder='Enter your mile time' 
                value={this.state.mile_time}
                onChange={(e) => {this.changeMileTime(e)}}
                maxLength="30"
              />
            <StyledLabel>Bench Press</StyledLabel>
              <Form.Input 
                fluid icon='anchor' 
                iconPosition='left' 
                placeholder='Enter your best bench weight (lbs)' 
                value={this.state.bench_weight}
                onChange={(e) => {this.changeBenchWeight(e)}}
                maxLength="3"
              />
            <Button color='black' fluid size='large'>Submit</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
      <Wrapper>
      <h1 style={{textAlign: 'center'}}>Check In Summary</h1>
      <Table color='black'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Weight</Table.HeaderCell>
            <Table.HeaderCell>Width Measurement</Table.HeaderCell>
            <Table.HeaderCell>Waist</Table.HeaderCell>
            <Table.HeaderCell>Hip</Table.HeaderCell>
            <Table.HeaderCell>Mile Time</Table.HeaderCell>
            <Table.HeaderCell>Bench Weight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {user_details.checkins !== undefined && Object.keys(user_details.checkins).map((item) => 
            <Table.Row key={item}>
            <Table.Cell>{user_details.checkins[item].weight} lbs</Table.Cell>
            <Table.Cell>{user_details.checkins[item].chest_width} inches</Table.Cell>
            <Table.Cell>{user_details.checkins[item].waist_width} inches</Table.Cell>
            <Table.Cell>{user_details.checkins[item].hip_width} inches</Table.Cell>
            <Table.Cell>{user_details.checkins[item].mile_time} min</Table.Cell>
            <Table.Cell>{user_details.checkins[item].bench_weight} lbs</Table.Cell>
          </Table.Row>)
        }
        </Table.Body>
       </Table>
      </Wrapper>
      </>
    )
  }
}
export default CheckIn;