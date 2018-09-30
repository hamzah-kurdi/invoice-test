import React from "react";

class InvoiceForm extends React.Component {
  constructor() {
    super();

    this.state = {
      invoiceValue: "",
      dateDue: "",
      customerName: "",
      description: ""
    };

    this.valueChange = this.valueChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);

    this.formSubmit = this.formSubmit.bind(this);
  }

  valueChange(event) {
    this.setState({
      invoiceValue: event.target.value
    });
  }
  dateChange(event) {
    this.setState({
      dateDue: event.target.value
    });
  }
  nameChange(event) {
    this.setState({
      customerName: event.target.value
    });
  }
  descriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }
  formSubmit(event) {
    event.preventDefault();

    const invoice = {
      name: this.state.customerName,
      date: this.state.dateDue,
      value: this.state.invoiceValue,
      description: this.state.description,
      paid: "Still awaiting payment"
    };

    fetch("/api/invoices", {
      method: "post",
      body: JSON.stringify(invoice),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        alert("Your invoice has been successfully submitted");
      });

    this.setState({
      invoiceValue: "",
      dateDue: "",
      customerName: "",
      description: ""
    });
  }
  render() {
    return (
      <div className="form-wrapper">
        <h4 className="form-title">Please Enter Your Invoice Details Below</h4>
        <form className="form" onSubmit={this.formSubmit}>
          <p>Your Name</p>
          <input
            className="form-input"
            type="text"
            value={this.state.customerName}
            onChange={this.nameChange}
          />
          <p>Date Invoice is Due</p>
          <input
            className="form-input"
            type="date"
            value={this.state.dateDue}
            onChange={this.dateChange}
          />
          <p>Amount Payable</p>
          <input
            className="form-input"
            type="number"
            value={this.state.invoiceValue}
            onChange={this.valueChange}
          />
          <p>Invoice Description</p>
          <input
            className="form-input"
            type="text"
            value={this.state.description}
            onChange={this.descriptionChange}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default InvoiceForm;
