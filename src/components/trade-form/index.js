import React, { useState } from "react";
import "./index.scss";

function TradeForm({ handleToogle }) {
  const [tradeId, setTradeId] = useState("");
  const [version, setVersion] = useState("");
  const [counterPartyId, setCounterPartyId] = useState("");
  const [bookId, setBookId] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const handleSubmit = (e) => {
    const trade = {
      tradeId,
      version,
      counterPartyId,
      bookId,
      maturityDate,
      createdDate,
      expired: new Date(createdDate) >= new Date(maturityDate) ? 'T' : 'F'
    };
    if (validteForm(trade)) {
      if(new Date(trade.maturityDate) < new Date()) {
        alert("Maturity Date should be in future.")
      } else {
        const trades = JSON.parse(localStorage.getItem("trades"));
        localStorage.setItem("trades", JSON.stringify([...trades, trade]));
        reset(e);
        alert("Trade has been added successfully");
      }
    } else {
      alert("Please fill all details.");
    }
    e.preventDefault();
  };

  const validteForm = (trade) => {
    return Object.values(trade).every((value) => value && value !== "");
  };

  const reset = (e) => {
    setTradeId("");
    setVersion("");
    setCounterPartyId("");
    setBookId("");
    setMaturityDate("");
    setCreatedDate("");
    e.target.reset();
  };
  return (
    <>
      <div className="action-btns">
        <button onClick={handleToogle}>Back to list</button>
      </div>
      <div className="form-container">
        <form className="trade-form" onSubmit={handleSubmit}>
          <div className="trade-id form-control">
            <label id="trade-id">Trade Id:</label>
            <input
              field="trade-id"
              htmlFor="trade-id"
              type="text"
              onChange={(e) => setTradeId(e.target.value)}
            />
          </div>
          <div className="version form-control">
            <label id="version">Version:</label>
            <input
              htmlFor="version"
              type="number"
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="counter-party-id form-control">
            <label id="counter-party-id">Counter Party Id:</label>
            <input
              htmlFor="counter-party-id"
              type="text"
              onChange={(e) => setCounterPartyId(e.target.value)}
            />
          </div>
          <div className="book-id form-control">
            <label id="book-id">Book Id:</label>
            <input
              htmlFor="book-id"
              type="text"
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          <div className="maturity-date form-control">
            <label id="maturity-date">Maturity date:</label>
            <input
              htmlFor="maturity-date"
              type="date"
              onChange={(e) => setMaturityDate(e.target.value)}
            />
          </div>
          <div className="created-date form-control">
            <label id="created-date">Created date:</label>
            <input
              htmlFor="created-date"
              type="date"
              onChange={(e) => setCreatedDate(e.target.value)}
            />
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default TradeForm;
