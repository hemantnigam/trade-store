import React, { useEffect, useState } from "react";
import { columnsDefs } from "../../enums/grid/column-definitions";
import Grid from "../grid";
import TradeForm from "../trade-form";
import "./index.scss";

function TradeStore() {
  const [tradeList, setTradeList] = useState([]); //state variable for trade list
  const [showForm, setShowForm] = useState(false); //state varaible for tracking the form and grid component

  useEffect(() => {
    
    //we have used localstorage for saving data as it would not lost when refresh.
    const trades = JSON.parse(localStorage.getItem("trades")); //get the trades from localstorage
    if (trades && trades.length > 0) { //check if trades are present
      trades.forEach(trade=>{
        trade.expired = new Date(trade.maturityDate) < new Date() ? 'T' : 'F' //set the expired flag on the basis of current timestamp
      })
      setTradeList(trades);
    } else {
      localStorage.setItem("trades", JSON.stringify([])); // set empty list in localstorage at initial load.
    }
  }, [showForm]);
  
  /**
   * Handler function for toggle the view of grid and trade form
   */
  const handleToogle = () => {
    setShowForm((status) => !status);
  };

  return (
    <div className="trade-store" data-testid="trade-store">
      {showForm ? (
        <TradeForm handleToogle={handleToogle} />
      ) : (
        <Grid columnsDefs={columnsDefs} data={tradeList}>
          <div className="trade-store__heading">
            <div className="trade-store__heading__label" data-testid="trade-store-heading">Trades</div>
            <button
              className="trade-store__heading__add_btn"
              onClick={handleToogle}
              data-testid="add-trade-btn"
            >
              Add Trade
            </button>
          </div>
        </Grid>
      )}
    </div>
  );
}

export default TradeStore;
