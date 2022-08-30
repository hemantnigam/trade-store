import React, { useEffect, useState } from "react";
import { columnsDefs } from "../../enums/grid/column-definitions";
import Grid from "../grid";
import TradeForm from "../trade-form";
import "./index.scss";

function TradeStore() {
  const [tradeList, setTradeList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTrades()
  }, [showForm]);

  const handleToogle = () => {
    setShowForm((status) => !status);
  };

  const setTrades = () => {
    const trades = JSON.parse(localStorage.getItem("trades"));
    if (trades && trades.length > 0) {
      setTradeList(trades);
    } else {
      localStorage.setItem("trades", JSON.stringify([]));
    }
  }
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
