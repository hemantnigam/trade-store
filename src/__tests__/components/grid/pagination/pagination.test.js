import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../../../../components/grid/pagination";
import '@testing-library/jest-dom'

describe("Components/grid/pagination/", () => {
  let handleClick;

  beforeEach(() => {
    handleClick = jest.fn((type) => (global.type = type)); //mock click handler
    render(
      <Pagination
        pages={[1, 2, 3]}
        currentPage={1}
        handleClick={handleClick}
        totalPages={3}
      />
    );
  });

  afterEach(() => {
    handleClick = null;  //cleaning up the variable after each test
  });

  it("should renders pagination component", () => {
    const paginationComp = screen.getByTestId("pagination");
    expect(paginationComp).toBeInTheDocument();
  });

  it("should call handler with prevLast text if << is clicked", () => {
    const element = screen.getByTestId("prev-last");
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(global.type).toBe("prevLast");
  });

  it("should call handler with prev text if < is clicked", () => {
    const element = screen.getByTestId("prev");
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(global.type).toBe("prev");
  });

  it("should call handler with nextLast text if >> is clicked", () => {
    const element = screen.getByTestId("next-last");
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(global.type).toBe("nextLast");
  });

  it("should call handler with next text if > is clicked", () => {
    const element = screen.getByTestId("next");
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(global.type).toBe("next");
  });

  it("should call handler with page number text if any page number is clicked", () => {
    const element = screen.getAllByTestId("page-num-content")[1];
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(global.type).toBe(2);
  });
});
