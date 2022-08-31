import React, { useState } from "react";
import { ERROR, SUCCESS } from "../../constants/form";
import "./index.scss";

function TradeForm({ handleToogle }) {
  //trade state variables
  const [tradeId, setTradeId] = useState("");
  const [version, setVersion] = useState("");
  const [counterPartyId, setCounterPartyId] = useState("");
  const [bookId, setBookId] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    color: "",
    message: "",
  });

  const handleSubmit = (e) => {
    const trade = {
      tradeId,
      version,
      counterPartyId,
      bookId,
      maturityDate,
      createdDate: getTodaysDate(),
    };

    //checks if form is valid or not
    if (validateForm(trade)) {
      //checks if maturity date is passed the current date and alerts user
      if (new Date(trade.maturityDate) < new Date()) {
        showNotication(
          true,
          "Maturity Date should be today or future date.",
          ERROR
        );
      } else {
        //get all trades from localstorage
        const trades = JSON.parse(localStorage.getItem("trades"));

        //find trade with same tradeId
        const tradeWithSameId = trades.find((t) => t.tradeId === trade.tradeId);

        if (tradeWithSameId) {
          //if duplicate trade exists then checking if version is greater then exising one then add it.
          if (tradeWithSameId.version < trade.version) {
            addTrade(e, [...trades, trade]);
            //if both trade i.e., existing and new have same version then oveeride with new trade.
          } else if (tradeWithSameId.version === trade.version) {
            const index = trades.indexOf(tradeWithSameId);
            trades[index] = trade;
            addTrade(e, trades);
          } else {
            // if new trade has lower version then notify user
            showNotication(
              true,
              "Version should be same or higher for same trade id.",
              ERROR
            );
          }
        } else {
          //if form is valid then adding trade
          addTrade(e, [...trades, trade]);
        }
      }
    } else {
      //notify user if form is not valid
      showNotication(true, "Please fill all details.", ERROR);
    }
    e.preventDefault();
  };

  /**
   *
   * @param {*} e event object
   * @param {*} trades trade list
   */
  const addTrade = (e, trades) => {
    localStorage.setItem("trades", JSON.stringify(trades));
    reset(e); //reset form after adding trade in store.

    //notify user for successfully adding trade.
    showNotication(true, "Trade has been added successfully.", SUCCESS);
    setNotification({
      show: true,
      message: "Trade has been added successfully",
      color: SUCCESS,
    });
  };

  /**
   *
   * @returns formatted today's date
   */
  const getTodaysDate = () => {
    const date = new Date();
    const month = `0${date.getMonth()}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${date.getFullYear()}-${month}-${day}`;
  };

  /**
   *
   * @param {*} trade current trade
   * @returns return is every field has value or not
   */
  const validateForm = (trade) => {
    return Object.values(trade).every((value) => value && value !== "");
  };

  /**
   *
   * @param {*} e event object
   */
  const reset = (e) => {
    setTradeId("");
    setVersion("");
    setCounterPartyId("");
    setBookId("");
    setMaturityDate("");
    e.target.reset();
  };

  /**
   *
   * @param {*} show flag for showing notification
   * @param {*} message notification message
   * @param {*} color color for notification
   */
  const showNotication = (show, message, color) => {
    //timer for automatically set notification toggle to false
    setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        color: "",
      });
    }, 2000);
    setNotification({
      show,
      message,
      color,
    });
  };
  return (
    <div className="trade-form" data-testid="trade-form">
      {notification.show && (
        <div
          data-testid="notification"
          className="notification"
          style={{ backgroundColor: notification.color }}
        >
          <div>{notification.message}</div>
          <div
            className="close"
            onClick={() =>
              setNotification({
                show: false,
                color: "",
                message: "",
              })
            }
          >
            x
          </div>
        </div>
      )}
      <div className="action-btns">
        <button onClick={handleToogle} data-testid="back-btn">
          Back to list
        </button>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="trade-id form-control">
            <label id="trade-id">Trade Id:</label>
            <input
              data-testid="form-control"
              htmlFor="trade-id"
              type="text"
              onChange={(e) => setTradeId(e.target.value)}
            />
          </div>
          <div className="version form-control">
            <label id="version">Version:</label>
            <input
              htmlFor="version"
              data-testid="form-control"
              type="number"
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="counter-party-id form-control">
            <label id="counter-party-id">Counter Party Id:</label>
            <input
              htmlFor="counter-party-id"
              data-testid="form-control"
              type="text"
              onChange={(e) => setCounterPartyId(e.target.value)}
            />
          </div>
          <div className="book-id form-control">
            <label id="book-id">Book Id:</label>
            <input
              htmlFor="book-id"
              data-testid="form-control"
              type="text"
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          <div className="maturity-date form-control">
            <label id="maturity-date">Maturity date:</label>
            <input
              htmlFor="maturity-date"
              data-testid="form-control"
              type="date"
              onChange={(e) => setMaturityDate(e.target.value)}
            />
          </div>
          <button className="submit" type="submit" data-testid="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TradeForm;
