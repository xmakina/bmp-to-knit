type Props = {
  active?: boolean;
  onClick?: () => void;
};

const Active = () => <div className="bg-black rounded-4xl w-4 h-4"></div>;

const Stitch = ({ active = false, onClick = () => {} }: Props) => {
  return (
    <div onClick={onClick} className="flex w-5 h-5 justify-center items-center border-black border">
      {active && <Active />}
    </div>
  );
};

export default Stitch;
