import React from 'react';
import "./Contact.css"


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

        fetch("https://www.tjbrackett.com:8443", {
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
                } else {
                    this.state({ status: res.status })
                }
                console.log(res)
            })
            .catch(err => console.log(err));
    }
    render() {

        const status = this.state.status;
        let alert;

        if (status === 200) {
            alert = (<div className="alert alert-success alert-dismissible fade show text-center" data-auto-dismiss="2000" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Email successfully sent!</strong>
            </div>)
        } else if (status > 0 && status !==200) {
            alert = (<div className="alert alert-danger alert-dismissible fade show text-center" data-auto-dismiss="2000" role="alert">
                <strong>Email failed to send. Please try again. Status code: { this.state.status }</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
        }
        return (
            <React.Fragment>
                <form className="bgContact" onSubmit={this.handleSubmit}>
                    <div className="contact-header" id="Contact">
                        <h2 className="mt-5">Have a question or want to work together?</h2>
                    </div>
                    <div className="form-row p-4 col-centered">
                        <div className="form-group col-md-10 col-centered mt-5 py-2">
                            <input type="text" aria-label="name" className="name form-control form-control-lg" value={this.state.name} onChange={this.nameChange} placeholder="Name" required />
                        </div>
                        <div className="form-group col-md-10 col-centered mt-5 py-2">
                            <input type="email" aria-label="email" className="email form-control form-control-lg" value={this.state.email} onChange={this.emailChange} placeholder="Email" required />
                        </div>
                        <div className="form-group col-md-10 col-centered mt-5 py-2">
                            <input type="text" aria-label="subject" className="subject form-control form-control-lg" value={this.state.subject} onChange={this.subjectChange} placeholder="Subject" required />
                        </div>
                        <div className="form-group col-md-10 col-centered mt-5 py-2">
                            <textarea aria-label="message" className="message form-control form-control-lg" rows="4" value={this.state.message} onChange={this.messageChange} placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="contactBtn btn-secondary btn-outline-dark btn-lg col-centered col-md-3 mt-5">Submit</button>
                    </div>
                </form>
                <div className="bgContact text-center d-flex justify-content-center">
                    <div className="row">
                        {alert}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Contact;