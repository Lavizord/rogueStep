import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header Test", () => {
  it("should render appbar", () => {
    render(<Header hp={10} gold={10} steps={0} />);

    const appBar = screen.getByTestId("app-bar-test-id");

    expect(appBar).toBeInTheDocument();
  });

  it.each`
    gold   | hp    | steps
    ${100} | ${1}  | ${1}
    ${21}  | ${75} | ${4}
    ${32}  | ${46} | ${123}
  `(
    "should render $gold gold coins, $hp hp and $steps steps",
    ({ gold, hp, steps }) => {
      render(<Header hp={hp} gold={gold} steps={steps} />);

      const goldChip = screen.getByTestId("gold-chip-test-id");
      const hpChip = screen.getByTestId("hp-chip-test-id");
      const stepsChip = screen.getByTestId("steps-chip-test-id");

      expect(goldChip).toBeInTheDocument();
      expect(hpChip).toBeInTheDocument();
      expect(stepsChip).toBeInTheDocument();
      expect(goldChip).toHaveTextContent(gold);
      expect(hpChip).toHaveTextContent(hp);
      expect(stepsChip).toHaveTextContent(steps);
    }
  );
});
