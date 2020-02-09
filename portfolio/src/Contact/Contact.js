import React from "react";
import "./Contact.css";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      status: 0
    };

    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  nameChange(event) {
    this.setState({ name: event.target.value });
  }
  emailChange(event) {
    this.setState({ email: event.target.value });
  }
  phoneChange(event) {
    this.setState({ phone: event.target.value });
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
    const backendUrl = 'https://www.tjbrackett.com/email:8443';
    event.preventDefault();

    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        subject: this.state.subject,
        message: this.state.message
      })
    })
      .then(res => {
        if (res.ok) {
          this.setState({ status: res.status });
          this.setState({ name: "" });
          this.setState({ email: "" });
          this.setState({ phone: ""});
          this.setState({ subject: "" });
          this.setState({ message: "" });
        } else {
          this.state({ status: res.status });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const status = this.state.status;
    let alert;

    if (status === 200) {
      alert = (
        <div
          className="alert alert-success alert-dismissible fade show text-center"
          data-auto-dismiss="2000"
          role="alert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Email successfully sent!</strong>
        </div>
      );
    } else if (status > 0 && status !== 200) {
      alert = (
        <div
          className="alert alert-danger alert-dismissible fade show text-center"
          data-auto-dismiss="2000"
          role="alert"
        >
          <strong>
            Email failed to send. Please try again. Status code:{" "}
            {this.state.status}
          </strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <hr />
        <div className="contact-header text-center py-3 p-2" id="Contact">
            <h1 className="display-4" data-aos="fade-down" data-aos-duration="1750">Contact Me</h1>
            <p className="lead" data-aos="fade-down" data-aos-duration="1750">Have a question or want to work together?</p>
        </div>
        <hr />
        <form className="bgContact" onSubmit={this.handleSubmit}>
          <div className="form-row p-4 col-centered" data-aos="fade-down" data-aos-duration="1750">
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-centered mt-5 py-0">
              <input
                type="text"
                aria-label="name"
                className="name form-control form-control-lg"
                value={this.state.name}
                onChange={this.nameChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-centered mt-5 py-0">
              <input
                type="email"
                aria-label="email"
                className="email form-control form-control-lg"
                value={this.state.email}
                onChange={this.emailChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-centered mt-5 py-0">
              <input
                type="text"
                aria-label="phone"
                className="phone form-control form-control-lg"
                value={this.state.phone}
                onChange={this.phoneChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12 col-centered mt-5 py-0">
              <input
                type="text"
                aria-label="subject"
                className="subject form-control form-control-lg"
                value={this.state.subject}
                onChange={this.subjectChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group col-12 col-centered mt-5 py-0">
              <textarea
                type="text"
                aria-label="message"
                className="message form-control form-control-lg"
                rows="4"
                value={this.state.message}
                onChange={this.messageChange}
                placeholder="Message"
                required
              />
            </div>
            <button
              type="submit"
              className="contactBtn btn-secondary btn-outline-dark btn-lg col-centered col-md-3 mt-5"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="bgContact text-center d-flex justify-content-center">
          <div className="row">{alert}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
