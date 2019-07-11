import React from 'react';

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
        console.log("Name" + this.state.name);
    }
    emailChange(event) {
        this.setState({ email: event.target.value });
        console.log("email"+this.state.email);
    }
    subjectChange(event) {
        this.setState({ subject: event.target.value });
        console.log("subject" + this.state.subject);
    }
    messageChange(event) {
        this.setState({ message: event.target.value });
        console.log("message" + this.state.message);
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
              <input type='text' value={this.state.name} onChange={this.nameChange} />
                </label>
                <label>
                    Email:
              <input type='text' value={this.state.email} onChange={this.emailChange} />
                </label>
                <label>
                    Subject:
              <input type='text' value={this.state.subject} onChange={this.subjectChange} />
                </label>
                <label>
                    Message:
              <textarea value={this.state.message} onChange={this.messageChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
export default Contact;