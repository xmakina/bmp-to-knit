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
    <div className="flex flex-row gap-1 w-full max-h-3">
      <div className="flex w-2 justify-end items-center text-[12px]">{id + 1}</div>
      <div className="flex flex-row w-full gap-0">{stitches.map(toStitch)}</div>
    </div>
  );
};

export default Row;
