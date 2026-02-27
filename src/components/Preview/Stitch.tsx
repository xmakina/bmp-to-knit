type Props = {
  active?: boolean;
  onClick?: () => void;
};

const Active = () => <div className="bg-black rounded-4xl h-full flex-1"></div>;

const Stitch = ({ active = false, onClick = () => {} }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-1 justify-center items-center border-black border bg-white h-full w-full p-px"
    >
      {active && <Active />}
    </div>
  );
};

export default Stitch;
