import React, { Component } from 'react'
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Button, Col, Row, 
    Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Form} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(val);


function RenderComments({comments}) {
    if(comments!=null)
        return(
            <div className="col-12 col-md-5 m-1">
            <div>
            <h4>Comments</h4>
                <ul className="list-unstyled">
                {comments.map((c)=>{
                    return(<div key={c.id}>
                    <li>
                    <p>{c.comment}</p>
                    <p>--{c.author}, {new Intl.DateTimeFormat(
                                        'it-IT', {year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(c.date)))}</p>
                    </li>
                    </div>)
                    })}
                </ul>
                <CommentForm />
            </div>
            </div>
        )
    else return(<div></div>)
}

function RenderDish({dish}){
    return(
        <div className="col-12 col-md-5 m-1">
        <Card >
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
    )
}



class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSubmitCommentOpen: false
        }
        this.toggleModalSubmitComment = this.toggleModalSubmitComment.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    toggleModalSubmitComment(){
        this.setState({
            isSubmitCommentOpen: !this.state.isSubmitCommentOpen
        })
    }

    handleSubmit(values){
        console.log("Current state is: " + JSON.stringify(values))
        alert("Current State is: " + JSON.stringify(values))
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Button online onClick={this.toggleModalSubmitComment}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isSubmitCommentOpen} toggle={this.state.isSubmitCommentOpen}>
                    <ModalHeader toggle={this.state.isSubmitCommentOpen}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" 
                                    className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                            <Col>
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name"
                                placeholder="Your Name" className="form-control" 
                                validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}
                                />
                                <Errors className="text-danger" 
                                model=".name" show="touched"
                                messages={{required: 'Required',
                                minLength: 'Must be greater then 2 characters',
                                maxLength: 'Must be 15 characters or less'}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="message">Comment</Label>
                                <Control.textarea model=".message" id="message" 
                                    name="message"  rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
        )
    }
}


const DishDetail = (props) => {
    if (props.dish != null){
        return (
            <React.Fragment>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                </div>

            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments}/>
            </div>
            
        </div>
        </React.Fragment>
        );
    }else
    return(
        <div></div>
    );
        
}

export default DishDetail