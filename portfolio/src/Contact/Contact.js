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
            message: '',
            status: 0
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

    handleLoginClick() {
        this.setState({ handleSubmit: true });
    }

    handleLogoutClick() {
        this.setState({ handleSubmit: false });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch("http://45.79.34.27:8080", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message
            }) 
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ status: res.status })
                    this.setState({ name: "" });
                    this.setState({ email: "" });
                    this.setState({ subject: "" });
                    this.setState({ message: "" });
                    console.log(res)
                } else {
                    this.state({ status: res.status })
                    console.log(res)
                }
            })
            .catch(err => console.log(err));
    }
    render() {

        const status = this.state.status;
        let alert;

        if (status === 200) {
            alert = (<div class="alert alert-success alert-dismissible fade show text-center" data-auto-dismiss="2000" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Email successfully sent!</strong>
            </div>)
        } else if (status > 0) {
            alert = (<div class="alert alert-danger alert-dismissible fade show text-center" data-auto-dismiss="2000" role="alert">
                <strong>Email failed to send. Please try again.</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
        }
        return (
            <React.Fragment>
                <Navbar />
                <div>
                    <img src={header} class="img-fluid" alt="header" />
                </div>
                <form className="bgContact" onSubmit={this.handleSubmit}>
                    <div class="form-row p-4 col-centered">
                        <div class="form-group col-md-10 col-centered mt-5">
                            <input type="text" class="form-control form-control-lg" id="name" value={this.state.name} onChange={this.nameChange} placeholder="Name" required />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <input type="email" class="form-control form-control-lg" id="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" required />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <input type="text" class="form-control form-control-lg" id="subject" value={this.state.subject} onChange={this.subjectChange} placeholder="Subject" required />
                        </div>
                        <div class="form-group col-md-10 col-centered mt-5">
                            <textarea class="form-control form-control-lg" id="message" rows="4" value={this.state.message} onChange={this.messageChange} placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" class="subButton btn-secondary btn-outline-dark btn-lg col-centered col-md-3 mt-5">Submit</button>
                    </div>
                </form>
                <div className="bgContact text-center d-flex justify-content-center">
                    <div className="row">
                        {alert}
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Contact;