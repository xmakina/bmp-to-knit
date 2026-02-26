import Stitch from "./Stitch";

type Props = {
  id: number;
  onClick?: (stitch: number) => void;
  stitches: boolean[];
};

const Row = ({ id, stitches, onClick = () => {} }: Props) => {
  const toStitch = (active: boolean, stitchId: number) => (
    <Stitch active={active} onClick={() => onClick(stitchId)} key={stitchId} />
  );

  return (
    <div className="flex flex-row gap-1">
      <div className="flex w-5 h-5 justify-end items-center">{id + 1}</div>
      <div className="flex flex-row gap-0">{stitches.map(toStitch)}</div>
    </div>
  );
};

export default Row;
