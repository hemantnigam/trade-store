import { fireEvent, render, screen } from "@testing-library/react";
import TradeForm from "../../components/trade-form";
import '@testing-library/jest-dom'

describe("Components/trade-form", () => {
  let handleToogle;
  
  beforeEach(() => {
    handleToogle = jest.fn();
    render(<TradeForm handleToogle={handleToogle} />);
  });
  
  afterEach(() => {
    handleToogle = null;  //cleaning up the variable after each test
  });

  it("should renders trade form component", () => {
    const tradeFormComponent = screen.getByTestId("trade-form");
    expect(tradeFormComponent).toBeInTheDocument();
  });

  it("should renders back button in trade form component", () => {
    const backBtnComponent = screen.getByTestId("back-btn");
    expect(backBtnComponent).toBeInTheDocument();
  });

  it("should renders submit button in trade form component", () => {
    const submitBtnComponent = screen.getByTestId("submit-btn");
    expect(submitBtnComponent).toBeInTheDocument();
  });

  it("should call handleToggle handler when back button is clicked", () => {
    const backBtnComponent = screen.getByTestId("back-btn");
    fireEvent.click(backBtnComponent);
    expect(handleToogle).toHaveBeenCalledTimes(1);
  });

  it("should notify when form is not valid", () => {
    const sumbitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(sumbitBtn); //fire click event
    expect(screen.getByTestId("notification")).toBeInTheDocument()
  });

  it("should notify if maturity date is less than today's date", () => {
    const { getAllByTestId } = screen;

    const [tradeId, version, counterPartyId, bookId, maturityDate] =
      getAllByTestId("form-control");

    fireEvent.change(tradeId, { target: { value: "T1" } });
    fireEvent.change(version, { target: { value: "2" } });
    fireEvent.change(counterPartyId, { target: { value: "testId" } });
    fireEvent.change(bookId, { target: { value: "testId" } });
    fireEvent.change(maturityDate, {
      target: { value: "2022-08-11" },
    });

    const sumbitBtnComponent = screen.getByTestId("submit-btn");
    fireEvent.click(sumbitBtnComponent); //fire click event
    expect(screen.getByTestId("notification")).toBeInTheDocument()
  });

  it("should add the trade if all fields are valid", () => {
    const { getAllByTestId } = screen;

    const [tradeId, version, counterPartyId, bookId, maturityDate] =
      getAllByTestId("form-control");

    fireEvent.change(tradeId, { target: { value: "T1" } });
    fireEvent.change(version, { target: { value: "2" } });
    fireEvent.change(counterPartyId, { target: { value: "testId" } });
    fireEvent.change(bookId, { target: { value: "testId" } });
    fireEvent.change(maturityDate, {
      target: { value: "2022-11-11" },
    });

    //mock the localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => JSON.stringify([])),
        setItem: jest.fn((key, value) => {})
      },
    });

    const sumbitBtnComponent = screen.getByTestId("submit-btn");
    fireEvent.click(sumbitBtnComponent);
    expect(screen.getByTestId("notification")).toBeInTheDocument()
  });
});
