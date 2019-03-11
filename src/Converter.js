import React, { Component } from "react";

//Gets the neccessary currencies needed.
class Converter extends Component {
  state = {
    currencies: ["CAD", "GBP", "EUR"],
    base: "CAD",
    amount: "",
    amountUSD: "",
    convertTo: "EUR",
    usd: "USD",
    result: "",
    resultUSD: ""
  };

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value, 
        result: null
      },
      this.calculate
    );
  };

  //Gets the updated currency rates from the API and does the currency exchange.
  calculate = () => {
    const amount = this.state.amount; 
    const amountUSD = this.state.amount;  
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4); 
          const resultUSD = (data.rates[this.state.usd] * amountUSD).toFixed(4); 
          this.setState({
            result, 
            resultUSD, 
          });
        });
    }
  };

  //This handles the currency swap when the swap button is pressed.
  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate 
    );
  };

  //Renders UI elements.
  render() {
    const { currencies, base, amount, amountUSD, convertTo, usd, result, resultUSD, date } = this.state; 
    return (
      <div className="container my-5"> 
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <div class="currencies">
                <h5>
                  <span class="bold"> {amount} {base} </span> is equivalent to
                </h5>
                {/*Displays the currency the input is being converted to.*/}
                <h2>
                  {amount === "" 
                    ? "0"
                    : result === null
                    ? "Calculating..."
                    : result}{" "}
                  {convertTo}
                </h2>
                {/*Displays the input currency in USD.*/}
                <h2>
                  {amount === ""
                    ? "0"
                    : resultUSD === null
                    ? "Calculating..."
                    : resultUSD}{" "}
                  {usd}
                </h2>
              </div>
            {/*The input and dropdowns where the user selects the currencies being converted and the amount*/}
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4"> 

                    <input 
                      type="number"
                      placeholder="Enter Amount Here..." 
                      ref="form"
                      value={amount}
                      onChange={this.handleInput}
                      id="formInput"
                      className="form-control form-control-clear form-control-lg mx-3" 
                    />
                    <button className="clear-button" onClick={this.handleClick}><i class="fas fa-times-circle"></i></button>
                    <select
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}> 
                          {currency}
                        </option>
                      ))}
                    </select> 
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result === null
                          ? "Calculating..."
                          : result
                      }
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}> 
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>

              {/*Button to swap the currencies that are being converted*/}
                <div className="col-lg-6 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap"> 
                    &#8595;&#8593;
                  </h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
