import { render, screen } from "@testing-library/react";
import Grid from "../../../components/grid";
import { columnsDefs } from "../../../enums/grid/column-definitions";
import '@testing-library/jest-dom'

describe("Components/grid/", () => {
  describe("grid has trade data ", () => {
    beforeEach(() => {
      //dummy test data
      const data = [
        {
          tradeId: "T1",
          version: "2",
          bookId: "testid",
          counterPartyId: "testId",
          maturityDate: "2022-08-11",
        },
      ];
      render(<Grid columnsDefs={columnsDefs} data={data} />);
    });

    it("should renders grid component", () => {
      const gridComp = screen.getByTestId("grid");
      expect(gridComp).toBeInTheDocument();
    });

    it("should have rows in grid", () => {
      const dataRows = screen.getAllByTestId("data-row");
      expect(dataRows.length).toBe(1);
    });
  });

  describe("grid has no trade data ", () => {
    it("should renders grid component", () => {
      render(<Grid columnsDefs={columnsDefs} data={[]} />);
      const noDataRow = screen.getByTestId("no-data");
      expect(noDataRow).toBeInTheDocument();
    });
  });
});
