import {render, screen} from '@testing-library/react'
import Header from './Header';

describe("Header Test", () => {
  it('should render appbar', () => 
  {
    render(<Header hp={10} gold={10} />)

    const appBar = screen.getByTestId('app-bar-test-id');

    expect(appBar).toBeInTheDocument();
  });
  it.each`
  gold   | hp  
  ${100} | ${1}
  ${21}  | ${75}
  ${32}  | ${46}
`('should render $gold gold coins and $hp hp', ({gold, hp}) => 
  {
    render(<Header hp={hp} gold={gold} />)

    const goldChip = screen.getByTestId('gold-chip-test-id');
    const hpChip = screen.getByTestId('hp-chip-test-id');

    expect(goldChip).toBeInTheDocument();
    expect(hpChip).toBeInTheDocument();
    expect(goldChip).toHaveTextContent(gold);
    expect(hpChip).toHaveTextContent(hp);
  });
});