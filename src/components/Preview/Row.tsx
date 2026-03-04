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
    <div className="flex flex-row gap-1 w-full h-2.5">
      <div className="flex justify-end items-center text-[11px] min-w-4 max-w-4">{id + 1}</div>
      <div className="flex flex-row w-full gap-0">{stitches.map(toStitch)}</div>
    </div>
  );
};

export default Row;
