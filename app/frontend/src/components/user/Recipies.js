import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Table } from 'semantic-ui-react'
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

class AddFood extends Component {

    state = {
        user_id: localStorage.getItem('user_id'),
        isAuth: localStorage.getItem('isAuth'),
        user_details: [],
        name: '',
        calories: '',
        carbs: '',
        proteins: '',
        fats: '',
    }

    componentDidMount() {
        this.getUserDetails()
    }

    getUserDetails = () => {
        axios.get(`/recipe/${this.state.user_id}`)
            .then(res => {
                this.setState({ user_details: res.data })
            })
            .catch(() => {
                console.log('error getting user details')
            })
    }

    addRecipe = e => {
        const { user_id, name, calories, carbs, proteins, fats } = this.state
        e.preventDefault()

        if (name.length !== 0 && calories.length !== 0 && carbs.length !== 0 & proteins.length !== 0 & fats.length !== 0) {
            axios.post('/recipe/add', {
                user_id,
                name,
                calories,
                carbs,
                proteins,
                fats,
            })
                .then(() => {
                    this.getUserDetails()
                    this.setState({
                        name: '',
                        calories: '',
                        carbs: '',
                        proteins: '',
                        fats: '',
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } else {
            alert('no empty fields!')
        }
    }

    addRecipeToDaily = (e, item) => {
        const user_id = this.state.user_id
        const { calories, carbs, proteins, fats } = this.state.user_details.recipes[item]
        e.preventDefault()

        if (calories.length !== 0 && carbs.length !== 0 & proteins.length !== 0 & fats.length !== 0) {
            axios.post('/food/add', {
                user_id,
                calories,
                carbs,
                proteins,
                fats,
            })
                .then(() => {
                    this.getUserDetails()
                    this.setState({
                        calories: '',
                        carbs: '',
                        proteins: '',
                        fats: '',
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } else {
            alert('no empty fields!')
        }
    }

    changeName = e => {
        this.setState({ name: e.target.value })
    }

    changeCalories = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ calories: e.target.value })
        }
    }

    changeCarbs = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ carbs: e.target.value })
        }
    }

    changeProteins = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ proteins: e.target.value })
        }
    }

    changeFats = e => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ fats: e.target.value })
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
                    <Grid>
                        <Grid.Column style={{ width: '630px' }}>
                            <Header as='h2' color='black' textAlign='center'>Recipes</Header>
                            <Form size='large' onSubmit={this.addRecipe}>
                                <Segment stacked>
                                    <StyledLabel>Name</StyledLabel>
                                    <Form.Input
                                        fluid icon='pencil alternate'
                                        iconPosition='left'
                                        placeholder='name'
                                        value={this.state.name}
                                        onChange={(e) => { this.changeName(e) }}
                                    />
                                    <StyledLabel>Calories</StyledLabel>
                                    <Form.Input
                                        fluid icon='hotjar'
                                        iconPosition='left'
                                        placeholder='kcal'
                                        maxLength="5"
                                        value={this.state.calories}
                                        onChange={(e) => { this.changeCalories(e) }}
                                    />
                                    <StyledLabel>Carbs</StyledLabel>
                                    <Form.Input
                                        fluid icon='food'
                                        iconPosition='left'
                                        placeholder='grams'
                                        maxLength="3"
                                        value={this.state.carbs}
                                        onChange={(e) => { this.changeCarbs(e) }}
                                    />
                                    <StyledLabel>Proteins</StyledLabel>
                                    <Form.Input
                                        fluid icon='food'
                                        iconPosition='left'
                                        placeholder='grams'
                                        maxLength="3"
                                        value={this.state.proteins}
                                        onChange={(e) => { this.changeProteins(e) }}
                                    />
                                    <StyledLabel>Fats</StyledLabel>
                                    <Form.Input
                                        fluid icon='food'
                                        iconPosition='left'
                                        placeholder='grams'
                                        maxLength="3"
                                        value={this.state.fats}
                                        onChange={(e) => { this.changeFats(e) }}
                                    />
                                    <Button color='black' fluid size='large'>Submit</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Wrapper>
                    <h1 style={{ textAlign: 'center' }}>Recipe List</h1>
                    <Table color='black' celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Calories</Table.HeaderCell>
                                <Table.HeaderCell>Carbs</Table.HeaderCell>
                                <Table.HeaderCell>Protein</Table.HeaderCell>
                                <Table.HeaderCell>Fat</Table.HeaderCell>
                                <Table.HeaderCell>Quick Add</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {user_details.recipes !== undefined && Object.keys(user_details.recipes).map((item) =>
                                <Table.Row key={item}>
                                    <Table.Cell>{user_details.recipes[item].name}</Table.Cell>
                                    <Table.Cell>{user_details.recipes[item].calories}</Table.Cell>
                                    <Table.Cell>{user_details.recipes[item].carbs}</Table.Cell>
                                    <Table.Cell>{user_details.recipes[item].proteins}</Table.Cell>
                                    <Table.Cell>{user_details.recipes[item].fats}</Table.Cell>
                                    <Table.Cell><Button color='black' fluid size='large' onClick={(e) => { this.addRecipeToDaily(e, item) }}>Add</Button></Table.Cell>
                                </Table.Row>)
                            }
                        </Table.Body>
                    </Table>
                </Wrapper>
            </>
        )

    }
}

export default AddFood