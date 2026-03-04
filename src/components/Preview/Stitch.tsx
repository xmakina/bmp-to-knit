type Props = {
  active?: boolean;
  onClick?: () => void;
};

const Active = () => <div className="bg-black rounded-4xl h-full flex-1"></div>;

const Stitch = ({ active = false, onClick = () => {} }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center border-black border bg-white w-full max-w-4.5 p-px aspect-video"
    >
      {active && <Active />}
    </div>
  );
};

export default Stitch;
