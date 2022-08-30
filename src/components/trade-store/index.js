import React, { useEffect, useState } from "react";
import { columnsDefs } from "../../enums/grid/column-definitions";
import Grid from "../grid";
import TradeForm from "../trade-form";
import "./index.scss";

function TradeStore() {
  const [tradeList, setTradeList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const trades = JSON.parse(localStorage.getItem("trades"));
    console.log(trades)
    if (trades && trades.length > 0) {
      trades.forEach(trade=>{
        trade.expired = new Date(trade.maturityDate) < new Date() ? 'T' : 'F'
      })
      setTradeList(trades);
      console.log(tradeList)
    } else {
      localStorage.setItem("trades", JSON.stringify([]));
    }
  }, [showForm]);

  const handleToogle = () => {
    setShowForm((status) => !status);
  };

  return (
    <div className="trade-store">
      {showForm ? (
        <TradeForm handleToogle={handleToogle} />
      ) : (
        <Grid columnsDefs={columnsDefs} data={tradeList}>
          <div className="trade-store__heading">
            <div className="trade-store__heading__label">Trades</div>
            <button
              className="trade-store__heading__add_btn"
              onClick={handleToogle}
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
