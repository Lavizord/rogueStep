
type Props = { children: React.ReactNode };

const DivBox = ({ children } : Props) => {

  return 
  <div className="whatever">
    {children}
  </div>
};

export default DivBox;