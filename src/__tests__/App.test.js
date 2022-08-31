import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom'

describe("App", () => {
  it("should renders app header", () => {
    render(<App />);
    const linkElement = screen.getByText(/trade store/i);
    expect(linkElement).toBeInTheDocument();
  });
});
