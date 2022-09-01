import { fireEvent, render, screen } from "@testing-library/react";
import TradeStore from "../../components/trade-store";
import '@testing-library/jest-dom'

describe("Components/trade-store", () => {
  beforeEach(() => {
    render(<TradeStore />);
  });

  it("should renders trade store component", () => {
    const tradeStoreComponent = screen.getByTestId("trade-store");
    const tradeStoreHeading = screen.getByTestId("trade-store-heading");
    const addTradeButton = screen.getByTestId("add-trade-btn");
    expect(tradeStoreComponent).toBeInTheDocument();
    expect(tradeStoreHeading).toBeInTheDocument();
    expect(addTradeButton).toBeInTheDocument();
  });

  it("should renders trade list at initial render", () => {
    const linkElement = screen.getByTestId("grid");
    expect(linkElement).toBeInTheDocument();
  });

  it("should renders trade form when clicked on add button", () => {
    fireEvent.click(screen.getByTestId("add-trade-btn"));
    const formComponent = screen.getByTestId("trade-form");
    expect(formComponent).toBeInTheDocument();
  });
});
