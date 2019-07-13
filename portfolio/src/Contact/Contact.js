import React from 'react';
import Navbar from "../Navbar/Navbar.js"
import "./Contact.css"
import header from "../Images/Contact-Image.jpg"
import Footer from "../Footer/Footer.js"


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };

        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.subjectChange = this.subjectChange.bind(this);
        this.messageChange = this.messageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    nameChange(event) {
        this.setState({ name: event.target.value });
    }
    emailChange(event) {
        this.setState({ email: event.target.value });
    }
    subjectChange(event) {
        this.setState({ subject: event.target.value });
    }
    messageChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8888", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        console.log(this.state.name);
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                    <div className="resize">
                        <img src={header} class="img-fluid"/>
                    </div>
                <form className="bg" onSubmit={this.handleSubmit}>
                    <div class="form-row p-4">
                        <div class="form-group col-md-10 col-centered mt-5">
                            <label className="textChange" for="name">Name:</label>
                            <input type="text" class="form-control form-control-lg" id="name" value={this.state.name} onChange={this.nameChange} placeholder="Name" />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <label className="textChange" for="email">Email:</label>
                            <input type="email" class="form-control form-control-lg" id="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <label className="textChange" for="subject">Subject:</label>
                            <input type="text" class="form-control form-control-lg" id="subject" value={this.state.subject} onChange={this.subjectChange} placeholder="Subject" />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <label className="textChange" for="message">Message:</label>
                            <textarea class="form-control form-control-lg" id="message" rows="4" value={this.state.message} onChange={this.messageChange}></textarea>
                        </div>
                        <button type="submit" class="btn-secondary btn-outline-dark btn-lg col-centered col-md-3 mt-5">Submit</button>
                    </div>
                </form>
                <Footer/>
            </React.Fragment>
        );
    }
}
export default Contact;